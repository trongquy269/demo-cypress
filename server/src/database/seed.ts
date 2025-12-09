import { DatabaseType } from './type';
import { randomUUID } from 'crypto';
import { createHashPassword } from '../utils/helpers/createHash';

/**
 * Seed data for users with different roles
 * Password for all users: "Password123!"
 */
export class Database {
  Users: DatabaseType[] = [
    // Admin users
    {
      id: randomUUID(),
      email: 'admin@example.com',
      password: createHashPassword('Password123!'),
      name: 'Admin User',
      createAt: new Date('2024-01-01T00:00:00Z'),
      updateAt: new Date('2024-01-01T00:00:00Z'),
      deletedAt: null,
      isDeleted: false,
      role: 'Admin',
      avatar: 'https://avatar.iran.liara.run/public/1',
    },
    {
      id: randomUUID(),
      email: 'john.admin@example.com',
      password: createHashPassword('Password123!'),
      name: 'John Administrator',
      createAt: new Date('2024-01-02T00:00:00Z'),
      updateAt: new Date('2024-01-02T00:00:00Z'),
      deletedAt: null,
      isDeleted: false,
      role: 'Admin',
      avatar: 'https://avatar.iran.liara.run/public/2',
    },

    // CS (Customer Service) users
    {
      id: randomUUID(),
      email: 'cs@example.com',
      password: createHashPassword('Password123!'),
      name: 'Customer Service',
      createAt: new Date('2024-01-03T00:00:00Z'),
      updateAt: new Date('2024-01-03T00:00:00Z'),
      deletedAt: null,
      isDeleted: false,
      role: 'CS',
      avatar: 'https://avatar.iran.liara.run/public/3',
    },
    {
      id: randomUUID(),
      email: 'sarah.support@example.com',
      password: createHashPassword('Password123!'),
      name: 'Sarah Support',
      createAt: new Date('2024-01-04T00:00:00Z'),
      updateAt: new Date('2024-01-04T00:00:00Z'),
      deletedAt: null,
      isDeleted: false,
      role: 'CS',
      avatar: 'https://avatar.iran.liara.run/public/4',
    },
    {
      id: randomUUID(),
      email: 'mike.customer.service@example.com',
      password: createHashPassword('Password123!'),
      name: 'Mike Customer Service',
      createAt: new Date('2024-01-05T00:00:00Z'),
      updateAt: new Date('2024-01-05T00:00:00Z'),
      deletedAt: null,
      isDeleted: false,
      role: 'CS',
      avatar: 'https://avatar.iran.liara.run/public/5',
    },

    // Regular users
    {
      id: randomUUID(),
      email: 'user@example.com',
      password: createHashPassword('Password123!'),
      name: 'Regular User',
      createAt: new Date('2024-01-06T00:00:00Z'),
      updateAt: new Date('2024-01-06T00:00:00Z'),
      deletedAt: null,
      isDeleted: false,
      role: 'User',
      avatar: 'https://avatar.iran.liara.run/public/6',
    },
    {
      id: randomUUID(),
      email: 'alice@example.com',
      password: createHashPassword('Password123!'),
      name: 'Alice Johnson',
      createAt: new Date('2024-01-07T00:00:00Z'),
      updateAt: new Date('2024-01-07T00:00:00Z'),
      deletedAt: null,
      isDeleted: false,
      role: 'User',
      avatar: 'https://avatar.iran.liara.run/public/7',
    },
    {
      id: randomUUID(),
      email: 'bob@example.com',
      password: createHashPassword('Password123!'),
      name: 'Bob Smith',
      createAt: new Date('2024-01-08T00:00:00Z'),
      updateAt: new Date('2024-01-08T00:00:00Z'),
      deletedAt: null,
      isDeleted: false,
      role: 'User',
      avatar: 'https://avatar.iran.liara.run/public/8',
    },
    {
      id: randomUUID(),
      email: 'charlie@example.com',
      password: createHashPassword('Password123!'),
      name: 'Charlie Brown',
      createAt: new Date('2024-01-09T00:00:00Z'),
      updateAt: new Date('2024-01-09T00:00:00Z'),
      deletedAt: null,
      isDeleted: false,
      role: 'User',
    },
    {
      id: randomUUID(),
      email: 'diana@example.com',
      password: createHashPassword('Password123!'),
      name: 'Diana Prince',
      createAt: new Date('2024-01-10T00:00:00Z'),
      updateAt: new Date('2024-01-10T00:00:00Z'),
      deletedAt: null,
      isDeleted: false,
      role: 'User',
      avatar: 'https://avatar.iran.liara.run/public/9',
    },

    // Example of a soft-deleted user
    {
      id: randomUUID(),
      email: 'deleted.user@example.com',
      password: createHashPassword('Password123!'),
      name: 'Deleted User',
      createAt: new Date('2024-01-11T00:00:00Z'),
      updateAt: new Date('2024-01-15T00:00:00Z'),
      deletedAt: new Date('2024-01-15T00:00:00Z'),
      isDeleted: true,
      role: 'User',
    },
  ];
}
