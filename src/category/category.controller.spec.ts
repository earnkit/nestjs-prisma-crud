import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

describe('CategoryController', () => {
  let controller: CategoryController;

  const category = {
    id: 1,
    name: 'Electronics',
    description: 'Electronic devices',
  };

  const categoryService = {
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
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: categoryService,
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('finds all categories', () => {
    categoryService.findAll.mockReturnValue([category]);

    expect(controller.findAll()).toEqual([category]);
    expect(categoryService.findAll).toHaveBeenCalledWith();
  });

  it('finds one category by id', () => {
    categoryService.getById.mockReturnValue(category);

    expect(controller.findOne('1')).toEqual(category);
    expect(categoryService.getById).toHaveBeenCalledWith('1');
  });

  it('creates a category', () => {
    const body = {
      name: 'Electronics',
      description: 'Electronic devices',
    };
    categoryService.create.mockReturnValue(category);

    expect(controller.create(body)).toEqual(category);
    expect(categoryService.create).toHaveBeenCalledWith(body);
  });

  it('updates a category', () => {
    const body = {
      name: 'Gaming',
      description: 'Gaming accessories',
    };
    categoryService.update.mockReturnValue({ ...category, ...body });

    expect(controller.update('1', body)).toEqual({ ...category, ...body });
    expect(categoryService.update).toHaveBeenCalledWith('1', body);
  });

  it('partially updates a category', () => {
    const body = {
      description: 'Updated description',
    };
    categoryService.partialUpdate.mockReturnValue({ ...category, ...body });

    expect(controller.partialUpdate('1', body)).toEqual({
      ...category,
      ...body,
    });
    expect(categoryService.partialUpdate).toHaveBeenCalledWith('1', body);
  });

  it('deletes a category', () => {
    categoryService.delete.mockReturnValue(category);

    expect(controller.delete('1')).toEqual(category);
    expect(categoryService.delete).toHaveBeenCalledWith('1');
  });
});
