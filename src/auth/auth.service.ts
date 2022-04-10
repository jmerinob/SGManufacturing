import { Injectable } from '@nestjs/common';
import { Payload } from 'src/types/payload';
import { sign } from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signPayload(payload: Payload) {
    console.log('auth.servie', payload);
    return sign(payload, 'fgh46jh356j357k467k46k46ki356u24y13t~#€4567', {
      expiresIn: '1d',
    });
  }

  async validateUser(payload: Payload) {
    return await this.userService.findByPayload(payload);
  }
}
