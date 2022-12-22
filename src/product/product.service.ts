import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schemas';
import { CreateProductDTO } from './dto/product.dto';


@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>){}

    async create(createProductDTO: CreateProductDTO): Promise<Product> {
        const createdProduct = new this.productModel(createProductDTO);
        return createdProduct.save();
    }

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async find(id: string): Promise<Product> {
        return this.productModel.findById(id);
    }

    async update(id: string, createProductDTO: CreateProductDTO): Promise<Product> {
        return this.productModel.findByIdAndUpdate(id, createProductDTO, { new: true });
    }

    async delete(id: string): Promise<Product> {
        return this.productModel.findByIdAndDelete(id);
    }
}

