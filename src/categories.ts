export const CATEGORIES = [
  'dev',
  'science',
  'sport',
  'movie',
  'animal',
  'food',
  'history',
  'money',
  'celebrity',
] as const;

export type Category = (typeof CATEGORIES)[number];
