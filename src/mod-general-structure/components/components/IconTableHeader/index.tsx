import { type JSX} from "react";
import classes from "./style.module.css";
import Down from "../../../assets/images/Lock.svg"
import Up from "../../../assets/images/Lock.svg"
export const IconTableHeader = (): JSX.Element => {
  return (
    <div className={classes.container}>
      {" "}
      <img className={classes.icon} alt="Up" src={Up} />{" "}
      <img className={classes.icon} alt="Down" src={Down} />{" "}
    </div>
  );
};
