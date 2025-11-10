import { type JSX } from "react";
import { Copyright } from "../../general-components/Copyright";
import classes from "./styles.module.css";

export const Footer = (): JSX.Element => {
  return (
    <footer className={classes.footer}>
      <div className={classes.inner}>
        <Copyright />
      </div>
    </footer>
  );
};