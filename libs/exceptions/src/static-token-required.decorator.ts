import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

export function StaticTokenRequired(): MethodDecorator {
    return applyDecorators(
        SetMetadata('staticTokenRequired', true),
        ApiBearerAuth('static-token'),
        ApiUnauthorizedResponse({
            description: 'Unauthorized (Static Token Required)',
            schema: {
                type: 'object',
                properties: {
                    error: { type: 'boolean', example: true },
                    message: {
                        type: 'string',
                        example:
                            'No token was passed as a Bearer token in the Authorization header',
                    },
                },
            },
        }),
    );
}
