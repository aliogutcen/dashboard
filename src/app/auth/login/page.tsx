'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // API çağrısı burada yapılacak
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Giriş yapılıyor:', { email, password, rememberMe });
    } catch (error) {
      console.error('Giriş hatası:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <section className="auth-form-section">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h1 className="form-title">Giriş Yap</h1>
          <p className="form-subtitle">Hesabınıza erişin</p>

          <div className="form-group">
            <label htmlFor="email">E-posta</label>
            <input
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
            <input
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

          <button
            type="submit"
            className="btn-login"
            disabled={isLoading}
          >
            {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
      </section>

      <section className="auth-image-section">
        <div className="image-wrapper">
          <Image
            src="https://unsplash.com/photos/a-computer-mouse-sitting-on-top-of-a-mouse-pad-edTO_gLjGzU?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
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