import dynamic from 'next/dynamic';
import Loading from '@/utils/components/Loading';
import ProtectedRoute from '@/components/ProtectedRoute';

const HomeRender = dynamic(
  () => import('@/modules/home/views').then((mod) => mod.default),
  {
    loading: () => <Loading />,
  },
);

function HomePage() {
  return (
    <ProtectedRoute>
      <HomeRender />
    </ProtectedRoute>
  );
}

export default HomePage;
