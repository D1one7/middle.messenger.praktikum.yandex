enum METHODS { GET = 'GET', PUT = 'PUT', POST = 'POST', DELETE = 'DELETE' }

type RequestOptions = {
    method?: METHODS;
    data?: any;
    headers?: Record<string, string>;
    timeout?: number;
};

function queryStringify(data: Record<string, any>): string {
    return Object.entries(data).reduce((acc, [key, value], index, array) => {
        if (index === array.length - 1) {
            return acc.concat(`${key}=${value}`);
        }
        return acc.concat(`${key}=${value}&`);
    }, '?');
}

class HTTPTransport {
    request = (url: string, options: RequestOptions = {}, timeout = 5000): Promise<XMLHttpRequest> => {
        const { method = METHODS.GET, data, headers } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open(method, url);

            if (headers) {
                Object.entries(headers).forEach(([key, value]) => {
                    xhr.setRequestHeader(key, value);
                });
            }

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            xhr.send(JSON.stringify(data));
        });
    };

    get = (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => {
        let requestUrl = url;

        if (options.data) {
            requestUrl = url.concat(queryStringify(options.data));
        }

        return this.request(requestUrl, { ...options, method: METHODS.GET }, options.timeout);
    };

    put = (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
    };

    post = (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
    };

    delete = (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
    };
}

type FetchRetryOptions = {
    retries?: number;
} & RequestOptions;

function fetchWithRetry(url: string, options: FetchRetryOptions): Promise<Response> {
    const { retries = 3, ...restOptions } = options;

    const transport = new HTTPTransport();

    const fetchAttempt = (attempt: number): Promise<Response> => {
        return transport
            .get(url, restOptions)
            .then((xhr) => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    return new Response(xhr.responseText, { status: xhr.status });
                } else {
                    throw new Error(`Ошибка ${xhr.status}`);
                }
            })
            .catch((error) => {
                if (attempt < retries) {
                    return fetchAttempt(attempt + 1);
                } else {
                    throw error;
                }
            });
    };

    return fetchAttempt(1);
}
