import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

describe('Category API (e2e)', () => {
  let app: INestApplication<App>;

  type CreatedCategoryResponse = { id: number };

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

  it('GET /category should return 200', () => {
    return request(app.getHttpServer()).get('/category').expect(200);
  });

  it('POST /category should return 201', () => {
    return request(app.getHttpServer())
      .post('/category')
      .send({
        name: 'Electronics',
        description: 'Electronic devices',
      })
      .expect(201);
  });

  it('PUT /category/:id should return 200', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/category')
      .send({
        name: 'Gaming',
        description: 'Gaming accessories',
      })
      .expect(201);

    const createdCategory = createResponse.body as CreatedCategoryResponse;

    return request(app.getHttpServer())
      .put(`/category/${createdCategory.id}`)
      .send({
        name: 'Gaming edited',
        description: 'Updated gaming accessories',
      })
      .expect(200);
  });

  it('POST /category should return 400 when name is empty', () => {
    return request(app.getHttpServer())
      .post('/category')
      .send({
        name: '',
        description: 'Electronic devices',
      })
      .expect(400);
  });

  it('POST /category should return 400 when description is not a string', () => {
    return request(app.getHttpServer())
      .post('/category')
      .send({
        name: 'Electronics',
        description: 123,
      })
      .expect(400);
  });

  it('DELETE /category/:id should return 200', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/category')
      .send({
        name: 'Temporary category',
        description: 'Created for delete test',
      })
      .expect(201);

    const createdCategory = createResponse.body as CreatedCategoryResponse;

    return request(app.getHttpServer())
      .delete(`/category/${createdCategory.id}`)
      .expect(200);
  });
});
