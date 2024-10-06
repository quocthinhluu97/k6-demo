import http from "k6/http";
import { check, sleep } from 'k6';
import { Trend, Counter } from 'k6/metrics'
import ErrorHandler from "../utilities/error-handler.util.ts";
import { WorkLoadConfig } from "../config/work-load.conf.ts";
import OrderPizzaScenario from "../scenarios/order-pizza.ts";

// const BASE_URL = __ENV.BASE_URL || "http://localhost:3333";

export const options = {
    stages: WorkLoadConfig.SMOKE
};

export function setup() {
    let res = http.get(__ENV.BASE_URL);
    if (res.status !== 200) {
        throw new Error(`Got unexpected status code ${res.status} when trying to setup. Exiting.`);
    }
}

const pizzas = new Counter('quickpizza_number_of_pizzas');
const ingredients = new Trend('quickpizza_ingredients');
const errorHandler = new ErrorHandler((error) => { console.error(error) });

export default function () {
    OrderPizzaScenario();
}

export function teardown() {
    console.log("Tearing down.");
}

// export function handleSummary(data) {
//   return {
//     'summary.json': JSON.stringify(data),
//   }
// }