import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage } from '../productImage/entities/productImage.entity';
import { Product } from './entities/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, //
      ProductImage,
    ]),
  ],
  providers: [
    ProductResolver, //
    ProductService,
  ],
})
export class ProductModule {}
