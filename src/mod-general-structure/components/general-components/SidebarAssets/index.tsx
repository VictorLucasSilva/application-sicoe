// src/mod-general-structure/components/general-components/SidebarAssets/index.tsx
import PropTypes from "prop-types";
import { type CSSProperties, type JSX } from "react";
import { SidebarIcon } from "../SidebarIcon";
import classes from "./style.module.css";

interface Props {
  showText?: boolean;
  showIcon?: boolean;
  text?: string;
  status?: "pressed" | "hover" | "selected" | "default";
  theme?: "dark" | "light";
  className?: CSSProperties; // usado como style inline
  override?: JSX.Element;
  onClick?: () => void;
}

export const SidebarAssets = ({
  showText = true,
  showIcon = true,
  text = "Item de Menu",
  status = "default",
  theme = "light",
  className,
  override = <SidebarIcon />,
  onClick,
}: Props): JSX.Element => {
  const containerClasses = [classes.container];

  containerClasses.push(
    theme === "dark" ? classes.dark : classes.light,
  );

  if (status === "selected") {
    containerClasses.push(
      theme === "dark" ? classes.selectedDark : classes.selectedLight,
    );
  }

  return (
    <div
      className={containerClasses.join(" ")}
      style={className}
      onClick={onClick}
    >
      <div
        className={`${classes.indicator} ${
          status === "selected" ? classes.indicatorSelected : ""
        }`}
      />

      {showIcon && override}

      {showText && (
        <div className={classes.textWrapper}>
          <div
            className={`${classes.text} ${
              status === "selected" ? classes.textSelected : ""
            }`}
          >
            {text}
          </div>
        </div>
      )}
    </div>
  );
};

SidebarAssets.propTypes = {
  showText: PropTypes.bool,
  showIcon: PropTypes.bool,
  text: PropTypes.string,
  status: PropTypes.oneOf(["pressed", "hover", "selected", "default"]),
  theme: PropTypes.oneOf(["dark", "light"]),
  onClick: PropTypes.func,
};
