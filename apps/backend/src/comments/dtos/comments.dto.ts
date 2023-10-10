import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddCommentsJsonDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    restaurantId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    Lon?: string | null;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    comment: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    Stars: number;
}
