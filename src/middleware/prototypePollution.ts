import { PrototypePollutionError } from "../domain/miscellaneous.js"

export function prototypePollutionCheck(object: Record<string, any>) {
    const forbiddenKeys = ["__proto__", "constructor", "prototype"]
    for (const key in object) {
        if (forbiddenKeys.includes(key)) {
            throw new PrototypePollutionError('Invalid input data')
        }
        if (Object.prototype.toString.call(object[key]) === '[object Object]') {
            prototypePollutionCheck(object[key])
        }
    }
}