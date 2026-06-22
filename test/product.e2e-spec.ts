import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

describe('Product API (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('GET /product should return 200', () => {
    return request(app.getHttpServer()).get('/product').expect(200);
  });

  it('POST /product should return 201', () => {
    return request(app.getHttpServer())
      .post('/product')
      .send({
        name: 'Keyboard',
        price: 1200,
      })
      .expect(201);
  });

  it('PUT /product/:id should return 200', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/product')
      .send({
        name: 'John Doe',
        price: 1500,
      })
      .expect(201);

    const createdProduct = createResponse.body as { id: number };

    return request(app.getHttpServer())
      .put(`/product/${createdProduct.id}`)
      .send({
        name: 'John Doe edited',
        price: 1600,
      })
      .expect(200);
  });


  it('POST /product should return 400 when price is not a number', () => {
    return request(app.getHttpServer())
      .post('/product')
      .send({
        name: 'Keyboard',
        price: 'abc',
      })
      .expect(400);
  });

  it('POST /product should return 400 when name is empty', () => {
    return request(app.getHttpServer())
      .post('/product')
      .send({
        name: '',
        price: 1500,
      })
      .expect(400);
  });

  it('DELETE /product/:id should return 200', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/product')
      .send({
        name: 'test product',
        price: 1500,
      })
      .expect(201);

    const createdProduct = createResponse.body as { id: number };

    return request(app.getHttpServer())
      .delete(`/product/${createdProduct.id}`)
      .expect(200);
  });
});
