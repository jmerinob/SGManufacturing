import { Injectable } from '@nestjs/common';
import { Payload } from 'src/types/payload';
import { sign } from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signPayload(payload: Payload) {
    console.log('auth.servie', payload);
    return sign(payload, 'asdfasdfadsfasdfadfr42432343423', {
      expiresIn: '7d',
    });
  }

  async validateUser(payload: Payload) {
    return await this.userService.findByPayload(payload);
  }
}
