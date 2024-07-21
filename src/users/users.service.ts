import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Role } from '../auth/roles.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(page: number, limit: number): Promise<User[]> {
    return this.usersRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  findOneById(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByUsername(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username });
  }

  async create(username: string, password: string, referralCode?: string, roles: Role[] = [Role.User]): Promise<User> {
    const user = new User();
    user.username = username;
    user.password = password;
    user.referralCode = Math.random().toString(36).substring(2, 7);
    user.roles = roles;

    if (referralCode) {
      const referrer = await this.usersRepository.findOne({ where: { referralCode } });
      user.referredBy = referrer ? referrer.referralCode : null;
    }

    return this.usersRepository.save(user);
  }

  async findReferrals(id: number): Promise<User[]> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.usersRepository.find({ where: { referredBy: user.referralCode } });
  }

  async update(id: number, updateUserDto: Partial<User>): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { username, password, referralCode, referredBy, earnings, roles } = updateUserDto;
    
    if (username) user.username = username;
    if (password) user.password = password;
    if (referralCode) user.referralCode = referralCode;
    if (referredBy) user.referredBy = referredBy;
    if (earnings !== undefined) user.earnings = earnings;
    if (roles) user.roles = roles;

    await this.usersRepository.save(user);
    return this.findOneById(id);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
