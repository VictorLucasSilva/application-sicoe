import { type JSX } from "react";
import classes from "./styles.module.css";
import lock from "../../../assets/images/Lock.svg"

type LockProps = {
  className?: string;
  opacity?: string;
};

export const Lock = ({ className }: LockProps): JSX.Element => {
  return (
    <div className={`${classes.container} ${className ?? ""}`}>
      <img className={classes.image} alt="Vector" src={lock} />
    </div>
  );
};
