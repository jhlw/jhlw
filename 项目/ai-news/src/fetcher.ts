import Parser from 'rss-parser';
import type { Article } from './types.js';
import type { Source } from './sources.js';

const parser = new Parser();

/**
 * 解码 HTML 实体（包括命名实体和数字实体）
 */
export function decodeEntities(text: string): string {
  return text
    .replace(/<[^>]*>/g, '')
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&rsquo;/g, '’')
    .replace(/&lsquo;/g, '‘')
    .replace(/&rdquo;/g, '”')
    .replace(/&ldquo;/g, '“')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * 从 RSS item 中提取原始描述文本（未截取，留给 AI 摘要模块处理）
 */
function getRawDescription(item: Parser.Item): string {
  const raw = item.contentSnippet || item.summary || item.content || '';
  return decodeEntities(
    raw
      .replace(/^Article URL:\s*\S+\s*/, '')
      .replace(/^Comments URL:\s*\S+\s*/, '')
      .trim(),
  );
}

/**
 * 从单个 RSS 源抓取文章列表，失败返回空数组。
 * article.summary 初始存的是原始描述文本，后续由 summarizer 模块处理。
 */
export async function fetchArticles(source: Source): Promise<Article[]> {
  try {
    const feed = await parser.parseURL(source.url);
    return feed.items.map((item) => ({
      title: decodeEntities(item.title || '(无标题)'),
      link: item.link || '',
      pubDate: item.pubDate ? new Date(item.pubDate) : null,
      source: source.name,
      summary: getRawDescription(item),
    }));
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`  [ERROR] ${source.name} 抓取失败: ${message}`);
    return [];
  }
}

/**
 * 并发从所有源抓取文章，单个失败不影响整体
 */
export async function fetchAllArticles(sources: Source[]): Promise<Article[]> {
  const results = await Promise.allSettled(
    sources.map((s) => fetchArticles(s)),
  );
  return results.flatMap((r, i) => {
    if (r.status === 'fulfilled') return r.value;
    console.error(`  [WARN] ${sources[i].name} 抓取失败，已跳过`);
    return [];
  });
}
