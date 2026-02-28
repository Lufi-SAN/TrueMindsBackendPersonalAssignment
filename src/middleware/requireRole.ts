import { type Request, type Response, type NextFunction } from "express";
import { UnauthorizedUser } from "../domain/user/user.errors.js";

export function requireRole(req: Request, res: Response, next: NextFunction) {
    //simulate role been passed from users table through JWT or something
    const role = Math.random() < 0.5 ? "admin" : "user";
    if(role === "admin") {
        next()
    } else {
        throw new UnauthorizedUser('Your clearance level is too low for this action')
    }
}