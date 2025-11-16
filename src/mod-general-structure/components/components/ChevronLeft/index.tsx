// src/mod-general-structure/components/components/ChevronLeft/index.tsx
import { type CSSProperties, type JSX } from "react";
import classes from "./style.module.css";
import vector from "../../../assets/images/Lock.svg";

type Props = {
  className?: CSSProperties;
};

export const ChevronLeft = ({ className }: Props): JSX.Element => {
  return (
    <div className={classes.container} style={className}>
      <img className={classes.vector} alt="Vector" src={vector} />
    </div>
  );
};
