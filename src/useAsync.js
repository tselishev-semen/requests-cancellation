import {useEffect, useState, useCallback, useRef} from 'react';
import axios from 'axios';
import {addMessages} from './Logger/service';

export const useAsyncForAxios = (
    asyncFunction,
    defaultParams = {},
    deps = defaultParams,
    immediate = true
) => {
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(null);
    const [error, setError] = useState(null);
    const cancelTokenSourceRef = useRef(null);

    const execute = useCallback(
        (...params) => {
            if (asyncFunction) {
                setLoading(true);
                setError(null);
                const source = axios.CancelToken.source();
                // singleton request
                if (cancelTokenSourceRef.current) {
                    cancelTokenSourceRef.current.cancel('Destroy');
                }
                cancelTokenSourceRef.current = source;
                return asyncFunction(cancelTokenSourceRef.current.token, ...(params.length ? params : defaultParams))
                    .then((response) => setValue(response))
                    .catch((e) => {
                        if (source.token?.reason?.message !== 'Destroy') {
                            setValue(null);
                            setError(e);
                        } else {
                            addMessages(`Axios request with ${JSON.stringify(params.length ? params : defaultParams)} was cancelled`)
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
        [asyncFunction, ...defaultParams, ...deps],
    );

    useEffect(() => {
        if (asyncFunction && immediate) {
            execute(...defaultParams);
        } else if (!asyncFunction) {
            // just for the demo purpose
            addMessages(`Axios request with ${JSON.stringify(defaultParams)} is not executed`)
        }
        return () => {
            if (cancelTokenSourceRef.current) {
                cancelTokenSourceRef.current.cancel('Destroy');
            }
        };
    }, [asyncFunction, ...defaultParams, ...deps, immediate]);

    return {execute, loading, value, error};
};


export const useAsyncForFetch = (
    asyncFunction,
    defaultParams = {},
    deps = defaultParams,
    immediate = true
) => {
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(null);
    const [error, setError] = useState(null);
    const abortControllerRef = useRef(null);

    const execute = useCallback(
        (...params) => {

            if (asyncFunction) {
                setLoading(true);
                setError(null);
                const abortController = new AbortController();
                // singleton request
                if (abortControllerRef.current) {
                    abortControllerRef.current.abort();
                }
                abortControllerRef.current = abortController;
                return asyncFunction(abortController.signal, ...(params.length ? params : defaultParams))
                    .then((response) => setValue(response))
                    .catch((e) => {
                        if (!abortController.signal.aborted) {
                            setValue(null);
                            setError(e);
                        } else {
                            addMessages(`Fetch request with ${JSON.stringify(params.length ? params : defaultParams)} was cancelled`)
                        }
                    })
                    .finally(() => {
                        if (!abortController.signal.aborted) {
                            setLoading(false);
                        }
                    });
            }
            return Promise.resolve();
        },
        [asyncFunction, ...defaultParams, ...deps],
    );

    useEffect(() => {
        if (asyncFunction && immediate) {
            execute(...defaultParams);
        } else if (!asyncFunction) {
            // just for the demo purpose
            addMessages(`Fetch request with ${JSON.stringify(defaultParams)} is not executed`)
        }
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [asyncFunction, ...defaultParams, ...deps, immediate]);

    return {execute, loading, value, error};
};