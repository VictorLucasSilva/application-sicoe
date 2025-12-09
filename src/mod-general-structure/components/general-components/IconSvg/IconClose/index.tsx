import { type JSX } from "react";
import iconClose from "../../../../../../public/icons/filter.svg";
import classes from "./style.module.css";

type IconCloseProps = {
    className ?: Object;
    opacity ?: String;
};

export const IconClose = ({ className }: IconCloseProps): JSX.Element => {
  return (
    <div className={`${classes.container} ${className ?? ""}`}>
      <img className={classes.image} alt="Vector" src={iconClose} />
    </div>
  );
};

