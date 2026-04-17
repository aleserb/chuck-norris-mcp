import type { Category } from './categories.js';

interface ApiFact {
  id: string;
  value: string;
  categories: string[];
}

export async function fetchFactFromApi(category?: Category): Promise<string | null> {
  const base = 'https://api.chucknorris.io/jokes/random';
  const url = category ? `${base}?category=${category}` : base;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (!res.ok) return null;

    const data: ApiFact = await res.json();
    return data.value ?? null;
  } catch {
    return null;
  }
}
