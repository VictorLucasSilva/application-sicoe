import PropTypes from "prop-types";
import { type JSX } from "react";
import classes from "./style.module.css";
interface Props {
  pageHeight: "x-4" | "x-8" | "x-2";
  position: "top" | "middle" | "bottom";
  className: any;
  frameClassName: any;
}
export const ScrollbarVertical = ({
  pageHeight,
  position,
  className,
  frameClassName,
}: Props): JSX.Element => {
  const containerClass = `${classes.container} ${
    classes[`pageHeight-${pageHeight}`]
  } ${classes[`position-${position}`]} ${className || ""}`;
  const frameClass = `${classes.frame} ${
    classes[`frame-position-${position}`]
  } ${frameClassName || ""}`;
  const thumbClass = `${classes.thumb} ${
    classes[`thumb-pageHeight-${pageHeight}-position-${position}`]
  }`;
  return (
    <div className={containerClass}>
      {" "}
      <div className={frameClass}>
        {" "}
        <div className={thumbClass} />{" "}
      </div>{" "}
    </div>
  );
};
ScrollbarVertical.propTypes = {
  pageHeight: PropTypes.oneOf(["x-4", "x-8", "x-2"]),
  position: PropTypes.oneOf(["top", "middle", "bottom"]),
};
