import { type JSX } from "react";
import iconClear from "../../../../../../public/icons/filter.svg";
import classes from "./style.module.css";

type IconClearProps = {
    className ?: Object;
    opacity ?: String;
}

export const IconClear = ({ className }: IconClearProps): JSX.Element => {
  return (
    <div className={`${classes.container} ${className ?? ""}`}>
      <img className={classes.image} alt="Vector" src={iconClear} />
    </div>
  );
};
