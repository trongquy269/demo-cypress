import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    // Ensure env vars are loaded for tests if not already
    process.env.JWT_SECRET = 'test-secret';
    process.env.JWT_EXPIRATION_TIME = '3600';
    process.env.JWT_REFRESH_SECRET = 'test-refresh-secret';
    process.env.JWT_REFRESH_EXPIRATION_TIME = '86400';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/user/login (POST) - should login successfully', () => {
    return request(app.getHttpServer())
      .post('/user/login')
      .send({
        email: 'admin@example.com',
        password: 'Password123!',
        isRemember: true,
      })
      .expect(201) // NestJS default for POST is 201
      .expect((res) => {
        const body = res.body;
        expect(body.statusCode).toBe(200);
        expect(body.message).toBe('Login successfully');
        expect(body.data).toHaveProperty('accessToken');
        expect(body.data).toHaveProperty('refreshToken');
        expect(body.data.user).toHaveProperty('email', 'admin@example.com');
      });
  });

  it('/user/login (POST) - should fail with invalid credentials', () => {
    return (
      request(app.getHttpServer())
        .post('/user/login')
        .send({
          email: 'admin@example.com',
          password: 'WrongPassword',
        })
        .expect(201) // The controller returns 200/201 but the service throws. Wait, if service throws, NestJS filter handles it.
        // If service throws UnauthorizedException, NestJS returns 401.
        .expect(401)
    );
  });
});
