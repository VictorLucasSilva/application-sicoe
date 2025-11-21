import  { type JSX } from "react";
import classes from "./style.module.css";
import vector from "../../../../../../public/images/Filter.svg"

type IconLogotipoInternalProps = {
    className?: String;
}

export const IconLogotipoInternal = ({ className }: IconLogotipoInternalProps): JSX.Element => {
  return (
    <div className={`${classes.container} ${className ?? ""}`}>
      <img className={classes.image} alt="Vector" src={vector} />
    </div>
  );
};
