import { type JSX} from "react";
import classes from "./style.module.css";
import Down from "../../../../../public/images/Down.svg"
import Up from "../../../../../public/images/Up.svg"
export const IconTableHeader = (): JSX.Element => {
  return (
    <div className={classes.container}>
      {" "}
      <img className={classes.icon} alt="Up" src={Up} />{" "}
      <img className={classes.icon} alt="Down" src={Down} />{" "}
    </div>
  );
};
