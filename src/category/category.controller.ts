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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    findAll() {
        return this.categoryService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.categoryService.getById(id);
    }

    @Post()
    create(@Body() body: CreateCategoryDto) {
        return this.categoryService.create(body);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: CreateCategoryDto) {
        return this.categoryService.update(id, body);
    }

    @Patch(':id')
    partialUpdate(
        @Param('id') id: string,
        @Body() body: Partial<CreateCategoryDto>,
    ) {
        return this.categoryService.partialUpdate(id, body);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.categoryService.delete(id);
    }
}
