import { RequiredHeaders } from "../models/auth.model.ts";
import HttpUtil from "../utilities/http.util.ts";

export class BaseApi {
    protected readonly http: HttpUtil;

    constructor(headers?: RequiredHeaders) {
        this.http = new HttpUtil(headers);
    }
}