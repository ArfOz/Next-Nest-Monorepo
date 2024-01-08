import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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

export class UpdateCommentsJsonDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    id: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    title?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    comment?: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    star?: number;
}

export class LikeDislikeCommentJsonDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    commentId: string;
}
