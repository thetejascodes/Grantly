import { z } from 'zod'

class BaseDto {
    static schema = z.object({})

    static validate(data: unknown) {
        const result = this.schema.safeParse(data)

        if (!result.success) {
            const errors = result.error.issues.map((issue) => issue.message)
            return { errors, value: null }
        }

        return { value: result.data, errors: null }
    }
}

export default BaseDto