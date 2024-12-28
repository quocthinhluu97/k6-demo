import http, { RefinedResponse, RefinedParams } from 'k6/http';
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

    public async request<T>(
        options: IHttpOptions
    ): Promise<RefinedResponse<T>> {
        options.method = options.method ?? RequestMethods.GET;

        const params: RefinedParams = options.params;
        params.headers = { ...this.headers, ...options.params.headers }

        return await http.asyncRequest(options.method, options.url!, options.body, params);

    }

    public async get<T>(options: IHttpOptions) {
        return await this.request({
            ...options,
            method: RequestMethods.GET,
        });
    }

    public async delete(options: IHttpOptions) {
        return await this.request({
            ...options,
            method: RequestMethods.DELETE,
        });
    }

    public async put<T>(options: IHttpOptions) {
        return await this.request({
            ...options,
            method: RequestMethods.PUT,
        });
    }

    public async post<T>(options: IHttpOptions) {
        return await this.request({
            ...options,
            method: RequestMethods.POST,
            body: JSON.stringify(options.body),
            params: { headers: { 'Content-Type': 'application/json' } }
        });
    }

    public async postForm<T>(options: IHttpOptions) {
        return await this.request({
            ...options,
            method: RequestMethods.POST,
            params: { headers: {'Content-Type': 'x-www-form-urlencoded' } }
            // body: serialize(options.body),
        });
    }

    public async update<T>(options: IHttpOptions) {
        return await this.request({
            ...options,
            method: RequestMethods.UPDATE,
        });
    }
}