import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare, genSalt, hash } from 'bcryptjs';
import { Model } from 'mongoose';

import { CreateUserDto } from './dtos/create-user.dto';
import { ValidUserDto } from './dtos/valid-user.dto';
import { User, UserSchema } from './models/user.model';
import {
  USER_ALREADY_EXISTS,
  USER_NOT_EXISTS,
  WRONG_PASSWORD,
} from './users.constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create({ email, password }: CreateUserDto) {
    const oldUser = await this.findByEmail(email);
    if (oldUser) {
      throw new BadRequestException(USER_ALREADY_EXISTS);
    }

    const salt = await genSalt(10);
    const passwordHash = await hash(password, salt);

    const newUser = new this.userModel({
      email,
      passwordHash,
    });

    await newUser.save();

    return UserSchema.methods.withoutPassword(newUser);
  }

  async validate(email: string, password: string): Promise<ValidUserDto> {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException(USER_NOT_EXISTS);
    }

    const isValidPassword = await compare(password, user.passwordHash);
    if (!isValidPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD);
    }

    return { email: user.email, id: user._id.toString() };
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string) {
    return this.userModel.findById(id);
  }

  async delete(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
