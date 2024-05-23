import React, { useState } from 'react';
import { useRouter } from 'next/router';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import styles from '../styles/Auth.module.css';

const SignupPage: React.FC = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/login');
  };

  return (
    <div className={styles.container}>
      <TopBar />
      <div className={styles.authForm}>
        <h1>Регистрация</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Имя"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={styles.authInput}
            required
          />
          <input
            type="text"
            placeholder="Фамилия"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={styles.authInput}
            required
          />
          <input
            type="tel"
            placeholder="Телефон"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={styles.authInput}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.authInput}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.authInput}
            required
          />
          <input
            type="password"
            placeholder="Повторите пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.authInput}
            required
          />
          <div className={styles.formFooter}>
            <div className={styles.loginLink}>
              <span>Есть учетная запись?</span>
              <a href="/login">Войти</a>
            </div>
            <button type="submit">Зарегистрироваться</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default SignupPage;



