import styles from './Tag.module.css';

interface TagProps {
  children: React.ReactNode;
  variant?: 'dark' | 'light' | 'primary';
  size?: 'small' | 'medium';
}

export default function Tag({
  children,
  variant = 'dark',
  size = 'medium',
}: TagProps) {
  const classNames = [
    styles.tag,
    styles[variant],
    styles[size],
  ].join(' ');

  return <span className={classNames}>{children}</span>;
}
