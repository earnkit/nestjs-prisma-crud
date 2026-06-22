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
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Find all products' })
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a product by ID' })
  findOne(@Param('id') id: string) {
    return this.productService.getById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  create(@Body() body: CreateProductDto) {
    return this.productService.create(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a product by ID' })
  update(@Param('id') id: string, @Body() body: CreateProductDto) {
    return this.productService.update(id, body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Partially update a product by ID' })
  partialUpdate(
    @Param('id') id: string,
    @Body() body: Partial<CreateProductDto>,
  ) {
    return this.productService.partialUpdate(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
