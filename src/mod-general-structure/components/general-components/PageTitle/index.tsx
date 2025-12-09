// src/mod-general-structure/components/components/PageTitle/index.tsx
import PropTypes from "prop-types";
import { type JSX, type ReactNode } from "react";
import classes from "./style.module.css";

interface Props {
  text?: string;
  theme: "dark" | "light";
  icon?: ReactNode;
  className?: any;
  textClassName?: any;
}

export const PageTitle = ({
  text = "Section Title",
  theme,
  icon,
  className,
  textClassName,
}: Props): JSX.Element => {
  return (
    <div
      className={`${classes.container} ${
        theme === "dark" ? classes.containerDark : classes.containerLight
      } ${className || ""}`}
    >
      {icon && <div className={classes.iconWrapper}>{icon}</div>}

      <div
        className={`${classes.textWrapper} ${
          theme === "dark" ? classes.textWrapperDark : classes.textWrapperLight
        } ${textClassName || ""}`}
      >
        {text}
      </div>
    </div>
  );
};

PageTitle.propTypes = {
  text: PropTypes.string,
  theme: PropTypes.oneOf(["dark", "light"]),
};
