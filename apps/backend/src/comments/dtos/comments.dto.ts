import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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
    @IsString()
    stars: number;
}
