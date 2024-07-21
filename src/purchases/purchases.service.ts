import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from './purchase.entity';
import { User } from '../users/user.entity';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchase)
    private purchasesRepository: Repository<Purchase>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(page: number, limit: number): Promise<Purchase[]> {
    return this.purchasesRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async create(userId: number, amount: number): Promise<Purchase> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const purchase = new Purchase();
    purchase.user = user;
    purchase.amount = amount;
    await this.purchasesRepository.save(purchase);

    // user.earnings += amount * 0.1;
    await this.usersRepository.save(user);

    if (user.referredBy) {
      const referrerLv1 = await this.usersRepository.findOne({ where: { referralCode: user.referredBy } });
      if (referrerLv1) {
        if (referrerLv1.referredBy != "") {
          // Because User Entity only referredBy we have to static the value benefit
          const referrerLv2 = await this.usersRepository.findOne({ where: { referralCode: referrerLv1.referredBy } });
          referrerLv2.earnings += amount * 0.05;
          await this.usersRepository.save(referrerLv2);
          
          referrerLv1.earnings += amount * 0.1;
          await this.usersRepository.save(referrerLv1);
        } else {
          // Assuming if there's only 1 level referral 15% given to level 1
          referrerLv1.earnings += amount * 0.15;
          await this.usersRepository.save(referrerLv1);
        }
        
        
      }
    }

    return purchase;
  }

  async deletePurchase(purchaseId: number): Promise<void> {
    const purchase = await this.purchasesRepository.findOne({ where: { id: purchaseId }, relations: ['user'] });
    if (!purchase) {
      throw new NotFoundException('Purchase not found');
    }

    const user = purchase.user;
    // user.earnings -= purchase.amount * 0.1;
    // await this.usersRepository.save(user);

    if (user.referredBy) {
      const referrerLv1 = await this.usersRepository.findOne({ where: { referralCode: user.referredBy } });
      if (referrerLv1) {
        if (referrerLv1.referredBy != "") {
          // Because User Entity only referredBy we have to static the value benefit
          const referrerLv2 = await this.usersRepository.findOne({ where: { referralCode: referrerLv1.referredBy } });
          referrerLv2.earnings -= purchase.amount * 0.05;
          await this.usersRepository.save(referrerLv2);
        }
        referrerLv1.earnings -= purchase.amount * 0.1;
        await this.usersRepository.save(referrerLv1);
      } else {
        // Assuming if there's only 1 level referral 15% given to level 1
        referrerLv1.earnings += purchase.amount * 0.15;
        await this.usersRepository.save(referrerLv1);
      }
    }

    await this.purchasesRepository.remove(purchase);
  }
}