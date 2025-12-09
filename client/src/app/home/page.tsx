import dynamic from 'next/dynamic';
import Loading from '@/utils/components/Loading';

const HomeRender = dynamic(
  () => import('@/modules/home/views').then((mod) => mod.default),
  {
    loading: () => <Loading />,
  },
);

function HomePage() {
  return <HomeRender />;
}

export default HomePage;
