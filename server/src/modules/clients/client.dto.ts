import { z } from 'zod';
import BaseDto from '../../common/dto/baseDto.js';

class CreateClientDto extends BaseDto {
    static schema = z.object({
        name: z
            .string()
            .trim()
            .min(1, 'name is required')
            .max(100, 'name must be 100 characters or fewer'),
        redirectUris: z
            .array(z.string().min(1, 'redirectUris entries must be non-empty strings'))
            .min(1, 'redirectUris must contain at least one URI'),
        grantTypes: z.array(z.string()).optional(),
        responseTypes: z.array(z.string()).optional(),
        scopes: z.array(z.string()).optional(),
    });
}

export default CreateClientDto;
export type CreateClientInput = z.infer<typeof CreateClientDto.schema>;