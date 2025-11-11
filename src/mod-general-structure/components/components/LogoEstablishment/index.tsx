import { type JSX } from "react";
import classes from "./style.module.css";
import union from "./union.svg";

type LogoEstablishmentProps = {
    className?: object;
    color?: string;
}

export const LogoEstablishment = ({ className }: LogoEstablishmentProps): JSX.Element => {
  return (
    <div className={`${classes.container} ${className ?? ""}`}>
      {" "}
      <img className={classes.image} alt="Union" src={union} />{" "}
    </div>
  );
};
