import { LogErrorDetails } from "../models/log-error-details.model.ts"
import { IResponse } from "../models/response.model.ts";

export default class ErrorHandler {
    private logErrorDetails: LogErrorDetails;

    constructor(logErrorDetails: LogErrorDetails) {
        this.logErrorDetails = logErrorDetails;
    }

    logError(isError: boolean, res: IResponse, tags: Map<string, any> = new Map()): void {
        if (!isError) return;

        const traceparentHeader = res.request?.headers['Traceparent'];
        const errorData =
        {
            url: res.url,
            status: res.status,
            error_code: res.error_code,
            traceparent: traceparentHeader?.toString(),
            ...tags
        };

        this.logErrorDetails(errorData);
    }
} 