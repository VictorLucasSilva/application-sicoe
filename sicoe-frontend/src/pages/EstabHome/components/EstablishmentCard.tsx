import styles from './EstablishmentCard.module.css';

interface EstablishmentCardProps {
  image?: string;
  title: string;
  code: string;
  region?: string;
  onClick: () => void;
}

export function EstablishmentCard({
  title,
  code,
  region,
  onClick,
}: EstablishmentCardProps) {
  return (
    <div className={styles.card} onClick={onClick}>
      {/* Sem imagem - apenas fundo branco */}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.info}>
          <span className={styles.code}>{code}</span>
          {region && <span className={styles.region}>{region}</span>}
        </div>
      </div>
    </div>
  );
}
