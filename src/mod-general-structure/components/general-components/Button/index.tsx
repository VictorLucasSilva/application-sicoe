// src/mod-general-structure/components/general-components/Button/index.tsx
import { type JSX, type ReactNode, type CSSProperties } from "react";
import classes from "./styles.module.css";

type ButtonClassName = string | CSSProperties;

type ButtonProps = {
  className?: ButtonClassName;
  hierarchy?: string;
  icon?: string;
  status?: string;
  size?: string;
  text?: string;
  text1?: string;
  theme?: string;
  iconLeft?: ReactNode;      // ícone opcional à esquerda do texto
  iconRight?: ReactNode;     // se você quiser usar depois
  onClick?: () => void;      // 👈 importante
};

export const Button = ({
  className,
  text1,
  iconLeft,
  onClick,
}: ButtonProps): JSX.Element => {
  // se className for string, uso como classe
  const classNameString =
    typeof className === "string" ? className : "";

  // se className for objeto, uso como style inline
  const style: CSSProperties | undefined =
    className && typeof className === "object"
      ? className
      : undefined;

  return (
    <button
      type="button"
      className={`${classes.button} ${classNameString}`}
      style={style}
      onClick={onClick}
    >
      {iconLeft && <span className={classes.iconLeft}>{iconLeft}</span>}
      <span className={classes.label}>{text1 ?? "ENTRAR"}</span>
    </button>
  );
};
