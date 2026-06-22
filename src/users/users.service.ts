import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany();
  }

  async getById(id: string) {
    const userMember = await this.prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!userMember) {
      throw new NotFoundException('User not found');
    }
    return userMember;
  }

  create(data: CreateUserDto) {
    return this.prisma.user.create({
      data,
    });
  }

  update(id: string, data: CreateUserDto) {
    return this.prisma.user.update({
      where: {
        id: Number(id),
      },
      data,
    });
  }

  partialUpdate(id: string, data: Partial<CreateUserDto>) {
    return this.prisma.user.update({
      where: {
        id: Number(id),
      },
      data,
    });
  }

  delete(id: string) {
    return this.prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
  }
}
