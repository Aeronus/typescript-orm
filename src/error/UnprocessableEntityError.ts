export class UnprocessableEntityError extends Error {
    public invalidData: any;

    constructor(invalidData: any) {
        super('Given data is an unprocessable entity');
        this.invalidData = invalidData;
    }
}
