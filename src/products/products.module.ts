import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './services/product.service';
import { Product } from 'src/entities/product.entity';
import { ProductController } from './controller/product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController], 
  providers: [ProductService],
})
export class ProductsModule {}