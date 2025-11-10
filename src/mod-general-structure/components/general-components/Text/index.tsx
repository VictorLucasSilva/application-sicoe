import { type JSX } from "react";
import classes from "./styles.module.css";

type TextProps = {
  className?: object;
  color?: string;
  opacity?: string;
  size?: string;
  text?: string;
  type?: string;
  weight?: string;
  textClassName?: object;
};

export const Text = ({ className }: TextProps): JSX.Element => {
  return (
    <div className={`${classes.container} ${className ?? ""}`}>
      <div className={classes.text}>SICOE</div>
    </div>
  );
};