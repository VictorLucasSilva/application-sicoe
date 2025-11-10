import { type JSX } from "react";
import classes from "./styles.module.css";
interface Props {
  className?: object;
}
export const EspaAdor = ({ className }: Props): JSX.Element => {
  return <div className={`${classes.espaAdor} ${className || ""}`} />;
};
