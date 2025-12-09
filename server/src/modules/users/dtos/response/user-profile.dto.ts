export type UserProfileDto = {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
  createAt: Date;
  updateAt: Date;
};
