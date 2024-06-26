export type ActionResponseValues<Output> =
    ErrorResponse | SuccessResponse<Output> | undefined

export class ActionResponse<Output> {
    public response: ActionResponseValues<Output>;

    constructor(serverResponse: ActionResponseValues<Output>) {
        try {

            if(!serverResponse) {
                this.response = undefined; // empty response
            } else if(this.isSuccess(serverResponse)) {
                this.response = new SuccessResponse(serverResponse.data);
            } else {
                this.response = new ErrorResponse(serverResponse.message);
            }
        } catch (e: any) {
            this.response = new ErrorResponse(e.message);
        }
    }

    private isSuccess(response: ActionResponseValues<Output>): response is SuccessResponse<Output> {
        return (response as SuccessResponse<Output>).data !== undefined;
    }
}

export class ErrorResponse {
    public readonly message: string;
    constructor(message: string) {
        this.message = message;
    }
}

export class SuccessResponse<Output> {
    public readonly data: Output;
    constructor(data: Output) {
        this.data = data;
    }
}