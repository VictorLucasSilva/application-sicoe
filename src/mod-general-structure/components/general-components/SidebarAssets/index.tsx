import PropTypes from "prop-types";
import { type JSX } from "react";
import { useReducer } from "react";
import { SidebarIcon } from "../SidebarIcon";
import classes from "./style.module.css";
interface Props {
  showText: boolean;
  showIcon: boolean;
  text: string;
  status: "pressed" | "hover" | "selected" | "default";
  theme: "dark" | "light";
  className: any;
  override?: JSX.Element;
}
export const SidebarAssets = ({
  showText = true,
  showIcon = true,
  text = "Item de Menu",
  status,
  theme,
  className,
  override = <SidebarIcon color="low" size="small" />,
}: Props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, {
    status: status || "default",
    theme: theme || "light",
  });
  const getContainerClass = () => {
    const classNames = [classes.container];
    if (state.status === "hover" && state.theme === "light") {
      classNames.push(classes.hoverLight);
    } else if (state.status === "pressed" && state.theme === "light") {
      classNames.push(classes.pressedLight);
    } else if (state.theme === "light" && state.status === "selected") {
      classNames.push(classes.selectedLight);
    } else if (state.status === "hover" && state.theme === "dark") {
      classNames.push(classes.hoverDark);
    } else if (state.status === "pressed" && state.theme === "dark") {
      classNames.push(classes.pressedDark);
    } else if (state.status === "selected" && state.theme === "dark") {
      classNames.push(classes.selectedDark);
    }
    return classNames.join(" ");
  };
  const getIndicatorClass = () => {
    const classNames = [classes.indicator];
    if (state.theme === "light" && state.status === "selected") {
      classNames.push(classes.indicatorSelectedLight);
    } else if (state.status === "selected" && state.theme === "dark") {
      classNames.push(classes.indicatorSelectedDark);
    }
    return classNames.join(" ");
  };
  const getTextClass = () => {
    const classNames = [classes.text];
    if (state.theme === "light" && state.status === "selected") {
      classNames.push(classes.textSelectedLight);
    } else if (
      state.theme === "dark" &&
      ["default", "hover", "pressed"].includes(state.status)
    ) {
      classNames.push(classes.textDark);
    } else if (state.status === "selected" && state.theme === "dark") {
      classNames.push(classes.textSelectedDark);
    } else {
      classNames.push(classes.textDefault);
    }
    return classNames.join(" ");
  };
  return (
    <div
      className={getContainerClass()}
      style={className}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
      onClick={() => {
        dispatch("click");
      }}
    >
      {" "}
      <div className={getIndicatorClass()} /> {showIcon && <>{override}</>}{" "}
      {showText && (
        <div className={classes.textWrapper}>
          {" "}
          <div className={getTextClass()}>{text}</div>{" "}
        </div>
      )}{" "}
    </div>
  );
};
function reducer(state: any, action: any) {
  if (state.status === "default" && state.theme === "light") {
    switch (action) {
      case "mouse_enter":
        return { status: "hover", theme: "light" };
    }
  }
  if (state.status === "hover" && state.theme === "light") {
    switch (action) {
      case "mouse_leave":
        return { status: "default", theme: "light" };
    }
  }
  if (state.status === "pressed" && state.theme === "light") {
    switch (action) {
      case "click":
        return { status: "selected", theme: "light" };
    }
  }
  if (state.status === "selected" && state.theme === "light") {
    switch (action) {
      case "click":
        return { status: "default", theme: "light" };
    }
  }
  if (state.status === "default" && state.theme === "dark") {
    switch (action) {
      case "mouse_enter":
        return { status: "hover", theme: "dark" };
    }
  }
  if (state.status === "hover" && state.theme === "dark") {
    switch (action) {
      case "mouse_leave":
        return { status: "default", theme: "dark" };
    }
  }
  if (state.status === "pressed" && state.theme === "dark") {
    switch (action) {
      case "click":
        return { status: "selected", theme: "dark" };
    }
  }
  if (state.status === "selected" && state.theme === "dark") {
    switch (action) {
      case "click":
        return { status: "default", theme: "dark" };
    }
  }
  return state;
}
SidebarAssets.propTypes = {
  showText: PropTypes.bool,
  showIcon: PropTypes.bool,
  text: PropTypes.string,
  status: PropTypes.oneOf(["pressed", "hover", "selected", "default"]),
  theme: PropTypes.oneOf(["dark", "light"]),
};
