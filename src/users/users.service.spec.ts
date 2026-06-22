import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;

  const user = {
    id: 1,
    name: 'Earn',
    email: 'earn@example.com',
  };

  const prismaService = {
    user: {
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
        UsersService,
        {
          provide: PrismaService,
          useValue: prismaService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('finds all users', async () => {
    prismaService.user.findMany.mockResolvedValue([user]);

    await expect(service.findAll()).resolves.toEqual([user]);
    expect(prismaService.user.findMany).toHaveBeenCalledWith();
  });

  it('finds a user by numeric id', async () => {
    prismaService.user.findUnique.mockResolvedValue(user);

    await expect(service.getById('1')).resolves.toEqual(user);
    expect(prismaService.user.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('returns No User when the user does not exist', async () => {
    prismaService.user.findUnique.mockResolvedValue(null);

    await expect(service.getById('999')).rejects.toThrow(NotFoundException);
  });

  it('creates a user', async () => {
    const data = {
      name: 'Earn',
      email: 'earn@example.com',
    };
    prismaService.user.create.mockResolvedValue(user);

    await expect(service.create(data)).resolves.toEqual(user);
    expect(prismaService.user.create).toHaveBeenCalledWith({
      data,
    });
  });

  it('updates a user', async () => {
    const data = {
      name: 'Earn Updated',
      email: 'updated@example.com',
    };
    const updatedUser = {
      ...user,
      ...data,
    };
    prismaService.user.update.mockResolvedValue(updatedUser);

    await expect(service.update('1', data)).resolves.toEqual(updatedUser);
    expect(prismaService.user.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data,
    });
  });

  it('partially updates only provided user fields', async () => {
    const data = {
      email: 'new@example.com',
    };
    const updatedUser = {
      ...user,
      ...data,
    };
    prismaService.user.update.mockResolvedValue(updatedUser);

    await expect(service.partialUpdate('1', data)).resolves.toEqual(
      updatedUser,
    );
    expect(prismaService.user.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data,
    });
  });

  it('deletes a user', async () => {
    prismaService.user.delete.mockResolvedValue(user);

    await expect(service.delete('1')).resolves.toEqual(user);
    expect(prismaService.user.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
