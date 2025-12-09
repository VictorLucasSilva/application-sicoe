import { type JSX } from "react";
import image from "../../../assets/icons/icon-no-mod/no-mod-login-eye.svg"
import classes from "./styles.module.css";
import vector from "../../../assets/icons/icon-no-mod/no-mod-login-eye.svg"

type VisibilityProps = {
  className?: string;
  opacity?: string;
};

export const Visibility = ({ className }: VisibilityProps): JSX.Element => {
  return (
    <div className={`${classes.container} ${className ?? ""}`}>
      <img className={classes.vectorImage} alt="Vector" src={vector} />
      <img className={classes.mainImage} alt="Vector" src={image} />
    </div>
  );
};
