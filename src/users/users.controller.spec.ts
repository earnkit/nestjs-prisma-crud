import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const user = {
    id: 1,
    name: 'Earn',
    email: 'earn@example.com',
  };

  const usersService = {
    findAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    partialUpdate: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: usersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('finds all users', () => {
    usersService.findAll.mockReturnValue([user]);

    expect(controller.findAll()).toEqual([user]);
    expect(usersService.findAll).toHaveBeenCalledWith();
  });

  it('finds one user by id', () => {
    usersService.getById.mockReturnValue(user);

    expect(controller.getById('1')).toEqual(user);
    expect(usersService.getById).toHaveBeenCalledWith('1');
  });

  it('creates a user', () => {
    const body = {
      name: 'Earn',
      email: 'earn@example.com',
    };
    usersService.create.mockReturnValue(user);

    expect(controller.create(body)).toEqual(user);
    expect(usersService.create).toHaveBeenCalledWith(body);
  });

  it('updates a user', () => {
    const body = {
      name: 'Earn Updated',
      email: 'updated@example.com',
    };
    usersService.update.mockReturnValue({ ...user, ...body });

    expect(controller.update('1', body)).toEqual({ ...user, ...body });
    expect(usersService.update).toHaveBeenCalledWith('1', body);
  });

  it('partially updates a user', () => {
    const body = {
      email: 'new@example.com',
    };
    usersService.partialUpdate.mockReturnValue({ ...user, ...body });

    expect(controller.partialUpdate('1', body)).toEqual({ ...user, ...body });
    expect(usersService.partialUpdate).toHaveBeenCalledWith('1', body);
  });

  it('deletes a user', () => {
    usersService.delete.mockReturnValue(user);

    expect(controller.delete('1')).toEqual(user);
    expect(usersService.delete).toHaveBeenCalledWith('1');
  });
});
