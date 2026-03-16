'use client';

import { FormEvent, useEffect, useState } from 'react';
import { getAuthMode, getMe, localLogin, logout } from './auth.api';
import { clearStoredAccessToken, getStoredAccessToken, setStoredAccessToken } from './auth.storage';
import { AuthModeResponse, User } from './auth.types';

export function AuthPanel() {
  const [authMode, setAuthMode] = useState<AuthModeResponse['auth_mode'] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [emailInput, setEmailInput] = useState('demo@example.com');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function bootstrap() {
      try {
        const mode = await getAuthMode();
        if (!mounted) return;
        setAuthMode(mode.auth_mode);

        const storedToken = getStoredAccessToken();
        if (!storedToken) {
          setIsLoading(false);
          return;
        }

        try {
          const me = await getMe(storedToken);
          if (!mounted) return;
          setUser(me);
        } catch {
          clearStoredAccessToken();
          if (!mounted) return;
          setUser(null);
        }
      } catch (e) {
        if (!mounted) return;
        setError(e instanceof Error ? e.message : 'Failed to load auth state.');
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    void bootstrap();

    return () => {
      mounted = false;
    };
  }, []);

  async function handleLocalLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const login = await localLogin(emailInput.trim() || undefined);
      setStoredAccessToken(login.accessToken);
      setUser(login.user);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Login failed.');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleLogout() {
    setIsSubmitting(true);
    setError(null);
    const token = getStoredAccessToken();
    try {
      if (token) {
        await logout(token);
      }
    } catch {
      // Ignore logout transport failures for local mode UX.
    } finally {
      clearStoredAccessToken();
      setUser(null);
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return <p>Loading auth state...</p>;
  }

  return (
    <section>
      <h2>Authentication</h2>
      <p>
        Active mode: <code>{authMode ?? 'unknown'}</code>
      </p>

      {error ? <p style={{ color: '#b42318' }}>{error}</p> : null}

      {user ? (
        <div>
          <p>
            Signed in as <strong>{user.full_name}</strong> ({user.email})
          </p>
          <button type="button" onClick={handleLogout} disabled={isSubmitting}>
            {isSubmitting ? 'Signing out...' : 'Sign out'}
          </button>
        </div>
      ) : (
        <form onSubmit={handleLocalLogin}>
          <label htmlFor="email">Local login email</label>
          <br />
          <input
            id="email"
            name="email"
            type="email"
            value={emailInput}
            onChange={(event) => setEmailInput(event.target.value)}
            placeholder="demo@example.com"
          />
          <br />
          <button type="submit" disabled={isSubmitting || authMode !== 'local'}>
            {isSubmitting ? 'Signing in...' : 'Sign in (Local Mode)'}
          </button>
          {authMode === 'google' ? <p>Local login is disabled while AUTH_MODE is google.</p> : null}
        </form>
      )}
    </section>
  );
}

