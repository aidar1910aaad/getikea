// pages/auth/signup.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import { register } from '../services/api'; // корректный импорт register
import styles from '../styles/Auth.module.css';

const SignupPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      const response = await register(email, password);
      if (response && response.email) {
        setMessage('Регистрация успешна! Теперь вы можете авторизоваться.');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setError('Регистрация не удалась. Попробуйте снова.');
      }
    } catch (err) {
      console.error('Ошибка при регистрации:', err);
      setError('Регистрация не удалась. Попробуйте снова.');
    }
  };

  return (
    <div className={styles.container}>
      <TopBar />
      <main className={styles.main}>
        <div className={styles.authForm}>
          <h1>Регистрация</h1>
          {message && <p className={styles.success}>{message}</p>}
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
            <div className={styles.passwordContainer}>
              <input 
                type={showPassword ? "text" : "password"}
                placeholder="Пароль" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className={styles.authInput} 
                required 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className={styles.showPasswordButton}
              >
                {showPassword ? "Скрыть" : "Показать"}
              </button>
            </div>
            <div className={styles.passwordContainer}>
              <input 
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Подтвердите пароль" 
                id="confirmPassword" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                className={styles.authInput} 
                required 
              />
              <button 
                type="button" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                className={styles.showPasswordButton}
              >
                {showConfirmPassword ? "Скрыть" : "Показать"}
              </button>
            </div>
            <div className={styles.formFooter}>
              <div className={styles.registerLink}>
                <span>Есть учетная запись?</span>
                <Link className={styles.nolink} href="/login" passHref>
                  <span>Войти</span>
                </Link>
              </div>
              <button type="submit" className={styles.loginButton}>Зарегистрироваться</button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignupPage;

