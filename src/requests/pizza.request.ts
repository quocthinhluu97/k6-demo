import { RefinedResponse } from 'k6/http';
import QuickPizzaApi from '../apis/quick-pizza.api';
import OrderRestriction from '../models/order-restriction.model';
import { BaseRequest } from './base.request';

export class PizzaRequest extends BaseRequest {
    readonly #quickPizzaApi: QuickPizzaApi;

    constructor(userId: number) {
        super();
        this.#quickPizzaApi = new QuickPizzaApi({
            "X-User-ID": userId
        });
    }

    async sendOrder(restrictions: OrderRestriction) {
        const res: RefinedResponse = await this.handleRequest(() => this.#quickPizzaApi.sendOrder(restrictions));
    }
}