import { type JSX } from "react";
import classes from "./styles.module.css";

type ButtonProps = {
  className?: object;
  hierarchy?: string;
  icon?: string;
  status?: string;
  size?: string;
  text?: string;
  text1?: string;
  theme?: string;
};

export const Button = ({ className, text1 }: ButtonProps): JSX.Element => {
  return (
    <div className={`${classes.button} ${className ?? ""}`}>
      <div className={classes.label}>{text1 ?? "ENTRAR"}</div>
    </div>
  );
};
