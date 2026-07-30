import ApiError from "../utils/api-error.js"
import type { Request, Response, NextFunction } from "express"

type DtoClass = {
    validate: (data: unknown) => { value: unknown; errors: string[] | null }
}

const validate = (DtoClass: DtoClass) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { errors, value } = DtoClass.validate(req.body)
        if (errors) {
            throw ApiError.badRequest(errors.join("; "))
        }
        req.body = value
        next()
    }
}

export default validate