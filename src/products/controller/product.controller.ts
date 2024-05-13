import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { Product } from 'src/entities/product.entity';
import { ProductService } from 'src/products/services/product.service';
import { ProductDto } from '../DTO/product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // http://localhost:3000/products
  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productService.getAll();
  }

  // http://localhost:3000/products/:id
  @Get(':id')
  async getProductById(@Param('id') id: number): Promise<Product> {
    const product = await this.productService.getById(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  // http://localhost:3000/products, body: {body del producto}
  @Post()
  async createProduct(@Body() product: ProductDto): Promise<ProductDto> {
    return this.productService.create(product);
  }

  // http://localhost:3000/products/:id
  @Put(':id')
  async updateProduct(@Param('id') id: number, @Body() productData: ProductDto): Promise<ProductDto> {
    return this.productService.update(id, productData);
  }

  // http://localhost:3000/products/:id
  @Delete(':id')
  async deleteProduct(@Param('id') id: number): Promise<void> {
    return this.productService.delete(id);
  }
}