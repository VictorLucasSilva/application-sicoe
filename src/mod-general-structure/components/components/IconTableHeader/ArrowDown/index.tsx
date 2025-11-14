import { type JSX } from "react";
import classes from "./style.module.css";
import Down from "../../../../assets/images/Lock.svg"
export const ArrowDown = (): JSX.Element => {
  return (
    <div className={classes.container}>
      {" "}
      <img className={classes.image} alt="Down" src={Down} />{" "}
    </div>
  );
};
