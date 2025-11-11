import { type JSX } from "react";
import classes from "./style.module.css";
import union from "./union.svg";

type LogoContractsProps = {
    className?: object;
    color?: string;
}

export const LogoContracts = ({ className }: LogoContractsProps): JSX.Element => {
  return (
    <div className={`${classes.container} ${className ?? ""}`}>
      {" "}
      <img className={classes.image} alt="Union" src={union} />{" "}
    </div>
  );
};
