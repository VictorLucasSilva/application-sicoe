import PropTypes from "prop-types";
import { type JSX } from "react";
import { ChevronLeft } from "../ChevronLeft";
import { ChevronRight } from "../ChevronRight";
import classes from "./PagerAssets.module.css";
interface Props {
  type:
    | "hover-page"
    | "continuation"
    | "default-page"
    | "selected-page"
    | "navigate-left"
    | "navigate-right";
  theme: "dark" | "light";
  className: any;
  dayClassName: any;
}
export const PagerAssets = ({
  type,
  theme,
  className,
  dayClassName,
}: Props): JSX.Element => {
  return (
    <div
      className={`${classes.container} ${classes[type]} ${classes[theme]}`}
      style={className}
    >
      {" "}
      {type === "navigate-left" && (
        <ChevronLeft
          className={{
            height: "24px",
            marginLeft: "8px",
            marginTop: "8px",
            width: "24px",
          }}
          color={theme === "dark" ? "white" : "black"}
        />
      )}{" "}
      {type === "navigate-right" && (
        <ChevronRight
          className={{
            height: "24px",
            marginRight: "8px",
            marginTop: "8px",
            width: "24px",
          }}
          color={theme === "dark" ? "white" : "black"}
        />
      )}{" "}
      {["continuation", "default-page", "hover-page", "selected-page"].includes(
        type
      ) && (
        <div
          className={`${classes.day} ${classes[`day-${type}`]} ${
            classes[`day-${theme}`]
          }`}
          style={dayClassName}
        >
          {" "}
          {type === "continuation" && <>...</>}{" "}
          {type === "selected-page" && <>1</>}{" "}
          {type === "default-page" && <>2</>} {type === "hover-page" && <>3</>}{" "}
        </div>
      )}{" "}
    </div>
  );
};
PagerAssets.propTypes = {
  type: PropTypes.oneOf([
    "hover-page",
    "continuation",
    "default-page",
    "selected-page",
    "navigate-left",
    "navigate-right",
  ]),
  theme: PropTypes.oneOf(["dark", "light"]),
};
