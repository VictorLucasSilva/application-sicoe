import { type JSX } from "react";
import classes from "./style.module.css";
import vector from "./vector.svg";
export const IconB = (): JSX.Element => {
  return (
    <div className={classes.container}>
      {" "}
      <img className={classes.image} alt="Vector" src={vector} />{" "}
    </div>
  );
};
