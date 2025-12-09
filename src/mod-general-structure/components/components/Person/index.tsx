import { type JSX } from "react";
import classes from "./styles.module.css";
import person from "../../../assets/icons/icon-no-mod/no-mod-login-person.svg";

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
