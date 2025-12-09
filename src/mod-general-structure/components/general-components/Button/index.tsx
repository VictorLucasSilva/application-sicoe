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
  iconLeft?: ReactNode;      
  iconRight?: ReactNode;     
  onClick?: () => void;      
};

export const Button = ({
  className,
  text1,
  iconLeft,
  onClick,
}: ButtonProps): JSX.Element => {
  const classNameString =
    typeof className === "string" ? className : "";

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
