import PropTypes from "prop-types";
import { type JSX } from "react";
import classes from "./style.module.css";
interface Props {
  type: "subtitle" | "title" | "text";
  size:
    | "large"
    | "XXX-huge"
    | "x-small"
    | "x-huge"
    | "XX-huge"
    | "XX-small"
    | "XXX-large"
    | "small"
    | "XX-large"
    | "huge"
    | "x-large"
    | "medium";
  color: "low-primary" | "low-secondary" | "high-primary" | "high-secondary" | "brandprimarypure";
  weight: "semibold" | "regular" | "n-a" | "light";
  className: any;
  text?: string | object;
  textClassName?: object;
  text1?: string;
}
export const Text = ({
  type,
  size,
  color,
  weight,
  className,
  text,
}: Props): JSX.Element => {
  const containerClasses = [
    classes.container,
    classes[`color-${color}`],
    classes[`size-${size}`],
    classes[`type-${type}`],
    classes[`weight-${weight}`],
  ]
    .filter(Boolean)
    .join(" ");
  const textClasses = [
    classes.text,
    classes[`text-color-${color}`],
    classes[`text-size-${size}`],
    classes[`text-type-${type}`],
    classes[`text-weight-${weight}`],
    classes.text1,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={containerClasses} style={className}>
      {" "}
      <div className={textClasses}>
        {" "}
        {(size === "XX-huge" ||
          size === "XX-large" ||
          size === "XXX-huge" ||
          size === "XXX-large" ||
          size === "huge" ||
          size === "x-huge" ||
          size === "x-large") && <p>{text}</p>}{" "}
        {type === "text" && <p>{text}</p>}{" "}
      </div>{" "}
    </div>
  );
};
Text.propTypes = {
  type: PropTypes.oneOf(["subtitle", "title", "text"]),
  size: PropTypes.oneOf([
    "large",
    "XXX-huge",
    "x-small",
    "x-huge",
    "XX-huge",
    "XX-small",
    "XXX-large",
    "small",
    "XX-large",
    "huge",
    "x-large",
    "medium",
  ]),
  color: PropTypes.oneOf([
    "low-primary",
    "low-secondary",
    "high-primary",
    "high-secondary",
  ]),
  weight: PropTypes.oneOf(["semibold", "regular", "n-a", "light"]),
  text: PropTypes.string,
  text1: PropTypes.string,
};
