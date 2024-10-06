import Urls from "../constants/urls.const.ts";
import { RequiredHeaders } from "../models/auth.model";
import OrderRestriction from "../models/order-restriction.model";
import { IResponse } from "../models/response.model.ts";
import { BaseApi } from "./base.api.ts";

export default class QuickPizzaApi extends BaseApi {
    constructor(options?: RequiredHeaders) {
        super(options);
    }

    public async sendOrder(restriction: OrderRestriction): Promise<IResponse> {
        const res = await this.http.post({
            url: `${Urls.QuickPizzaService}`,
            body: restriction,
        });

        return res;
    }
}