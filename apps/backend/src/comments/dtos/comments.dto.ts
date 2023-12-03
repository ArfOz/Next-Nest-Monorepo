import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddCommentsJsonDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    restaurantId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    comment: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    star: number;
}

export class DeleteCommentsJsonDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    id: string;
}
