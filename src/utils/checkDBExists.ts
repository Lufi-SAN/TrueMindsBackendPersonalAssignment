import fs from "fs";

export function checkDBExists(path: String) : undefined | string {
    return fs.mkdirSync(path as string, {recursive: true})
}

