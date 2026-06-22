import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryService } from './category.service';

describe('CategoryService', () => {
  let service: CategoryService;

  const category = {
    id: 1,
    name: 'Electronics',
    description: 'Electronic devices',
  };

  const prismaService = {
    category: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: PrismaService,
          useValue: prismaService,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('finds all categories', async () => {
    prismaService.category.findMany.mockResolvedValue([category]);

    await expect(service.findAll()).resolves.toEqual([category]);
    expect(prismaService.category.findMany).toHaveBeenCalledWith();
  });

  it('finds a category by numeric id', async () => {
    prismaService.category.findUnique.mockResolvedValue(category);

    await expect(service.getById('1')).resolves.toEqual(category);
    expect(prismaService.category.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('returns No Category when the category does not exist', async () => {
    prismaService.category.findUnique.mockResolvedValue(null);

    await expect(service.getById('999')).rejects.toThrow(NotFoundException);
  });

  it('creates a category', async () => {
    const data = {
      name: 'Electronics',
      description: 'Electronic devices',
    };
    prismaService.category.create.mockResolvedValue(category);

    await expect(service.create(data)).resolves.toEqual(category);
    expect(prismaService.category.create).toHaveBeenCalledWith({
      data,
    });
  });

  it('updates a category', async () => {
    const data = {
      name: 'Gaming',
      description: 'Gaming accessories',
    };
    const updatedCategory = {
      ...category,
      ...data,
    };
    prismaService.category.update.mockResolvedValue(updatedCategory);

    await expect(service.update('1', data)).resolves.toEqual(updatedCategory);
    expect(prismaService.category.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data,
    });
  });

  it('partially updates a category', async () => {
    const data = {
      description: 'Updated description',
    };
    const updatedCategory = {
      ...category,
      ...data,
    };
    prismaService.category.update.mockResolvedValue(updatedCategory);

    await expect(service.partialUpdate('1', data)).resolves.toEqual(
      updatedCategory,
    );
    expect(prismaService.category.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data,
    });
  });

  it('deletes a category', async () => {
    prismaService.category.delete.mockResolvedValue(category);

    await expect(service.delete('1')).resolves.toEqual(category);
    expect(prismaService.category.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
