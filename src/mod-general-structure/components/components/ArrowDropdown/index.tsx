import { type JSX } from "react";
import image from "../../../assets/images/Lock.svg";
import classes from "./style.module.css";
export const ArrowDropDown = (): JSX.Element => {
  return (
    <div className={classes.container}>
      {" "}
      <img className={classes.image} alt="Vector" src={image} />{" "}
    </div>
  );
};
