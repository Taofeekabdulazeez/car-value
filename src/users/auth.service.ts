import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    //1. see if email is in use
    const users = await this.usersService.find(email);
    if (users.length) throw new BadRequestException('Email already in use');

    // 2. hash the user password

    // 2.1 generate asalt
    // const salt = randomBytes(8).toString('hex');
    // 2.2 hash the salt and the password together
    // const hash = (await scrypt(password, salt, 32)) as Buffer;
    // 2.3 join the hashed result and the salt together
    // const hashedPassword = salt + '.' + hash;

    // 3. create a new user and save it
    // const user = this.usersService.create(email, hashedPassword);
    const user = this.usersService.create(email, password);

    // 4. return the user
    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) throw new NotFoundException('User not found');
    // const [salt, storedHash] = user.password.split('.');
    // const hash = (await scrypt(password, salt, 32)) as Buffer;

    // if (storedHash !== hash.toString('hex'))
    if (password !== user.password)
      throw new BadRequestException('Bad Request');

    return user;
  }
}
