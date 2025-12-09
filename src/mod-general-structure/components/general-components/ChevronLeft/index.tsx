import { type CSSProperties, type JSX } from "react";
import classes from "./style.module.css";
import vector from "../../../../../public/icons/arrow-left.svg";

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
