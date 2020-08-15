import { useEffect, useState, useCallback, useRef } from 'react';
import axios, { CancelToken, CancelTokenSource } from 'axios';

/**
 *
 * @param asyncFunction - executes async request to the backend
 *    asyncFunction = null, is used for lazy/defer loading
 * @param defaultParams - params passed by default to asyncFunction
 * @param deps - array of variables. If one of them was changed, asyncFunction will be re-executed
 * @param immediate - to enable on-demand mode instead of the immediate execution on every render
 */
export const useAsync = <Params extends Array<any | never> = [], Result = unknown>(
    asyncFunction: ((token: CancelToken, ...params: Params) => Promise<Result | null>) | null,
    defaultParams: Params,
    deps: any[] = defaultParams,
    immediate: boolean = true,
) => {
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState<Result | null>(null);
    const [error, setError] = useState<unknown>(null);
    const cancelTokenSourceRef = useRef<CancelTokenSource | null>(null);

    const execute = useCallback(
        (...params: Params | []) => {
            if (asyncFunction) {
                setLoading(true);
                setError(null);
                const source = axios.CancelToken.source();
                // Singleton pattern. It's not allowed to have > 1 of the running request
                if (cancelTokenSourceRef.current) {
                    cancelTokenSourceRef.current.cancel('Destroy');
                }
                cancelTokenSourceRef.current = source;
                // params are possible to define when immediate=false. In this case, the defaultParams can be overridden
                return asyncFunction(cancelTokenSourceRef.current.token, ...((params.length ? params : defaultParams) as Params))
                    .then((response) => {
                        setValue(response);
                        return response;
                    })
                    .catch((e) => {
                        if (source.token?.reason?.message !== 'Destroy') {
                            setValue(null);
                            setError(e);
                        }
                    })
                    .finally(() => {
                        if (source.token?.reason?.message !== 'Destroy') {
                            setLoading(false);
                        }
                    });
            }
            return Promise.resolve();
        },
        [asyncFunction, ...deps],
    );

    useEffect(() => {
        if (immediate) {
            execute(...defaultParams);
        }
        return () => {
            if (cancelTokenSourceRef.current) {
                cancelTokenSourceRef.current.cancel('Destroy');
            }
        };
    }, [execute, ...deps, immediate]);

    return {execute, loading, value, error};
};