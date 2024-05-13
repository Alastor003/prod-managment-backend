import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn({ type: 'int', name: 'IdProduct' })
  idProduct: number;

  @Column({ length: 100, name: 'Handle' })
  handle: string;

  @Column({ length: 100, name: 'Title' })
  title: string;

  @Column({ type: 'longtext', name: 'Description' })
  description: string;

  @Column({ type: 'bigint', name: 'SKU' })
  sku: number;

  @Column({ type: 'float', name: 'Grams' })
  grams: number;

  @Column({ name: 'Stock' })
  stock: number;

  @Column({ type: 'float', name: 'Price' })
  price: number;

  @Column({ type: 'float', name: 'ComparePrice' })
  comparePrice: number;

  @Column({ type: 'bigint', name: 'BarCode' })
  barcode: number;
}