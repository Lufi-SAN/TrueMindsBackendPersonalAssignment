import type { DomainError } from "../shared.js";

export class OrderDoesNotExist extends Error implements DomainError {
    public code : number;
    constructor(message : string) {
        super(message),
        this.code = 404,
        this.name = 'OrderDoesNotExist';
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class OrderIdConflict extends Error implements DomainError {
    public code : number;
    constructor(message : string) {
        super(message),
        this.code = 409,
        this.name = 'OrderIdConflict';
        Object.setPrototypeOf(this, new.target.prototype);
    }
}