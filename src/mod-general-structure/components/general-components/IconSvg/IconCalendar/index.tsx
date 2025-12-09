import { type JSX } from "react";
import iconCalendar from "../../../../../../public/icons/calendar.svg"
import classes from "./style.module.css";

type IconCalendarProps = {
  className?: string | Record<string, string>;
  opacity?: string | number;
};

export const IconCalendar = ({ className, opacity }: IconCalendarProps): JSX.Element => {
  const isStyleObject = className && typeof className === "object";
  const containerClass = typeof className === "string" ? `${classes.container} ${className}` : classes.container;
  const containerStyle = isStyleObject ? (className as React.CSSProperties) : undefined;

  return (
    <div className={containerClass} style={containerStyle}>
      <img
        className={classes.image}
        alt="Calendário"
        src={iconCalendar}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          opacity: opacity ?? 1,
        }}
      />
    </div>
  );
};
