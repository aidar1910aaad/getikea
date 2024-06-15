import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../services/api';
import styles from '../styles/SettingsPage.module.css';

type ProfileType = {
  email: string | null;
  fullName: string | null;
  address: string | null;
  IDCardNumber: string | null;
  phoneNumber: string | null;
  iin: string | null;
  recipient: string | null;
  password: string | null;
};

const SettingsPage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileType>({
    email: '',
    fullName: '',
    address: '',
    IDCardNumber: '',
    phoneNumber: '',
    iin: '',
    recipient: '',
    password: '',
  });

  const [initialProfile, setInitialProfile] = useState<ProfileType>({
    email: '',
    fullName: '',
    address: '',
    IDCardNumber: '',
    phoneNumber: '',
    iin: '',
    recipient: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
        return;
      }

      try {
        const profileData = await getProfile(token);
        const profileToSet = {
          email: profileData.email || '',
          fullName: profileData.fullName || '',
          address: profileData.address || '',
          IDCardNumber: profileData.IDCardNumber || '',
          phoneNumber: profileData.phoneNumber || '',
          iin: profileData.iin || '',
          recipient: profileData.recipient || '',
          password: profileData.password || '',
        };
        setProfile(profileToSet);
        setInitialProfile(profileToSet);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found');
      return;
    }

    try {
      // Создаем объект для отправки данных, включая только измененные поля
      const updatedProfile: { [key: string]: any } = {};
      Object.keys(profile).forEach(key => {
        if (profile[key as keyof ProfileType] !== initialProfile[key as keyof ProfileType]) {
          updatedProfile[key] = profile[key as keyof ProfileType] || null;
        }
      });

      // Если новый пароль пустой, удалим его из обновляемого профиля
      if (!updatedProfile.newPassword) delete updatedProfile.newPassword;

      console.log('Отправляемый payload:', updatedProfile);

      await updateProfile(token, updatedProfile);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000); // Hide the success message after 3 seconds
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Настройки аккаунта</h1>
      {success && <div className={styles.successMessage}>Данные успешно сохранены!</div>}
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.section}>
            <h2>Личные данные</h2>
            <div className={styles.fieldGroup}>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Имя</label>
                <input
                  className={styles.fieldInput}
                  type="text"
                  name="fullName"
                  value={profile.fullName || ''}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Телефон</label>
                <input
                  className={styles.fieldInput}
                  type="text"
                  name="phoneNumber"
                  value={profile.phoneNumber || ''}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>E-mail</label>
                <input
                  className={styles.fieldInput}
                  type="email"
                  name="email"
                  value={profile.email || ''}
                  onChange={handleChange}
                  disabled
                />
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
              <input
                className={styles.fieldInput}
                type="text"
                name="iin"
                value={profile.iin || ''}
                onChange={handleChange}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>ФИО</label>
              <input
                className={styles.fieldInput}
                type="text"
                name="recipient"
                value={profile.recipient || ''}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.section}>
            <h2>Адрес</h2>
            <div className={styles.field}>
              <input
                className={styles.fieldInput}
                type="text"
                name="address"
                value={profile.address || ''}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.section}>
            <h2>Изменить пароль</h2>
            <div className={styles.fieldGroup}>
              <div className={styles.field}>
                <input
                  className={styles.fieldInput}
                  type="password"
                  name="password"
                  placeholder="Новый пароль"
                  value={profile.password || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <button type="submit" className={styles.saveButton}>Сохранить</button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;

