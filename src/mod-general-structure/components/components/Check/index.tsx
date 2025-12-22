import { type JSX } from "react";
import check from "../../../assets/icons/icon-contract/contract-home-check.svg";
import classes from "./style.module.css";

type CheckProps = {
  className?: object;
  color?: string;
  opacity?: string;
  number?: string;
};

export const Check = ({ className }: CheckProps): JSX.Element => {
  return (
    <div className={`${classes.container} ${className}`}>
      <img className={classes.image} alt="Vector" src={check} />
    </div>
  );
};

export const CheckNumber = ({ className, number }: CheckProps): JSX.Element => {
  return (
    <div className={`${classes.containerNum} ${className}`}>
      <div className={classes.text}>{number}</div>
    </div>
  );
};
