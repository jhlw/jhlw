import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { Article } from './types.js';
import { sources } from './sources.js';
import { fetchAllArticles } from './fetcher.js';
import { filterLast24Hours } from './filter.js';
import { aiSummarize } from './summarizer.js';
import { generateMarkdown } from './formatter.js';

async function main() {
  console.log('🔍 正在从以下源抓取 AI 新闻...');
  sources.forEach((s) => console.log(`   📡 ${s.name}`));
  console.log();

  // 1. 并发抓取（summary 暂存原始描述）
  const raw = await fetchAllArticles(sources);
  console.log(`📥 原始抓取：${raw.length} 篇`);

  // 2. 时间过滤
  const filtered = filterLast24Hours(raw);
  console.log(`⏳ 24小时内：${filtered.length} 篇`);

  // 3. AI 摘要（或本地 fallback）
  await aiSummarize(filtered);

  // 4. 按时间倒序
  const sorted = sortByDate(filtered);
  console.log(`📋 排序完成`);

  // 5. 生成 Markdown
  const markdown = generateMarkdown(sorted);

  // 6. 写入文件
  const today = new Date().toISOString().split('T')[0];
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const outputDir = join(__dirname, '..', 'output');
  mkdirSync(outputDir, { recursive: true });
  const filePath = join(outputDir, `ai-news-${today}.md`);
  writeFileSync(filePath, markdown, 'utf-8');

  console.log();
  console.log(`✅ 日报已生成：${filePath}`);
  console.log(`📊 共 ${sorted.length} 篇文章，来自 ${countSources(sorted)} 个源`);
}

/** 按发布时间倒序排列（null 日期排最后） */
function sortByDate(articles: Article[]): Article[] {
  return [...articles].sort((a, b) => {
    if (!a.pubDate && !b.pubDate) return 0;
    if (!a.pubDate) return 1;
    if (!b.pubDate) return -1;
    return b.pubDate.getTime() - a.pubDate.getTime();
  });
}

/** 统计有文章的源数量 */
function countSources(articles: Article[]): number {
  return new Set(articles.map((a) => a.source)).size;
}

main().catch((err) => {
  console.error('💥 运行失败:', err);
  process.exit(1);
});
