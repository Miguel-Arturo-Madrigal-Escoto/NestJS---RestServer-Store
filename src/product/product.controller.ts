import { Controller, Get, Post, Req, Res, HttpStatus, Body, Param, NotFoundException, Put, Delete } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateProductDTO } from './dto/product.dto';
import { ProductParamDTO } from './dto/product.params.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService){}

    @Get()
    async getProducts(@Req() req: Request, @Res() res: Response) {
        const products = await this.productService.findAll();
        res.status(HttpStatus.FOUND).json({
            ok: true,
            products
        });
    }

    @Get('/:id')
    async getProduct(@Req() req: Request, @Res() res: Response, @Param() productParamsDTO: ProductParamDTO) {      
        const product = await this.productService.find(productParamsDTO.id);
        if (!product) throw new NotFoundException('product with id ' + productParamsDTO.id + ' does not exist');
        res.status(HttpStatus.FOUND).json({
            ok: true,
            product
        });
    }

    @Post('/create')
    async createProduct(@Body() createProductDTO: CreateProductDTO, @Req() req: Request, @Res() res: Response) {
        
        const product = await this.productService.create(createProductDTO);

        res.status(HttpStatus.CREATED).json({
            ok: true,
            product
        });
    }

    @Delete('/:id')
    async deleteProduct(@Param() productParamsDTO: ProductParamDTO, @Res() res: Response){
        const product = await this.productService.delete(productParamsDTO.id);
        if (!product) throw new NotFoundException('product with id ' + productParamsDTO.id + ' does not exist');
        res.status(HttpStatus.CREATED).json({
            OK: true,
            product
        })
    }

    @Put('/:id')
    async updateProduct(
        @Param() productParamsDTO: ProductParamDTO, 
        @Req() req: Request,
        @Res() res: Response,
        @Body() createProductDTO: CreateProductDTO){
        
        const product = await this.productService.update(productParamsDTO.id, {
            ...createProductDTO,
            createdAt: new Date()
        });
        if (!product) throw new NotFoundException('product with id ' + productParamsDTO.id + ' does not exist');
        res.status(HttpStatus.CREATED).json({
            OK: true,
            product
        })
    }
}
