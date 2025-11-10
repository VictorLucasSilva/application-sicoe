import { type JSX } from "react";
import image from "../../../assets/images/Lock.svg"
import classes from "./styles.module.css";
import vector from "../../../assets/images/Lock.svg"

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
