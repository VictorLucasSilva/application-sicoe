import { type JSX } from "react";
import { Check } from "../Check";
import classes from "./style.module.css";
export const LineVertical = (): JSX.Element => {
  return (
    <div className={classes.container}>
      <div className={classes.circle}>
        <Check
          className={{
            height: "24px",
            left: "calc(50.00% - 12px)",
            position: "absolute",
            top: "calc(50.00% - 12px)",
            width: "24px",
          }}
          color="white"
          opacity="0.85"
        />
      </div>
      <div className={classes.line} />
    </div>
  );
};
