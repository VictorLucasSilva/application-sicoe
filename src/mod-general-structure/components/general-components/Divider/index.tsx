import PropTypes from "prop-types";
import { type JSX } from "react";
import classes from "./styles.module.css"

interface Props {
  size: "large" | "extra-small" | "medium" | "small";
  theme: "dark" | "light";
  orientation: "vertical" | "horizontal";
  color:
    | "high-pure"
    | "low-lighter"
    | "low-darker"
    | "secondary-pure"
    | "high-lighter";
  className: any;
}
export const Divider = ({
  size,
  theme,
  orientation,
  color,
  className,
}: Props): JSX.Element => {
  const classNames = [
    classes.divider,
    classes[`size-${size}`],
    classes[`theme-${theme}`],
    classes[`orientation-${orientation}`],
    classes[`color-${color}`],
    classes[`${orientation}-${color}`],
    classes[`${size}-${theme}`],
    classes[`${size}-${orientation}`],
    classes[`${color}-${size}`],
    classes[`${size}-${theme}-${orientation}`],
    classes[`${orientation}-${theme}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return <div className={classNames} />;
};
Divider.propTypes = {
  size: PropTypes.oneOf(["large", "extra-small", "medium", "small"]),
  theme: PropTypes.oneOf(["dark", "light"]),
  orientation: PropTypes.oneOf(["vertical", "horizontal"]),
  color: PropTypes.oneOf([
    "high-pure",
    "low-lighter",
    "low-darker",
    "secondary-pure",
    "high-lighter",
  ]),
};
