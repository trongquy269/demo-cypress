import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthGuard } from '../guards/auth.guard';
import { UsersService } from '../services/users.service';
import type { LoginRequestDto } from '../dtos/request/login.request.dto';
import type { LoginResponseDto } from '../dtos/response/login.response.dto';
import type { UserProfileDto } from '../dtos/response/user-profile.dto';
import type { HttpResponse } from 'src/utils/types/httpResponse';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async login(
    @Body() dto: LoginRequestDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<HttpResponse<LoginResponseDto>> {
    const user = await this.usersService.login(dto);
    console.log(user);

    const isProduction = process.env.NODE_ENV === 'production';

    // Set HTTP-only cookies for tokens
    res.cookie('access_token', user.accessToken, {
      httpOnly: true,
      secure: !isProduction, // true in dev for localhost HTTPS or cross-origin
      sameSite: isProduction ? 'lax' : 'none', // 'none' required for cross-origin in dev
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    res.cookie('refresh_token', user.refreshToken, {
      httpOnly: true,
      secure: !isProduction,
      sameSite: isProduction ? 'lax' : 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return {
      status: 200,
      message: 'Login successfully',
      data: user,
    };
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  async getProfile(
    @Request() req: { user: { id: string; email: string; role: string } },
  ): Promise<HttpResponse<UserProfileDto | null>> {
    console.log('=====> Check data: ', req);
    const userId = req.user.id;
    const user = await this.usersService.getProfile(userId);

    return {
      status: 200,
      message: 'Get profile successfully',
      data: user,
    };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response): HttpResponse<null> {
    // Clear authentication cookies
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    return {
      status: 200,
      message: 'Logout successfully',
      data: null,
    };
  }
}
