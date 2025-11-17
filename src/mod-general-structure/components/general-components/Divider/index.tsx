import PropTypes from "prop-types";
import type { JSX, CSSProperties } from "react";
import classes from "./styles.module.css";

interface Props {
  size: "large" | "extra-small" | "medium" | "small";
  theme: "dark" | "light";
  orientation: "vertical" | "horizontal";
  color:
    | "high-pure"
    | "low-lighter"
    | "low-darker"
    | "secondary-pure"
    | "high-lighter"
    | "primary-pure";
  className?: object;
  style?: CSSProperties;
}

export const Divider = ({
  size,
  theme,
  orientation,
  color,
  className,
  style,
}: Props): JSX.Element => {
  const classNames = [
    classes.divider,
    classes[`size-${size}`],
    classes[`theme-${theme}`],
    classes[`orientation-${orientation}`],
    classes[`color-${color}`],
    className || "",
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  return <div className={classNames} style={style} />;
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
    "primary-pure",
  ]),
};
