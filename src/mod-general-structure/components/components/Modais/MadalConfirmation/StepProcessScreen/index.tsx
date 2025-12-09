import { type JSX } from "react";
import { CheckWrapper } from "./CheckWrapper";
import { Text } from "../../../Text";
import { Timeline } from "../../../Timeline";
import classes from "./index.module.css";
export const Contedo = (): JSX.Element => {
  return (
    <div className={classes.container}>
      {" "}
      <div className={classes.content}>
        {" "}
        <Text
          className={{
            alignSelf: "stretch",
            flex: "0 0 auto",
            left: "unset",
            top: "unset",
            width: "100%",
          }}
          color="low-primary"
          size="x-large"
          text="Etapas de Renovação"
          type="subtitle"
          weight="semibold"
        />{" "}
        <Timeline
          className={{
            alignSelf: "stretch",
            display: "flex",
            flex: "0 0 auto",
            left: "unset",
            marginBottom: "-24.00px",
            top: "unset",
            width: "100%",
          }}
          icon="on"
          override={<CheckWrapper />}
          side="right"
          theme="light"
        />{" "}
      </div>{" "}
      <div className={classes.scrollbar}>
        {" "}
        <div className={classes.scrollbarThumb} />{" "}
      </div>{" "}
    </div>
  );
};
