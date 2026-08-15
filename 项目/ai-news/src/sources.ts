/** RSS 源定义 */
export interface Source {
  name: string;
  url: string;
}

export const sources: Source[] = [
  {
    name: 'TechCrunch AI',
    url: 'https://techcrunch.com/category/artificial-intelligence/feed/',
  },
  {
    name: 'The Verge AI',
    url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml',
  },
  {
    name: 'Hacker News AI',
    url: 'https://hnrss.org/newest?q=AI&count=30',
  },
];
