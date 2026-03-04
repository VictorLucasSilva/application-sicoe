import type { ReactNode } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  centerContent?: boolean;
  userName?: string;
  userRole?: string;
  pageTitle?: string; // Título customizado da página
}

export default function Layout({
  children,
  showHeader = true,
  showFooter = true,
  centerContent = false,
  userName,
  userRole,
  pageTitle,
}: LayoutProps) {
  return (
    <div className={styles.layout}>
      {showHeader && <Header userName={userName} userRole={userRole} pageTitle={pageTitle} />}
      <main className={`${styles.main} ${centerContent ? styles.mainCenter : ''}`}>
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
}
