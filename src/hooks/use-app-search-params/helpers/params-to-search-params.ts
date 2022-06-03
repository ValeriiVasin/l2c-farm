import type { Params } from '../types';

export function paramsToSearchParams({
  params,
  updates,
  config,
  preserve,
}: {
  params: Params;
  updates: Params;
  config: Params;
  preserve: boolean;
}): Record<string, string> {
  const resultParams = preserve ? { ...params, ...updates } : updates;
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(resultParams)) {
    if (config[key] === resultParams[key]) {
      continue;
    }

    result[key] = String(value);
  }

  return result;
}
