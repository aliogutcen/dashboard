'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/input/input';
import { Button } from '@/components/ui/button/button';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { login, isLoading, error } = useAuth();


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password, rememberMe });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="auth-container">
      <section className="auth-form-section">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h1 className="form-title">Giriş Yap</h1>
          <p className="form-subtitle">Hesabınıza erişin</p>

          {error && (
            <div className="error-message">
              {error.message}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">E-posta</label>
            <Input
              type="email"
              id="email"
              className="form-control"
              placeholder="mail@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Şifre</label>
            <Input
              type="password"
              id="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-footer">
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember">Beni hatırla</label>
            </div>
            <Link href="/auth/forgot-password" className="forgot-password">
              Şifremi unuttum
            </Link>
          </div>

          <Button
            type="submit"
            className="btn-login"
            disabled={isLoading}
          >
            {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </Button>
        </form>
      </section>

      <section className="auth-image-section">
        <div className="image-wrapper">
          <Image
            src="/images/login-bg.jpg"
            alt="Login"
            fill
            priority
            style={{ 
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
        </div>
      </section>
    </div>
  );
}