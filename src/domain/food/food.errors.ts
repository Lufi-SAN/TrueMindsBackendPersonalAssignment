import { type DomainError } from "../shared.js";

export class FoodAlreadyExists extends Error implements DomainError {
    public code : number;
    constructor(message : string) {
        super(message),
        this.code = 409,
        this.name = 'FoodAlreadyExists';
        Object.setPrototypeOf(this, new.target.prototype);
    }
}