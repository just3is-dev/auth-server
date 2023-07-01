import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { UsersService } from '../../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private usersService: UsersService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    const user = this.usersService.validate(email, password);
    return user;
  }
}
