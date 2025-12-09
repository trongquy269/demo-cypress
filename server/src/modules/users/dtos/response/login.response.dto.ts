export type LoginResponseDto = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    avatar?: string;
    createAt: Date;
    updateAt: Date;
  };
};
