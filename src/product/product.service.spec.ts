import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ProductService } from './product.service';
import { NotFoundException } from '@nestjs/common';

describe('ProductService', () => {
  let service: ProductService;

  const product = {
    id: 1,
    name: 'Keyboard',
    price: 1200,
  };

  const prismaService = {
    product: {
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
        ProductService,
        {
          provide: PrismaService,
          useValue: prismaService,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('finds all products', async () => {
    prismaService.product.findMany.mockResolvedValue([product]);

    await expect(service.findAll()).resolves.toEqual([product]);
    expect(prismaService.product.findMany).toHaveBeenCalledWith();
  });

  it('finds a product by numeric id', async () => {
    prismaService.product.findUnique.mockResolvedValue(product);

    await expect(service.getById('1')).resolves.toEqual(product);
    expect(prismaService.product.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('returns No Product when the product does not exist', async () => {
    prismaService.product.findUnique.mockResolvedValue(null);

    await expect(service.getById('999')).rejects.toThrow(NotFoundException);
  });

  it('creates a product', async () => {
    const data = {
      name: 'Keyboard',
      price: 1200,
    };
    prismaService.product.create.mockResolvedValue(product);

    await expect(service.create(data)).resolves.toEqual(product);
    expect(prismaService.product.create).toHaveBeenCalledWith({
      data,
    });
  });

  it('updates a product', async () => {
    const data = {
      name: 'Mouse',
      price: 800,
    };
    const updatedProduct = {
      ...product,
      ...data,
    };
    prismaService.product.update.mockResolvedValue(updatedProduct);

    await expect(service.update('1', data)).resolves.toEqual(updatedProduct);
    expect(prismaService.product.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data,
    });
  });

  it('partially updates a product', async () => {
    const data = {
      price: 900,
    };
    const updatedProduct = {
      ...product,
      ...data,
    };
    prismaService.product.update.mockResolvedValue(updatedProduct);

    await expect(service.partialUpdate('1', data)).resolves.toEqual(
      updatedProduct,
    );
    expect(prismaService.product.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data,
    });
  });

  it('deletes a product', async () => {
    prismaService.product.delete.mockResolvedValue(product);

    await expect(service.delete('1')).resolves.toEqual(product);
    expect(prismaService.product.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
