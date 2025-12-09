import { type JSX } from "react";
import classes from "./style.module.css";
import vector from "../../../../../../public/icons/filter.svg";

type IconSearchProps = {
    className ?: Object;
    opacity ?: String;
}
export const IconSearch = ({ className }: IconSearchProps): JSX.Element => {
  return (
    <div className={`${classes.box} ${className}`}>
      <img className={classes.image} alt="Vector" src={vector} />
    </div>
  );
};
