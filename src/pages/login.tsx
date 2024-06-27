import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useUser } from '../components/UserContext';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import { login } from '../services/api';
import styles from '../styles/Auth.module.css';

const LoginPage: React.FC = () => {
  const { setUser } = useUser();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await login(email, password);
      const { user, token } = response;
      if (token && user) {
        const tokenExpiry = Date.now() + 60 * 60 * 1000; // Устанавливаем срок действия токена на 1 час
        localStorage.setItem('token', token);
        localStorage.setItem('tokenExpiry', tokenExpiry.toString());
        setUser({ name: user.fullName || 'No Name', email: user.email, role: user.role }, token, tokenExpiry);

        if (user.role === 'admin') {
          router.push('/admin/admin');
        } else {
          router.push('/parcels');
        }
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      console.error('Failed to login:', err);
      setError('Failed to login. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <TopBar />
      <main className={styles.main}>
        <div className={styles.authForm}>
          <h1>Вход</h1>
          {error && <p className={styles.error}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.authInput}
              required
            />
            <input
              type="password"
              placeholder="Пароль"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.authInput}
              required
            />
            <div className={styles.options}>
              <label className={styles.rememberMe}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Запомнить меня
              </label>
              <Link href="/forgot-password" passHref>
                <span className={styles.forgotPassword}>Восстановление пароля</span>
              </Link>
            </div>
            <div className={styles.formFooter}>
              <div className={styles.registerLink}>
                <span>Нет учетной записи?</span>
                <Link href="/signup" passHref>
                  <span>Зарегистрироваться</span>
                </Link>
              </div>
              <button type="submit" className={styles.loginButton}>Войти</button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
