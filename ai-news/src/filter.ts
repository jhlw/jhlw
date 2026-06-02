import type { Article } from './types.js';

/**
 * 过滤出最近 24 小时的文章
 * - pubDate 为 null 的文章保留（宽容处理），但不会排在前面
 */
export function filterLast24Hours(articles: Article[]): Article[] {
  const threshold = new Date(Date.now() - 24 * 60 * 60 * 1000);
  return articles.filter((a) => a.pubDate === null || a.pubDate >= threshold);
}
