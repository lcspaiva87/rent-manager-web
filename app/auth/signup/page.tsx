import { LoginForm } from './_components/login-form';

export default function Signup() {
  const _metadata = {
    title: 'Signup',
    description: 'Signup',
    icons: {
      icon: '/favicon.ico',
    },
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title: 'Signup',
    },
  };

  return <LoginForm />;
}
