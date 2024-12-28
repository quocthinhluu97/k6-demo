import Urls from "../constants/urls.const.ts";
import { RequiredHeaders } from "../models/auth.model.ts";
import OrderRestriction from "../models/order-restriction.model.ts";
import { BaseApi } from "./base.api.ts";
import { RefinedResponse} from 'k6/http';

export default class QuickPizzaApi extends BaseApi {
    constructor(options?: RequiredHeaders) {
        super(options);
    }

    public async sendOrder(restriction: OrderRestriction): Promise<RefinedResponse> {
        const res = await this._http.post<RefinedResponse>({
            url: `${Urls.QuickPizzaService}`,
            body: restriction,
        });

        return res;
    }
}