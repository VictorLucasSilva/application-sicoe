import { type JSX } from "react";
import image from "../../../../../../public/images/Down.svg"
import classes from "./style.module.css";

type IconCheckProps = {
    className ?: Object;
    color?: String;
}

export const IconCheck = ({ className }: IconCheckProps): JSX.Element => {
  return (
    <div className={`${classes.container} ${className ?? ""}`}>
      <img className={classes.image} alt="Vector" src={image} />
    </div>
  );
};
