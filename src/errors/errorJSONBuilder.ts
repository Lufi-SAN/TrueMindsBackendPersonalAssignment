
import { type ErrorDataSchema } from "./error-schema.js";

export function errorData(type : string, title : string, status : number, detail : string, instance : string) : ErrorDataSchema {
    return {
        type,
        title,
        status,
        detail,
        instance
    }
}

export class ErrorJSON extends Error {
    public type!: string;
    public title!: string;
    public status!: number;
    public detail!: string;
    public instance!: string;
    public _links!: Record<string, unknown>;

    constructor(message: string = 'HTTP Error', errorData : ErrorDataSchema, link: Record<string, any>  = {}) {
        super(message);
        Object.assign(this, errorData);
        this._links = link;
        Object.setPrototypeOf(this, new.target.prototype);
    }

    toJSON() {
        return {
            type: this.type,
            title: this.title,
            status: this.status,
            detail: this.detail,
            instance: this.instance,
            _links: this._links
        };
    }
}
