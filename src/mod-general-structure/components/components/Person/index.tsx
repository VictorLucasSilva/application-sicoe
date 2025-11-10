import { type JSX } from "react";
import classes from "./styles.module.css";
import person from "../../../assets/images/Person.svg";

type PersonProps = {
  className?: string;
  opacity?: string;
};

export const Person = ({ className }: PersonProps): JSX.Element => {
  return (
    <div className={`${classes.container} ${className ?? ""}`}>
      <img className={classes.vectorImage} alt="Vector" src={person} />
    </div>
  );
};
