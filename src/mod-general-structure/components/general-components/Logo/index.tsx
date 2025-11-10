import { type JSX } from "react";
import classes from "./styles.module.css";
import vector from "../../../../../public/images/Logotipo.svg"

type LogotipoProps = {
    application?: string;
    color?: string;
    className?: object;
    orientation?: string;
    size?:string;
    vector?:string;
};

export const Logo = ({ className }: LogotipoProps): JSX.Element => {
  return (
    <div className={`${classes.container} ${className ?? ""}`}>
      <img className={classes.image} alt="Vector" src={vector} />
    </div>
  );
};
