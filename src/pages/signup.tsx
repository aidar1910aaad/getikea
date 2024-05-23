import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import styles from '../styles/Auth.module.css';

const SignupPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Логика для обработки регистрации
    router.push('/login');
  };

  return (
    <div className={styles.container}>
      <TopBar />
      <div className={styles.authForm}>
        <h1>Регистрация</h1>
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
          <input 
            type="password" 
            placeholder="Подтвердите пароль" 
            id="confirmPassword" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            className={styles.authInput} 
            required 
          />
          <div className={styles.formFooter}>
            <div className={styles.loginLink}>
              <span>Уже есть учетная запись?</span>
              <Link href="/login" passHref>
                <a>Войти</a>
              </Link>
            </div>
            <button type="submit" className={styles.signupButton}>Зарегистрироваться</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default SignupPage;



