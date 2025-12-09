'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Button from '@/utils/components/Button';

function HomePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  if (!user) {
    return null;
  }

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='max-w-4xl mx-auto'>
        <div className='bg-white rounded-lg shadow-md p-8'>
          <h1 className='text-3xl font-bold mb-6'>Welcome, {user.name}!</h1>

          <div className='space-y-4 mb-8'>
            <div className='flex items-center gap-4'>
              {user.avatar && (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className='w-20 h-20 rounded-full'
                />
              )}
              <div>
                <p className='text-lg font-semibold'>{user.name}</p>
                <p className='text-gray-600'>{user.email}</p>
                <p className='text-sm text-gray-500'>Role: {user.role}</p>
              </div>
            </div>
          </div>

          <Button
            variant='solid'
            color='red'
            size='md'
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
