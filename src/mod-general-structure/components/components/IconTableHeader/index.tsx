// src/mod-general-structure/components/components/IconTableHeader/index.tsx
import { type JSX } from "react";
import classes from "./style.module.css";
import Down from "../../../../../public/images/Down.svg";
import Up from "../../../../../public/images/Up.svg";

type Props = {
  className?: string; // permite passar classes extras
};

export const IconTableHeader = ({ className }: Props): JSX.Element => {
  return (
    <div className={`${classes.container} ${className ?? ""}`}>
      <img className={classes.icon} alt="Up" src={Up} />
      <img className={classes.icon} alt="Down" src={Down} />
    </div>
  );
};
