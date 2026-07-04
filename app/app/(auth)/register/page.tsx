import dynamic from 'next/dynamic';

const RegisterPage = dynamic(
  () => import('@/components/pages/auth/RegisterPage'),
  { ssr: false }
);

export default function Register() {
  return <RegisterPage />;
}


