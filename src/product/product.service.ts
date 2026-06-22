import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.product.findMany();
  }

  async getById(id: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  create(data: CreateProductDto) {
    return this.prisma.product.create({
      data,
    });
  }

  update(id: string, data: CreateProductDto) {
    return this.prisma.product.update({
      where: { id: Number(id) },
      data,
    });
  }

  partialUpdate(id: string, data: Partial<CreateProductDto>) {
    return this.prisma.product.update({
      where: { id: Number(id) },
      data,
    });
  }

  delete(id: string) {
    return this.prisma.product.delete({
      where: { id: Number(id) },
    });
  }
}
