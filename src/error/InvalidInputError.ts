export class InvalidInputError extends Error {
    public invalidData: any;

    constructor(invalidData: any) {
        super('Given data is invalid');
        this.invalidData = invalidData;
    }
}
