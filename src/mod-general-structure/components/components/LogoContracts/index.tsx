import { type JSX } from "react";
import classes from "./styles.module.css";
import union from "../../../assets/images/Lock.svg"

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
