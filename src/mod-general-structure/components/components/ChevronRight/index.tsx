// src/mod-general-structure/components/components/ChevronRight/index.tsx
import { type CSSProperties, type JSX } from "react";
import classes from "./style.module.css";
import vector from "../../../../../public/images/chevron_right.svg";

type Props = {
  className?: CSSProperties;
};

export const ChevronRight = ({ className }: Props): JSX.Element => {
  return (
    <div className={classes.container} style={className}>
      <img className={classes.vector} alt="Vector" src={vector} />
    </div>
  );
};
