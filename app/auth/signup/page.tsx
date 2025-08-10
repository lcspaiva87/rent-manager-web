import { RegisterForm } from './_components/register-form';

export const metadata = {
  title: 'Signup',
  description: 'Signup',
  icons: {
    icon: '/favicon.ico',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function signinPage() {
  return <RegisterForm />;
}
