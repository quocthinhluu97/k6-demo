import RequestMethods from "../constants/request-methods.const.ts";

interface IHttpSharedParams {
    headers?: { [k: string]: any }; // Request Headers
    timeout?: number; // Timeout in milliseconds
    redirects?: number; // Number of redirects to follow
    tags?: { [k: string]: any }; // Tags to be sent with the request
}

interface IHttpOptions extends IHttpSharedParams {
    url: string; // Base URL to send request to
    body?: any; // Request Body
    method: RequestMethods; // Request Method
    pathAndQuery?: string;
    params?: Partial<IHttpSharedParams>;
    contentType?: string; // Type of content type to send
}

export {
    IHttpOptions, IHttpSharedParams
}