import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Product as P } from '../interfaces/product.interface';

export type ProductDocument = HydratedDocument<P>;

@Schema()
export class Product {
    @Prop({ required: true, type: String })
    name: string;

    @Prop({ required: true, type: String })
    description: string;

    @Prop({ required: true, type: String })
    imageURL: string;

    @Prop({ required: true, type: Number })
    price: number;

    @Prop({ required: false, type: Date, default: Date.now() })
    createdAt?: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);