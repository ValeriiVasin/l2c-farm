import isEqual from 'lodash/isEqual';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { paramsToSearchParams } from './helpers/params-to-search-params';
import { searchParamsToParams } from './helpers/search-params-to-params';
import type { Params } from './types';

interface ParamsOptions {
  preserve?: boolean;
}

interface SetParamsOptions {
  preserve?: boolean;
  replace?: boolean;
}

/**
 * Hook is different from react-router useSearchParams() hook:
 * - returned params is an object
 * - it is setting default values provided by the configuration, if param is not set
 * - it parses numeric values (if config default value type is a number)
 * - default param value is omitted from search automatically
 * - url helper that respects default values and works with params object is exported
 */
export function useAppSearchParams<T extends Params>(config: T) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState(searchParamsToParams(searchParams, config));

  useEffect(() => {
    const nextParams = searchParamsToParams(searchParams, config);

    if (!isEqual(nextParams, params)) {
      setParams(nextParams);
    }
  }, [searchParams, params, config]);

  const wrappedSetParams = useCallback(
    (
      updates: Partial<T> & Params,
      { preserve = true, replace = false }: SetParamsOptions = {
        preserve: true,
        replace: false,
      },
    ) => {
      setSearchParams(paramsToSearchParams({ params, updates, config, preserve }), { replace });
    },
    [config, params, setSearchParams],
  );

  const queryString = useCallback(
    (updates: Partial<T> & Params, { preserve = true }: ParamsOptions = { preserve: true }) => {
      const nextParams = paramsToSearchParams({
        params,
        updates,
        config,
        preserve,
      });

      return new URLSearchParams(nextParams).toString();
    },
    [params, config],
  );

  const url = useCallback(
    (path: string, updates: Partial<T> & Params, { preserve = true }: ParamsOptions = { preserve: true }) =>
      `${path}?${queryString(updates, { preserve })}`,
    [queryString],
  );

  return {
    searchParams: params,
    setSearchParams: wrappedSetParams,
    url,
  };
}
