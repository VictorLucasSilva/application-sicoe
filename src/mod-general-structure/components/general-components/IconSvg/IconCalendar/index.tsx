import { type JSX } from "react";
import iconCalendar from "../../../../../../public/images/Filter.svg";
import classes from "./style.module.css";

type IconCalendarProps = {
    className ?: Object;
    opacity ?: String;
}

export const IconCalendar = ({ className }: IconCalendarProps): JSX.Element => {
  return (
    <div className={`${classes.container} ${className ?? ""}`}>
      <img className={classes.image} alt="Vector" src={iconCalendar} />
    </div>
  );
};
