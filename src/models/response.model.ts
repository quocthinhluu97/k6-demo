interface IResponse {
    url: string;
    status: number;
    error_code: string;
    request: {
        headers: {
            [key: string]: string
        };
    };
}

export { IResponse };