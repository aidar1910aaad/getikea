import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { UserContext } from '../components/UserContext';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import styles from '../styles/Auth.module.css';

const LoginPage: React.FC = () => {
  const userContext = useContext(UserContext);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  if (!userContext) {
    return null;
  }

  const { setUser } = userContext;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({ name: 'User', email });
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <TopBar />
      <div className={styles.authForm}>
        <h1>Вход</h1>
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
              <a className={styles.forgotPassword}>Восстановление пароля</a>
            </Link>
          </div>
          <div className={styles.formFooter}>
            <div className={styles.registerLink}>
              <span>Нет учетной записи?</span>
              <Link href="/signup" passHref>
                <a>Зарегистрироваться</a>
              </Link>
            </div>
            <button type="submit" className={styles.loginButton}>Войти</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;



