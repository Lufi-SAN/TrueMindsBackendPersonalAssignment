import { type metaType } from "./metaDataBuilder.js";

export class SuccessJSON {
    constructor(public status: 'success' | 'fail' | 'error', public message: string, public data: Record<string, any> = {}, public links: Record<string, any> = {}, public meta: metaType | {}) {
    }
}

