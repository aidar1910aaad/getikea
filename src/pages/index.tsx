import { GetServerSideProps } from 'next';

const HomePage = () => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  };
};

export default HomePage;
