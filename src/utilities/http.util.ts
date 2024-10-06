import http, { RefinedResponse } from 'k6/http';
// import RequestMethods from '../types/RequestMethods.enum.ts';
// import { RequiredHeaders } from '../models/auth.model.ts';
// import { serialize } from 'object-to-formdata';
import RequestMethods from '../constants/request-methods.const.ts';
import { IHttpOptions } from '../models/request.model.ts';
import { RequiredHeaders } from '../models/auth.model.ts';

/*
 * DESCRIPTION:
 * These helper functions are wrappers for K6 HTTP that will send an HTTP request to the provided URL.
 * You can call these functions from your test script to send HTTP requests.
 * You can call the request function and specify the method, path, body, etc.
 * Or you can call the get, del, put, post functions and specify the path, body, etc.
 *
 * BASE URL:
 * Note you can specify the baseUrl in the options object or you can set the API_URL environment variable.
 * The baseUrl within the options object will override the API_URL environment variable.
 */


export default class HttpUtil {
    private readonly headers: { [key: string]: number };

    constructor(options?: RequiredHeaders) {
        this.headers = { ...options };
    }

    public async request(
        options: Partial<IHttpOptions>
    ): Promise<RefinedResponse<any>> {
        options.method = options.method ?? RequestMethods.GET;

        const {
            headers = { ...options.headers, ...this.headers},
            timeout = options.timeout || 60 * 1000,
            tags,
            redirects,
        }: Partial<IHttpOptions> = options;

        return await http.asyncRequest(options.method, options.url!, options.body, {
            headers,
            timeout,
            tags,
            redirects,
        });
    }

    public async get(options: Partial<IHttpOptions>) {
        return await this.request({
            ...options,
            headers: this.headers,
            method: RequestMethods.GET,
        });
    }

    public async delete(options: Partial<IHttpOptions>) {
        return await this.request({
            ...options,
            headers: this.headers,
            method: RequestMethods.DELETE,
        });
    }

    public async put(options: Partial<IHttpOptions>) {
        return await this.request({
            ...options,
            headers: this.headers,
            method: RequestMethods.PUT,
        });
    }

    public async post(options: Partial<IHttpOptions>) {
        return await this.request({
            ...options,
            headers: {
                ...this.headers,
                "Content-Type": "application/json",
            },
            method: RequestMethods.POST,
            body: JSON.stringify(options.body),
        });
    }

    public async postForm(options: Partial<IHttpOptions>) {
        return await this.request({
            ...options,
            headers: { ...this.headers, 'Content-Type': 'x-www-form-urlencoded' },
            method: RequestMethods.POST,
            //   body: serialize(options.body),
        });
    }

    public async update(options: Partial<IHttpOptions>) {
        return await this.request({
            ...options,
            headers: this.headers,
            method: RequestMethods.UPDATE,
        });
    }
}