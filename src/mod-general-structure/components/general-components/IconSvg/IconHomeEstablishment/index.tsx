import { type JSX } from "react";
import classes from "./style.module.css";
import vector from "../../../../../../public/icons/filter.svg";

type IconHomeEstablishmentProps = {
  className: object;
  color?: string;
  opacity?: String;
}

export const IconHomeEstablishment = ({ className }: IconHomeEstablishmentProps): JSX.Element => {
  return (
    <div className={`${classes.container} ${className}`}>
      <img className={classes.image} alt="Vector" src={vector} />
    </div>
  );
};
