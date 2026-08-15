import type { Article } from './types.js';

/**
 * 格式化日期为 "YYYY-MM-DD HH:mm:ss" 字符串
 */
function formatDate(date: Date | null): string {
  if (!date) return '未知';
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Shanghai',
  });
}

/**
 * 生成 Markdown 格式的日报内容
 */
export function generateMarkdown(articles: Article[]): string {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const now = formatDate(new Date());

  // 统计：活跃的源（本日有文章的源）
  const activeSources = [...new Set(articles.map((a) => a.source))];
  const sourceNames = activeSources.join(' / ');

  const header = [
    `# 🤖 AI 新闻日报 — ${today}`,
    '',
    `> 📊 共收录 **${articles.length}** 篇 · 来自 **${activeSources.length}** 个源（${sourceNames}）`,
    `> ⏰ 生成时间：${now}`,
    '',
  ].join('\n');

  if (articles.length === 0) {
    return header + '\n---\n\n📭 过去 24 小时暂无 AI 相关新文章。\n';
  }

  const body = articles
    .map((a, i) => {
      const time = formatDate(a.pubDate);
      const parts = [
        `${i + 1}. **[${escapeMd(a.title)}](${a.link})**`,
        `   🏷️ ${a.source} · 🕐 ${time}`,
      ];
      if (a.summary) {
        parts.push(`   > ${escapeMd(a.summary)}`);
      }
      return parts.join('\n');
    })
    .join('\n\n');

  return header + '---\n\n' + body + '\n';
}

/** 转义 Markdown 特殊字符（仅转义会破坏排版的关键字符） */
function escapeMd(text: string): string {
  return text.replace(/[\\`*_{}[\]()#+|]/g, '\\$&');
}
