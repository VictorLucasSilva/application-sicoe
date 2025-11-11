import { type JSX } from "react";
import classes from "./styles.module.css";

type CopyrightProps = {
  className?: object;
  color?: string;
};

export const Copyright = ({ className }: CopyrightProps): JSX.Element => {
  return (
    <div className={`${classes.container} ${className ?? ""}`}>
      <p className={classes.text}>© BB Tecnologia e serviços 2026</p>
    </div>
  );
};
