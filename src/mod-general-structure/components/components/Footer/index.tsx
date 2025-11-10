import { type JSX } from "react";
import { Copyright } from  "../../general-components/Copyright";
import { Divider } from  "../../general-components/Divider";
import { EspaAdor } from  "../../general-components/EspaAdor";
import classes from "./styles.module.css";
export const Footer = (): JSX.Element => {
  return (
    <div className={classes.footer}>
      {" "}
      <Divider
        className={{
          alignSelf: "stretch",
          left: "unset",
          top: "unset",
          width: "100%",
        }}
        color="secondary-pure"
        orientation="horizontal"
        size="medium"
        theme="light"
      />{" "}
      <div className={classes.content}>
        {" "}
        <Copyright
          className={{
            bottom: "unset",
            display: "flex",
            flex: "1",
            flexGrow: "1",
            left: "unset",
            position: "relative",
          }}
          color="light"
        />{" "}
        <EspaAdor
          className={{
            backgroundColor: "var(--neutralhighpure)",
            flex: "1",
            flexGrow: "1",
            height: "40px",
            position: "relative",
            width: "unset",
          }}
        />{" "}
      </div>{" "}
    </div>
  );
};
