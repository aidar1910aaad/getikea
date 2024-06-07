import React from 'react';
import styles from '../styles/SettingsPage.module.css';

const SettingsPage: React.FC = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>Настройки аккаунта</h1>
    <div className={styles.formContainer}>
      <form>
        <div className={styles.section}>
          <h2>Личные данные</h2>
          <div className={styles.fieldGroup}>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Имя</label>
              <input className={styles.fieldInput} type="text" value="fd" />
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Фамилия</label>
              <input className={styles.fieldInput} type="text" value="sdf" />
            </div>
          </div>
          <div className={styles.fieldGroup}>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Телефон</label>
              <input className={styles.fieldInput} type="text" value="321321213" />
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>E-mail</label>
              <input className={styles.fieldInput} type="email" value="aidar1910aaad@gmail.com" />
              <small className={styles.fieldSmall}>
                Изменение E-mail доступно через <a className={styles.fieldSmallLink} href="#">службу поддержки</a>.
              </small>
            </div>
          </div>
        </div>
        <div className={styles.section}>
          <h2>Получатель</h2>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>ИИН</label>
            <input className={styles.fieldInput} type="text" value="040dfsdf" />
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>ФИО</label>
            <input className={styles.fieldInput} type="text" value="dsfds" />
          </div>
        </div>
        <div className={styles.section}>
          <h2>Адрес</h2>
          <div className={styles.field}>
            <input className={styles.fieldInput} type="text" value="Ваш адрес в Казахстане" />
          </div>
        </div>
        <div className={styles.section}>
          <h2>Изменить пароль</h2>
          <div className={styles.fieldGroup}>
            <div className={styles.field}>
              <input className={styles.fieldInput} type="password" placeholder="Новый пароль" />
            </div>
            <div className={styles.field}>
              <input className={styles.fieldInput} type="password" placeholder="Повторите новый пароль" />
            </div>
          </div>
        </div>
        <button type="submit" className={styles.saveButton}>Сохранить</button>
      </form>
    </div>
  </div>
);

export default SettingsPage;
