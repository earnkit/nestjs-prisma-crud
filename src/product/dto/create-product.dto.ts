import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'The name of the product' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ description: 'The price of the product' })
  @IsNumber()
  @IsNotEmpty()
  price!: number;
}
