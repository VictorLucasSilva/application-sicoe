// src/mod-general-structure/components/general-components/Button/index.tsx
import { type JSX, type ReactNode } from "react";
import classes from "./styles.module.css";

type ButtonProps = {
  className?: any;
  hierarchy?: string;
  icon?: string;
  status?: string;
  size?: string;
  text?: string;
  text1?: string;
  theme?: string;
  iconLeft?: ReactNode; // ícone opcional à esquerda do texto
};

export const Button = ({
  className,
  text1,
  iconLeft,
}: ButtonProps): JSX.Element => {
  return (
    <div className={`${classes.button} ${className ?? ""}`}>
      {iconLeft && <span className={classes.iconLeft}>{iconLeft}</span>}
      <div className={classes.label}>{text1 ?? "ENTRAR"}</div>
    </div>
  );
};
