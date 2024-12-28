import { RefinedResponse } from 'k6/http';
export default class ErrorDetails {
    readonly #response: RefinedResponse;

    constructor(res: RefinedResponse) {
        this.#response = res;
    }

    export() {
        return {
            request: this.#response.request,
            status: this.#response.status,
            error: this.#response.error,
            headers: this.#response.headers,
            body: this.#response.body,
        }
    }
}