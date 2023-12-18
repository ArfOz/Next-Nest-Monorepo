/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { BadRequestException, BadRequestExceptionType } from '@exceptions';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(
        new ValidationPipe({
            exceptionFactory: (errors) => {
                return new BadRequestException(
                    BadRequestExceptionType.BAD_REQUEST,
                    new Error(
                        errors
                            .map((error) => {
                                let detay = '';
                                return (detay =
                                    detay +
                                    error.constraints[
                                        Object.keys(error.constraints)[0]
                                    ]);
                            })
                            .toString()
                    ),
                    404
                );
            },
            stopAtFirstError: true
        })
    );
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    const port = process.env.PORT || 3300;
    await app.listen(port);
    Logger.log(
        `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
    );
}

bootstrap();
