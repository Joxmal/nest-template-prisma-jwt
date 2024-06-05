import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { LoggerMiddleware } from './logger/logger.middleware';
import {JwtModule} from '@nestjs/jwt'
import { jwtConstants } from './entities/jwt-contanst';
import { JwtStrategy } from './entities/jwt-strategy';


@Module({
  imports:[
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],


  providers: [AuthService,PrismaService,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
     .apply(LoggerMiddleware)
     .forRoutes('auth');
  }
}
