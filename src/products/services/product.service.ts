import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { ProductDto } from '../DTO/product.dto';


@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async getAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async getById(idProduct: number){
    const product = await this.productRepository.findOne({
      where : {
          idProduct 
        }
      });
    if (!product) {
      throw new NotFoundException(`Product with id ${idProduct} not found`);
    }
    return product;
  }

  async create(product : ProductDto) {
    const newProduct = this.productRepository.create(product);
    return await this.productRepository.save(newProduct);
  }

  async update(idProduct: number, product: ProductDto): Promise<ProductDto> {
    await this.productRepository.update({idProduct}, product);
    const updateProduct =  await this.productRepository.findOne({
      where : {
          idProduct 
        }
      });
      return updateProduct;
  }

  async delete(id: number): Promise<void> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
  }
}