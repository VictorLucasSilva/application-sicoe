import { type JSX} from "react";
import classes from "./style.module.css";
import Lock from "../../../../assets/images/Lock.svg"
import Person from "../../../assets/images/Person.svg"
export const IconTableHeader = (): JSX.Element => {
  return (
    <div className={classes.container}>
      {" "}
      <img className={classes.icon} alt="Lock" src={Lock} />{" "}
      <img className={classes.icon} alt="Person" src={Person} />{" "}
    </div>
  );
};
