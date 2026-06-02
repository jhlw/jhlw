/** 统一文章数据结构 */
export interface Article {
  /** 文章标题 */
  title: string;
  /** 文章链接 */
  link: string;
  /** 发布时间（可能为 null，表示未知） */
  pubDate: Date | null;
  /** 来源名称 */
  source: string;
  /** 一句话摘要（截取自正文前 100 字） */
  summary: string;
}
