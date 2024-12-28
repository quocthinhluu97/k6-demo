import RequestMethods from "../constants/request-methods.const.ts";
import { RefinedParams } from 'k6/http';

interface IHttpOptions {
    url: string; // Base URL to send request to
    body?: any; // Request Body
    method: RequestMethods; // Request Method
    params?: RefinedParams;
}

export {
    IHttpOptions, 
}