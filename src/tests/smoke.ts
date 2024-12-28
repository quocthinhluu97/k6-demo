import http from "k6/http";
import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import WorkLoadConfig from "../config/work-load.conf.ts";
import FileUtils from "../utilities/file.util.ts";
import AppSettings from "../constants/app-settings.const.ts";
import { PizzaRequest } from "../requests/pizza.request.ts";
import OrderRestriction from "../models/order-restriction.model.ts";
import { _faker } from "../utilities/faker.util.ts";

const recommendationsFile = FileUtils.getPathByEnv(AppSettings.RECOMMENDATIONS_FILE);
const recommendations = new SharedArray('recommendations', function () {
    return papaparse.parse(open(recommendationsFile), { header: true }).data
});

export const options = {
    setupTimeout: '30s',
    scenarios: {
        smoke: {
            executor: 'ramping-vus',
            exec: 'test',
            stages: WorkLoadConfig.SMOKE
        }

    }
};

const maxSleepTime = 5;

export function setup() {
    let res = http.get(__ENV.BASE_URL);
    if (res.status !== 200) {
        throw new Error(`Got unexpected status code ${res.status} when trying to setup. Exiting.`);
    }
}

export default async function test() {
    const pizzaRequest = new PizzaRequest(__ENV.USER_ID);
    let restrictions: OrderRestriction = _faker.orderRestrictions();
    restrictions.excludedTools = [recommendations[0].excluded_tools];
    await pizzaRequest.sendOrder(restrictions);

    sleep(Math.random() * maxSleepTime);
}

export function teardown() {
    console.log("Tearing down.");
}