import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Database } from 'src/database/seed';
import { LoginRequestDto } from '../dtos/request/login.request.dto';
import { LoginResponseDto } from '../dtos/response/login.response.dto';
import { UserProfileDto } from '../dtos/response/user-profile.dto';
import { IUsersRepository } from '../interfaces/users.repository';
import { JwtTokenService } from '../services/jwt.service';
import { createHashPassword } from 'src/utils/helpers/createHash';

@Injectable()
export class UsersRepository implements IUsersRepository {
  private database: Database;

  constructor(
    database: Database,
    private readonly jwtTokenService: JwtTokenService,
  ) {
    this.database = database;
  }

  async login(dto: LoginRequestDto): Promise<LoginResponseDto> {
    const { email, password, isRemember } = dto;

    // Find user by email
    const user = this.database.Users.find((user) => user.email === email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Check if user is deleted
    if (user.isDeleted) {
      throw new UnauthorizedException('User account has been deleted');
    }

    // Verify password (using crypto hash comparison)
    const hashedPassword = createHashPassword(password);
    if (user.password !== hashedPassword) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Generate JWT tokens
    const tokens = this.jwtTokenService.generateTokenPair(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      isRemember || false,
    );

    // Return login response with tokens and user data
    return await Promise.resolve({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
        createAt: user.createAt,
        updateAt: user.updateAt,
      },
    });
  }

  async findById(id: string): Promise<UserProfileDto | null> {
    const user = this.database.Users.find((user) => user.id === id);
    if (!user || user.isDeleted) {
      return null;
    }

    return await Promise.resolve({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
      createAt: user.createAt,
      updateAt: user.updateAt,
    });
  }
}
