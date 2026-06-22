import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const count = 12;
    return `Hello Earn, NestJS Day 1! ${count + 15}`;
  }
}
