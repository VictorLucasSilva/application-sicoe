import { type JSX } from "react";
import { Copyright } from "../Copyright";
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