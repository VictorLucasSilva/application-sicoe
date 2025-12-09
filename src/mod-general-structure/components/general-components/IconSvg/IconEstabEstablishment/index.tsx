import { type JSX } from "react";
import classes from "./style.module.css";
import vector from "../../../../../../public/icons/filter.svg";

type IconEstabEstablishmentProps = {
  className?: object;
  color?: string;
  opacity?: string;
}

export const IconEstabEstablishment = ({ className } : IconEstabEstablishmentProps): JSX.Element => {
  return (
    <div className={`${classes.container} ${className}`}>
      <img className={classes.image} alt="Vector" src={vector} />
    </div>
  );
};
