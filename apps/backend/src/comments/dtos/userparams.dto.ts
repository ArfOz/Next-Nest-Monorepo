import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UserParamsDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    sub: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    iat: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    exp: Date;
}
