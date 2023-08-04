export class MissingParameterError extends Error {
    public parameter: string;

    constructor(parameter: string) {
        super(`Parameter ${parameter} is missing`);
        this.parameter = parameter;
    }
}