import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getEnv } from 'src/env';

export interface TokenPayload {
  id: string;
  email: string;
  role: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class JwtTokenService {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * Generate both access and refresh tokens for a user
   * @param payload - User information to encode in the token
   * @param rememberMe - If true, extends token expiration time
   * @returns Object containing both accessToken and refreshToken
   */
  generateTokenPair(payload: TokenPayload, rememberMe = false): TokenPair {
    const accessToken = this.generateAccessToken(payload, rememberMe);
    const refreshToken = this.generateRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * Generate access token
   * @param payload - User information to encode
   * @param rememberMe - If true, uses extended expiration (7 days), otherwise uses default (1 hour)
   */
  private generateAccessToken(
    payload: TokenPayload,
    rememberMe: boolean,
  ): string {
    const expiresIn = rememberMe
      ? 7 * 24 * 60 * 60 // 7 days in seconds
      : Number(getEnv('JWT_EXPIRATION_TIME', '3600')); // Use env value in seconds

    return this.jwtService.sign(payload, {
      secret: getEnv('JWT_SECRET'),
      expiresIn,
    });
  }

  /**
   * Generate refresh token (always long-lived)
   * @param payload - User information to encode
   */
  private generateRefreshToken(payload: TokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: getEnv('JWT_REFRESH_SECRET'),
      expiresIn: Number(getEnv('JWT_REFRESH_EXPIRATION_TIME', '604800')),
    });
  }

  /**
   * Verify and decode an access token
   * @param token - The JWT token to verify
   * @returns Decoded token payload
   */
  verifyAccessToken(token: string): TokenPayload {
    return this.jwtService.verify(token, {
      secret: getEnv('JWT_SECRET'),
    });
  }

  /**
   * Verify and decode a refresh token
   * @param token - The JWT token to verify
   * @returns Decoded token payload
   */
  verifyRefreshToken(token: string): TokenPayload {
    return this.jwtService.verify(token, {
      secret: getEnv('JWT_REFRESH_SECRET'),
    });
  }
}
