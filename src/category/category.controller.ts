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
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    @ApiOperation({ summary: 'Find all categories' })
    findAll() {
        return this.categoryService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find a category by ID' })
    findOne(@Param('id') id: string) {
        return this.categoryService.getById(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new category' })
    create(@Body() body: CreateCategoryDto) {
        return this.categoryService.create(body);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a category by ID' })
    update(@Param('id') id: string, @Body() body: CreateCategoryDto) {
        return this.categoryService.update(id, body);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Partially update a category by ID' })
    partialUpdate(
        @Param('id') id: string,
        @Body() body: Partial<CreateCategoryDto>,
    ) {
        return this.categoryService.partialUpdate(id, body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a category by ID' })
    delete(@Param('id') id: string) {
        return this.categoryService.delete(id);
    }
}
