import { IsMongoId, IsNotEmpty } from 'class-validator';

export class ProductParamDTO {
    @IsNotEmpty()
    @IsMongoId()
    readonly id: string;
}