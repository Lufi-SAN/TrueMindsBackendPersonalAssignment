import { type DomainError } from "./shared.js";

export class PrototypePollutionError extends Error implements DomainError {
    public code : number;
    constructor(message : string) {
        super(message),
        this.code = 400,
        this.name = 'PrototypePollutionError';
        Object.setPrototypeOf(this, new.target.prototype);
    }
}