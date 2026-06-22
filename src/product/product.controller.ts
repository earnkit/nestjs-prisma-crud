import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.getById(id);
  }

  @Post()
  create(@Body() body: CreateProductDto) {
    return this.productService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: CreateProductDto) {
    return this.productService.update(id, body);
  }

  @Patch(':id')
  partialUpdate(
    @Param('id') id: string,
    @Body() body: Partial<CreateProductDto>,
  ) {
    return this.productService.partialUpdate(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
