import { Navigation } from '@/components/layout/Navigation';
import { Login } from '../../features/login/components/Login';
import { Toaster } from '../../components/ui/sonner';
import { useAuthStore } from '../../store/auth';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <Login
        onLoginSuccess={() => {
          login();
          navigate('/dashboard');
        }}
        onNavigateToLanding={() => navigate('/')}
      />

      <Toaster position="bottom-right" />
    </div>
  );
}
