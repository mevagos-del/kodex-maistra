import { FormEvent, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { PageBanner } from '@/components/ui/PageBanner';
import { useAuth } from '@/features/auth/useAuth';
import { appRoutes } from '@/routes/appRoutes';

type LocationState = {
  from?: {
    pathname?: string;
  };
};

export function LoginPage() {
  const { user, profile, isConfigured, isLoading, signIn, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const state = location.state as LocationState | null;
  const redirectTo = state?.from?.pathname ?? appRoutes.admin;

  if (!isLoading && user && (profile?.role === 'admin' || profile?.role === 'editor')) {
    return <Navigate to={redirectTo} replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const result = await signIn(email, password);
    setIsSubmitting(false);

    if (result.errorMessage) {
      setErrorMessage(result.errorMessage);
      return;
    }

    navigate(redirectTo, { replace: true });
  }

  return (
    <div className="page-stack">
      <PageBanner
        eyebrow="Авторизація"
        title="Вхід до адмін-панелі"
        description="Увійдіть через email і пароль. Доступ до адмін-панелі мають лише ролі admin та editor."
      />

      <form className="auth-panel" aria-label="Форма входу" onSubmit={handleSubmit}>
        {!isConfigured ? (
          <div className="status-message" role="alert">
            Supabase ще не налаштовано. Заповніть `.env` за прикладом `.env.example`.
          </div>
        ) : null}

        {user && profile?.role === 'user' ? (
          <div className="status-message" role="alert">
            Ви увійшли як звичайний користувач. Для адмін-панелі потрібна роль admin або editor.
          </div>
        ) : null}

        <label>
          Email
          <input
            type="email"
            placeholder="admin@example.com"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={!isConfigured || isSubmitting}
            required
          />
        </label>
        <label>
          Пароль
          <input
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={!isConfigured || isSubmitting}
            required
          />
        </label>

        {errorMessage ? (
          <div className="status-message status-message-error" role="alert">
            {errorMessage}
          </div>
        ) : null}

        <button type="submit" disabled={!isConfigured || isSubmitting}>
          {isSubmitting ? 'Входимо...' : 'Увійти'}
        </button>

        {user ? (
          <button type="button" className="secondary-button" onClick={() => void signOut()}>
            Вийти
          </button>
        ) : null}
      </form>
    </div>
  );
}
