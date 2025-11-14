import { type JSX} from "react";
import classes from "./style.module.css";
import down from "./down.svg";
import up from "./up.svg";
export const IconTableHeader = (): JSX.Element => {
  return (
    <div className={classes.container}>
      {" "}
      <img className={classes.icon} alt="Up" src={up} />{" "}
      <img className={classes.icon} alt="Down" src={down} />{" "}
    </div>
  );
};
