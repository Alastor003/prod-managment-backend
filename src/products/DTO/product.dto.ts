import { IsNotEmpty, IsString, IsNumber, IsInt, Min, Max, IsPositive } from 'class-validator';

export class ProductDto {
    @IsNotEmpty()
    @IsString()
    handle: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    sku: number;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    grams: number;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    stock: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    comparePrice: number;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    barcode: number;
}