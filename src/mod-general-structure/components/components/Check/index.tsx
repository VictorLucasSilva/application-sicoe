import { type JSX } from "react";
import image from "./image.svg";
import classes from "./style.module.css";
export const Check = (): JSX.Element => {
  return (
    <div className={classes.container}>
      <img className={classes.image} alt="Vector" src={image} />
    </div>
  );
};
