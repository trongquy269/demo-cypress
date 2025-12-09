export type DatabaseType = {
  id: string;
  email: string;
  password: string;
  name: string;
  createAt: Date;
  updateAt: Date;
  deletedAt: Date | null;
  isDeleted: boolean;
  role: 'Admin' | 'CS' | 'User';
  avatar?: string;
};
