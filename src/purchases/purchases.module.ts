import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { Purchase } from './purchase.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase, User])],
  providers: [PurchasesService],
  controllers: [PurchasesController],
  exports: [PurchasesService],
})
export class PurchasesModule {}