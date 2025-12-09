import { Inject, Injectable } from '@nestjs/common';
import type { IUsersRepository } from '../interfaces/users.repository';
import { LoginRequestDto } from '../dtos/request/login.request.dto';
import { LoginResponseDto } from '../dtos/response/login.response.dto';
import { UserProfileDto } from '../dtos/response/user-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('IUsersRepository')
    private readonly users: IUsersRepository,
  ) {}

  async login(dto: LoginRequestDto): Promise<LoginResponseDto> {
    return await this.users.login(dto);
  }

  async getProfile(userId: string): Promise<UserProfileDto | null> {
    return await this.users.findById(userId);
  }
}
