import { RefinedResponse } from 'k6/http';
import http from 'k6/http';
import { check } from 'k6';
import ErrorDetails from '../models/log-error-details.model';

export class BaseRequest {
    protected async handleRequest(requestFn: () => Promise<RefinedResponse>, expectedStatusCodes: number[] = [200]): Promise<RefinedResponse> {
        // Set expected response status codes
        http.setResponseCallback(http.expectedStatuses(...expectedStatusCodes));

        // Make the request
        let res: RefinedResponse = await requestFn();

        // Check if the response status ccode is within the expected array
        const checkPassed = check(res, {
            [`is status ${expectedStatusCodes.join(' or ')}`]: (r: RefinedResponse) => expectedStatusCodes.includes(r.status),
        });

        // Log error if the check fails
        this.logError(!checkPassed, new ErrorDetails(res));

        return res;
    }

    protected logError(checkPassed: boolean, errorDetails: ErrorDetails) {
        if (!checkPassed) return;
        const error: Partial<RefinedResponse> = errorDetails.export();
        console.error('Error details: ', JSON.stringify(error, null, 2));
    }
}