import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';
import RightPanel from './RightPanel';
import styles from '../styles/Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className={styles.container}>
    <Navbar />
    <div className={styles.mainContent}>
      <Sidebar />
      <main className={styles.content}>{children}</main>
      <RightPanel />
    </div>
    <Footer />
  </div>
);

export default Layout;



