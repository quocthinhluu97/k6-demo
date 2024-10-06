import { check, sleep } from 'k6';
import faker from 'k6/x/faker';
import ErrorHandler from "../utilities/error-handler.util.ts";
import QuickPizzaApi from '../apis/quick-pizza.api.ts';
import { IResponse } from '../models/response.model.ts';
import OrderRestriction from '../models/order-restriction.model.ts';

const errorHandler = new ErrorHandler((error) => { console.error(error) });

export default async function OrderPizzaScenario() {
    let restrictions: OrderRestriction = {
        maxCaloriesPerSlice: faker.numbers.uintRange(0, 500),
        mustBeVegetarian: faker.numbers.boolean(),
        excludedIngredients: ["pepperoni"],
        excludedTools: ["knife"],
        maxNumberOfToppings: faker.numbers.uintRange(1, 5),
        minNumberOfToppings: faker.numbers.uintRange(0, 1),
    };

    const quickPizzaApi = new QuickPizzaApi(
        {
            "X-User-ID": __ENV.USER_ID,
        },
    );

    let res: IResponse = await quickPizzaApi.sendOrder(restrictions);

    const checkStatus = check(res, {
        "is status 200": (r) => r.status === 200,
    })

    errorHandler.logError(!checkStatus, res);

    sleep(1);
}