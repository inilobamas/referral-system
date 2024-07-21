import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PurchasesModule } from './purchases/purchases.module';
import { User } from './users/user.entity';
import { Purchase } from './purchases/purchase.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [User, Purchase],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    PurchasesModule,
  ],
})
export class AppModule {}