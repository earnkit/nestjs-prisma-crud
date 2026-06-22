import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

describe('User API (e2e)', () => {
  let app: INestApplication<App>;

  const uniqueEmail = () => `john.doe.${Date.now()}@example.com`;
  type CreatedUserResponse = { id: number };

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

  it('GET /users should return 200', () => {
    return request(app.getHttpServer()).get('/users').expect(200);
  });

  it('POST /users should return 201', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'John Doe',
        email: uniqueEmail(),
      })
      .expect(201);
  });

  it('PUT /users/:id should return 200', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'John Doe',
        email: uniqueEmail(),
      })
      .expect(201);

    const createdUser = createResponse.body as CreatedUserResponse;

    return request(app.getHttpServer())
      .put(`/users/${createdUser.id}`)
      .send({
        name: 'John Doe edited',
        email: uniqueEmail(),
      })
      .expect(200);
  });

  it('POST /users should return 400 when email is not a valid email', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'invalid-email',
      })
      .expect(400);
  });

  it('POST /users should return 400 when name is empty', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        name: '',
        email: uniqueEmail(),
      })
      .expect(400);
  });


  it('DELETE /users/:id should return 200', async () => {
  const createResponse = await request(app.getHttpServer())
    .post('/users')
    .send({
      name: 'John Doe',
      email: uniqueEmail(),
    })
    .expect(201);

  const createdUser = createResponse.body as CreatedUserResponse;

  return request(app.getHttpServer())
    .delete(`/users/${createdUser.id}`)
    .expect(200);
});
});
