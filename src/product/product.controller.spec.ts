import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let controller: ProductController;

  const product = {
    id: 1,
    name: 'Keyboard',
    price: 1200,
  };

  const productService = {
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
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: productService,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('finds all products', () => {
    productService.findAll.mockReturnValue([product]);

    expect(controller.findAll()).toEqual([product]);
    expect(productService.findAll).toHaveBeenCalledWith();
  });

  it('finds one product by id', () => {
    productService.getById.mockReturnValue(product);

    expect(controller.findOne('1')).toEqual(product);
    expect(productService.getById).toHaveBeenCalledWith('1');
  });

  it('creates a product', () => {
    const body = {
      name: 'Keyboard',
      price: 1200,
    };
    productService.create.mockReturnValue(product);

    expect(controller.create(body)).toEqual(product);
    expect(productService.create).toHaveBeenCalledWith(body);
  });

  it('updates a product', () => {
    const body = {
      name: 'Mouse',
      price: 800,
    };
    productService.update.mockReturnValue({ ...product, ...body });

    expect(controller.update('1', body)).toEqual({ ...product, ...body });
    expect(productService.update).toHaveBeenCalledWith('1', body);
  });

  it('partially updates a product', () => {
    const body = {
      price: 900,
    };
    productService.partialUpdate.mockReturnValue({ ...product, ...body });

    expect(controller.partialUpdate('1', body)).toEqual({
      ...product,
      ...body,
    });
    expect(productService.partialUpdate).toHaveBeenCalledWith('1', body);
  });

  it('deletes a product', () => {
    productService.delete.mockReturnValue(product);

    expect(controller.delete('1')).toEqual(product);
    expect(productService.delete).toHaveBeenCalledWith('1');
  });
});
