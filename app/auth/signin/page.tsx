import { LoginForm } from './_components/login-form';

export const metadata = {
  title: 'Signin',
  description: 'Signin',
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

export default function Signin() {
  return <LoginForm />;
}
