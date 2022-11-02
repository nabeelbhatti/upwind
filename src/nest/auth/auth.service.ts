import { Users } from 'src/entities/auth.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

Injectable;
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: MongoRepository<Users>,
    private jwtService: JwtService,
  ) {}

  async create(input: Users): Promise<Users> {
    const hashedPassword = await bcrypt.hash(input.password, 12);
    const user = new Users();
    user.name = input.name;
    user.email = input.email;
    user.password = hashedPassword;
    return this.userRepository.save(user);
  }

  async getByEmail(email): Promise<Users> {
    return await this.userRepository.findOneBy({ email });
  }

  async validateUser(email: string, password: string): Promise<Users> {
    // return await this.userRepository.findOneBy({ email });
    const user = await this.userRepository.findOneBy({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
    };
    return await this.jwtService.sign(payload);
  }
  async verifyPayload(payload): Promise<Users> {
    let user: Users;
    try {
      user = await this.userRepository.findOne({
        where: { email: payload.email },
      });
    } catch (error) {
      throw new UnauthorizedException(
        `There isn't any user with email: ${payload.email}`,
      );
    }
    delete user.password;
    return user;
  }
}

// signToken(user: Users): string {

//   const payload = {
//     sub: user.email,
//   };

//   return this.jwtService.sign(payload);
// }
