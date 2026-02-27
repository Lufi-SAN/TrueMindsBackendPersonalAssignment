import { type DomainError } from "../shared.js";

export class BadRequestError extends Error implements DomainError {
    public code : number;
    constructor(message : string) {
        super(message),
        this.code = 400,
        this.name = 'BadRequestError';
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class InvalidUserFormCredentials extends Error implements DomainError {
    public code : number;
    constructor(message : string) {
        super(message),
        this.code = 422,
        this.name = 'InvalidUserFormCredentials';
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class UserAlreadyExists extends Error implements DomainError {
    public code : number;
    constructor(message : string) {
        super(message),
        this.code = 409,
        this.name = 'UserAlreadyExists';
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class UserDoesNotExist extends Error implements DomainError {
    public code : number;
    constructor(message : string) {
        super(message),
        this.code = 404,
        this.name = 'UserDoesNotExist';
        Object.setPrototypeOf(this, new.target.prototype);
    }
}