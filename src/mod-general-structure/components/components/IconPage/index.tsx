import PropTypes from "prop-types";
import { type JSX } from "react";
import classes from "./style.module.css";
interface Props {
  size: "large" | "x-large" | "medium" | "small";
  color:
    | "low"
    | "high"
    | "highlight"
    | "brand-primary"
    | "brand-primary-lighter"
    | "brand-secondary";
  className: any;
}
export const Iconer = ({ size, color, className }: Props): JSX.Element => {
  const getClassNames = () => {
    const classNames = [classes.iconer];
    classNames.push(classes[`size-${size}`]);
    classNames.push(classes[`color-${color}`]);
    classNames.push(classes[`variant-${size}-${color}`]);
    return classNames.join(" ");
  };
  return <div className={`${getClassNames()} ${className || ""}`} />;
};
Iconer.propTypes = {
  size: PropTypes.oneOf(["large", "x-large", "medium", "small"]),
  color: PropTypes.oneOf([
    "low",
    "high",
    "highlight",
    "brand-primary",
    "brand-primary-lighter",
    "brand-secondary",
  ]),
};
