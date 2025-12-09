import { type JSX } from "react";
import classes from "./style.module.css";
import vector from "../../../../../../public/icons/filter.svg";
export const IconCardContract = (): JSX.Element => {
  return (
    <div className={classes.container}>
      <img className={classes.vector} alt="Vector" src={vector} />
    </div>
  );
};
