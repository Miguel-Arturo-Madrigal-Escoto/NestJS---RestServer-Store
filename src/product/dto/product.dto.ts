
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductDTO {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsString()
    readonly imageURL: string;

    @IsNotEmpty()
    readonly price: number;

    @IsOptional()
    @IsString()
    readonly createdAt: Date;
}