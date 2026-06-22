import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

    findAll() {
        return this.prisma.category.findMany();
    }

    async getById(id: string) {
        const category = await this.prisma.category.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!category) {
            throw new NotFoundException('Category not found');
        }
        return category;
    }

    create(data: CreateCategoryDto) {
        return this.prisma.category.create({
            data,
        });
    }

    update(id: string, data: CreateCategoryDto) {
        return this.prisma.category.update({
            where: { id: Number(id) },
            data,
        });
    }

    partialUpdate(id: string, data: Partial<CreateCategoryDto>) {
        return this.prisma.category.update({
            where: { id: Number(id) },
            data,
        });
    }

    delete(id: string) {
        return this.prisma.category.delete({
            where: { id: Number(id) },
        });
    }
}
