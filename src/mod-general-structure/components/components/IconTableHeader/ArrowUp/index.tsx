import { type JSX } from "react";
import classes from "./style.module.css";
import up from "../../../../../../public/images/Up.svg";
export const ArrowUp = (): JSX.Element => {
  return (
    <div className={classes.container}>
      {" "}
      <img className={classes.image} alt="Up" src={up} />{" "}
    </div>
  );
};
