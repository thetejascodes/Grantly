import { z } from 'zod'
import ApiError from '../../common/utils/api-error.js'

class BaseDto {
    static schema = z.object({})

    static validate(data:unknown) {
        const result = this.schema.safeParse(data)

        if (!result.success) {
            const errors = result.error.issues.map((issue) => issue.message)
            return { errors, value: null }
        }

        return { value: result.data, error: null }
    }
}

export default BaseDto