import { LoginRequestDto } from '../dtos/request/login.request.dto';
import { LoginResponseDto } from '../dtos/response/login.response.dto';
import { UserProfileDto } from '../dtos/response/user-profile.dto';

export interface IUsersRepository {
  login(dto: LoginRequestDto): Promise<LoginResponseDto>;
  findById(id: string): Promise<UserProfileDto | null>;
}
