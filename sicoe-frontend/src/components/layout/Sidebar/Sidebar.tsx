import { type ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';

export interface SidebarItem {
  id: string;
  icon: ReactNode;
  label: string;
  path: string;
  disabled?: boolean;
  inactive?: boolean;
}

export interface SidebarProps {
  items: SidebarItem[];
  activePath?: string;
}

export function Sidebar({ items, activePath }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = activePath || location.pathname;

  const handleItemClick = (path: string, disabled?: boolean, inactive?: boolean) => {
    if (!disabled && !inactive && path !== '#') {
      navigate(path);
    }
  };

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {items.map((item) => {
          const isActive = currentPath === item.path && !item.inactive;

          return (
            <button
              key={item.id}
              className={`${styles.item} ${isActive ? styles.active : ''} ${item.disabled ? styles.disabled : ''} ${item.inactive ? styles.inactive : ''}`}
              onClick={() => handleItemClick(item.path, item.disabled, item.inactive)}
              title={item.label}
            >
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.label}>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
