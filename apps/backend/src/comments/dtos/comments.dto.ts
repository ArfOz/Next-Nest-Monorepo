import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddCommentsJsonDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    restaurant_id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    comment: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    stars: number;
}

export class DeleteCommentsJsonDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    id: string;
}
