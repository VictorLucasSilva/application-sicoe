import { type JSX } from "react";
import classes from "./style.module.css";
import vector from "../../../../../../public/icons/filter.svg";

type IconHomeContractProps = {
  className: object;
  color: string;
}

export const IconHomeContract = ({ className }:IconHomeContractProps): JSX.Element => {
  return (
    <div className={`${classes.container} ${className}`}>
      <img className={classes.image} alt="Vector" src={vector} />
    </div>
  );
};
