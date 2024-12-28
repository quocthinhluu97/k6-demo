import { RequiredHeaders } from "../models/auth.model.ts";
import HttpUtil from "../utilities/http.util.ts";

export class BaseApi {
    protected readonly _http: HttpUtil;

    constructor(headers?: RequiredHeaders) {
        this._http = new HttpUtil(headers);
    }
}