export interface ErrorResponse {
    statusCode: number;
    error:      string;
    message:    ErrorData[];
    data:       ErrorData[];
}

export interface ErrorData {
    messages: ErrorMessage[];
}

export interface ErrorMessage {
    id:      string;
    message: string;
}
