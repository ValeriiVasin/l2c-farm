import type { Params } from '../types';

export function searchParamsToParams<T extends Params>(searchParams: URLSearchParams, config: T): T {
  const result: Params = Object.fromEntries(searchParams.entries());

  for (const [key, defaultValue] of Object.entries(config)) {
    if (!searchParams.has(key)) {
      result[key] = defaultValue;
      continue;
    }

    if (typeof defaultValue === 'number') {
      result[key] = Number(result[key]);
    }
  }

  return result as T;
}
