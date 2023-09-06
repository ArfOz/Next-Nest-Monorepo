import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddRestaurantJsonDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    id?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    Lat?: string | null;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    Lon?: string | null;
}
