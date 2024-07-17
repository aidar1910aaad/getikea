import React from 'react';
import styles from '../styles/MyAddressesPage.module.css';
import ProtectedRoute from '@/components/ProtectedRoute';

const MyAddressesPage: React.FC = () => (
  <ProtectedRoute requiredRole='user'>
  <div className={styles.container}>
    <div className={styles.content}>
      <h1>Ваш персональный адрес в Америке</h1>
      <p>Это адреса складов в Америке, которые вам нужно указывать при оформлении покупок в американских интернет-магазинах.</p>
      <div className={styles.addressBlock}>
        <div className={styles.addressHeader}>
          <button className={styles.express}>Express (DE) NEW</button>
        </div>
        <div className={styles.addressDetails}>
          <div>
            <label>First name</label>
            <p>fd</p>
          </div>
          <div>
            <label>Last name</label>
            <p>sdf</p>
          </div>
          <div>
            <label>Street address</label>
            <p>601 Cornell Drive, STE G8</p>
          </div>
          <div>
            <label>Address 2 (Apt, Unit, Suite)</label>
            <p>SHI 961852</p>
          </div>
          <div>
            <label>City</label>
            <p>Wilmington</p>
          </div>
          <div>
            <label>State</label>
            <p>Delaware (DE)</p>
          </div>
          <div>
            <label>ZIP</label>
            <p>19801</p>
          </div>
          <div>
            <label>Country</label>
            <p>United States</p>
          </div>
          <div>
            <label>Phone</label>
            <p>(302) 8616062</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  </ProtectedRoute>
);

export default MyAddressesPage;
