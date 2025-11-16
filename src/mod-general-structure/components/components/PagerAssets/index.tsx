// src/mod-general-structure/components/components/PagerAssets/index.tsx
import { type CSSProperties, type JSX } from "react";
import { ChevronLeft } from "../ChevronLeft";
import { ChevronRight } from "../ChevronRight";
import classes from "./style.module.css";

type Props = {
  type:
    | "hover-page"
    | "continuation"
    | "default-page"
    | "selected-page"
    | "navigate-left"
    | "navigate-right";
  theme: "dark" | "light";
  className?: CSSProperties;
  dayClassName?: CSSProperties;
  text?: string;
};

export const PagerAssets = ({
  type,
  theme,
  className,
  dayClassName,
  text,
}: Props): JSX.Element => {
  if (type === "navigate-left") {
    return (
      <div
        className={`${classes.container} ${classes[theme]} ${
          classes["default-page"]
        }`}
        style={className}
      >
        <ChevronLeft />
      </div>
    );
  }

  if (type === "navigate-right") {
    return (
      <div
        className={`${classes.container} ${classes[theme]} ${
          classes["default-page"]
        }`}
        style={className}
      >
        <ChevronRight />
      </div>
    );
  }

  let content = text;

  if (!content) {
    if (type === "continuation") {
      content = "...";
    } else if (type === "selected-page") {
      content = "1";
    } else if (type === "hover-page") {
      content = "3";
    } else {
      content = "2";
    }
  }

  return (
    <div
      className={`${classes.container} ${classes[type]} ${classes[theme]}`}
      style={className}
    >
      <div
        className={`${classes.day} ${classes[`day-${type}`]} ${
          classes[`day-${theme}`]
        }`}
        style={dayClassName}
      >
        {content}
      </div>
    </div>
  );
};
