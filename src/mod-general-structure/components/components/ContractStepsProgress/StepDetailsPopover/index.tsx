import { type JSX, useMemo } from "react";
import classes from "./style.module.css";

type Props = {
  title: string;
  startDateISO: string; 
  daysRemaining: number;
  observation?: string;
  onClose: () => void;
};

const formatBR = (iso: string): string => {
  if (!iso) return "-";
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, (m || 1) - 1, d || 1);
  return dt.toLocaleDateString("pt-BR");
};

export const StepDetailsPopover = ({
  title,
  startDateISO,
  daysRemaining,
  observation,
  onClose,
}: Props): JSX.Element => {
  const obsText = useMemo(() => {
    const v = (observation ?? "").trim();
    return v.length ? v : "Sem Observações";
  }, [observation]);

  return (
    <div
      className={classes.popover}
      role="dialog"
      aria-label="Detalhes da etapa"
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className={classes.header}>
        <div className={classes.title} title={title}>
          {title}
        </div>

        <button
          type="button"
          className={classes.close}
          aria-label="Fechar"
          onClick={onClose}
        >
          ×
        </button>
      </div>

      <div className={classes.body}>
        <div className={classes.row}>
          <div className={classes.label}>Início</div>
          <div className={classes.value}>{formatBR(startDateISO)}</div>
        </div>

        <div className={classes.row}>
          <div className={classes.label}>Finaliza em</div>
          <div className={classes.value}>
            {Math.max(0, daysRemaining)} dias
          </div>
        </div>

        <div className={classes.section}>
          <div className={classes.sectionTitle}>Observações</div>
          <div className={classes.obs}>{obsText}</div>
        </div>
      </div>
    </div>
  );
};
