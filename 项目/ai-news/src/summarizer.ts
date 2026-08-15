import Anthropic from '@anthropic-ai/sdk';
import type { Article } from './types.js';

/** 每批处理的文章数 */
const BATCH_SIZE = 15;

/** 摘要最大字数（中文字符） */
const MAX_SUMMARY_CHARS = 60;

// ────────────────────────────────────
// Fallback：纯本地截取（原 extractSummary 逻辑）
// ────────────────────────────────────

function truncateSummary(text: string, maxLen = 100): string {
  if (!text) return '';
  if (text.length <= maxLen) return text;
  const truncated = text.slice(0, maxLen);
  const lastBreak = Math.max(
    truncated.lastIndexOf('。'),
    truncated.lastIndexOf('.'),
    truncated.lastIndexOf('！'),
    truncated.lastIndexOf('?'),
    truncated.lastIndexOf(' '),
  );
  if (lastBreak > maxLen * 0.6) {
    return truncated.slice(0, lastBreak + 1) + '…';
  }
  return truncated + '…';
}

// ────────────────────────────────────
// AI 摘要核心
// ────────────────────────────────────

function buildBatchPrompt(articles: Article[]): string {
  const items = articles
    .map((a, i) => `${i + 1}. 标题：${a.title}\n   原文：${a.summary}`)
    .join('\n\n');
  return `为以下 ${articles.length} 篇文章各写一句中文摘要（每句不超过${MAX_SUMMARY_CHARS}个字），捕获核心要点。严格只返回 JSON 字符串数组，不要任何额外文字。

${items}

只返回：["摘要1", "摘要2", ...]`;
}

function parseResponse(text: string): string[] {
  // 找到最外层的 JSON 数组（避免摘要中的 [ 字符导致截断）
  const start = text.indexOf('[');
  const end = text.lastIndexOf(']');
  if (start === -1 || end === -1 || end <= start) {
    throw new Error(`响应中未找到 JSON 数组: ${text.slice(0, 200)}`);
  }
  const parsed = JSON.parse(text.slice(start, end + 1));
  if (!Array.isArray(parsed)) throw new Error('响应不是数组');
  return parsed.map((s) => String(s).trim());
}

async function summarizeBatch(
  client: Anthropic,
  articles: Article[],
): Promise<string[]> {
  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    system:
      '你是一个专业 AI 新闻编辑。对每篇文章生成一句中文摘要，精准捕获核心要点，简洁有力。',
    messages: [{ role: 'user', content: buildBatchPrompt(articles) }],
  });

  const text =
    response.content[0].type === 'text' ? response.content[0].text : '';
  return parseResponse(text);
}

// ────────────────────────────────────
// 公开入口
// ────────────────────────────────────

/**
 * 为文章列表批量生成 AI 摘要，原地修改 article.summary。
 * - 无 API key 时自动降级为本地截取
 * - 单批失败时该批降级，其他批次继续
 */
export async function aiSummarize(articles: Article[]): Promise<void> {
  if (articles.length === 0) return;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.log('⚠️  未设置 ANTHROPIC_API_KEY，使用本地截取');
    for (const a of articles) {
      a.summary = truncateSummary(a.summary);
    }
    return;
  }

  const client = new Anthropic({ apiKey });
  const batches: Article[][] = [];
  for (let i = 0; i < articles.length; i += BATCH_SIZE) {
    batches.push(articles.slice(i, i + BATCH_SIZE));
  }

  console.log(`🤖 AI 摘要生成中（${batches.length} 批，共 ${articles.length} 篇）...`);

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    const label = `[${i + 1}/${batches.length}]`;
    try {
      const summaries = await summarizeBatch(client, batch);
      for (let j = 0; j < batch.length; j++) {
        batch[j].summary = summaries[j] || truncateSummary(batch[j].summary);
      }
      console.log(`   ${label} ✅ ${batch.length} 篇摘要已生成`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`   ${label} ❌ 失败，使用本地截取: ${msg}`);
      for (const a of batch) {
        a.summary = truncateSummary(a.summary);
      }
    }
  }
}
