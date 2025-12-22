import PropTypes from "prop-types";
import { type JSX } from "react";
import { useReducer } from "react";
import classes from "./style.module.css";

interface Props {
  type: "caption" | "inline" | "standalone";
  status: "pressed-visited" | "on-focus" | "default" | "hover" | "disabled";
  theme: "black" | "white" | "dark" | "light";
  className?: object;
}

export const Hyperlink = ({
  type,
  status,
  theme,
  className,
}: Props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, {
    type: type || "inline",
    status: status || "default",
    theme: theme || "light",
  });
  const containerClasses = [
    classes.hyperlink,
    classes[`type-${state.type}`],
    classes[`status-${state.status}`],
    classes[`theme-${state.theme}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const textClasses = [
    classes.text,
    classes[`text-type-${state.type}`],
    classes[`text-status-${state.status}`],
    classes[`text-theme-${state.theme}`],
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div
      className={containerClasses}
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
      <div className={textClasses}>
        {" "}
        {state.type === "inline" && <>Inline link</>}{" "}
        {state.type === "standalone" && <>Standalone link</>}{" "}
        {state.type === "caption" && <>Caption link</>}{" "}
      </div>{" "}
    </div>
  );
};
function reducer(state: any, action: any) {
  if (
    state.status === "default" &&
    state.theme === "white" &&
    state.type === "inline"
  ) {
    switch (action) {
      case "mouse_enter":
        return { status: "hover", theme: "white", type: "inline" };
    }
  }
  if (
    state.status === "hover" &&
    state.theme === "white" &&
    state.type === "inline"
  ) {
    switch (action) {
      case "mouse_leave":
        return { status: "default", theme: "white", type: "inline" };
      case "click":
        return { status: "pressed-visited", theme: "white", type: "inline" };
    }
  }
  if (
    state.status === "default" &&
    state.theme === "white" &&
    state.type === "standalone"
  ) {
    switch (action) {
      case "mouse_enter":
        return { status: "hover", theme: "white", type: "standalone" };
    }
  }
  if (
    state.status === "hover" &&
    state.theme === "white" &&
    state.type === "standalone"
  ) {
    switch (action) {
      case "mouse_leave":
        return { status: "default", theme: "white", type: "standalone" };
      case "click":
        return {
          status: "pressed-visited",
          theme: "white",
          type: "standalone",
        };
    }
  }
  if (
    state.status === "default" &&
    state.theme === "white" &&
    state.type === "caption"
  ) {
    switch (action) {
      case "mouse_enter":
        return { status: "hover", theme: "white", type: "caption" };
    }
  }
  if (
    state.status === "hover" &&
    state.theme === "white" &&
    state.type === "caption"
  ) {
    switch (action) {
      case "mouse_leave":
        return { status: "default", theme: "white", type: "caption" };
      case "click":
        return { status: "pressed-visited", theme: "white", type: "caption" };
    }
  }
  if (
    state.status === "default" &&
    state.theme === "black" &&
    state.type === "inline"
  ) {
    switch (action) {
      case "mouse_enter":
        return { status: "hover", theme: "black", type: "inline" };
    }
  }
  if (
    state.status === "hover" &&
    state.theme === "black" &&
    state.type === "inline"
  ) {
    switch (action) {
      case "mouse_leave":
        return { status: "default", theme: "black", type: "inline" };
      case "click":
        return { status: "pressed-visited", theme: "black", type: "inline" };
    }
  }
  if (
    state.status === "default" &&
    state.theme === "black" &&
    state.type === "standalone"
  ) {
    switch (action) {
      case "mouse_enter":
        return { status: "hover", theme: "black", type: "standalone" };
    }
  }
  if (
    state.status === "hover" &&
    state.theme === "black" &&
    state.type === "standalone"
  ) {
    switch (action) {
      case "mouse_leave":
        return { status: "default", theme: "black", type: "standalone" };
      case "click":
        return {
          status: "pressed-visited",
          theme: "black",
          type: "standalone",
        };
    }
  }
  if (
    state.status === "default" &&
    state.theme === "black" &&
    state.type === "caption"
  ) {
    switch (action) {
      case "mouse_enter":
        return { status: "hover", theme: "black", type: "caption" };
    }
  }
  if (
    state.status === "hover" &&
    state.theme === "black" &&
    state.type === "caption"
  ) {
    switch (action) {
      case "mouse_leave":
        return { status: "default", theme: "black", type: "caption" };
      case "click":
        return { status: "pressed-visited", theme: "black", type: "caption" };
    }
  }
  if (
    state.status === "default" &&
    state.theme === "light" &&
    state.type === "inline"
  ) {
    switch (action) {
      case "mouse_enter":
        return { status: "hover", theme: "light", type: "inline" };
    }
  }
  if (
    state.status === "hover" &&
    state.theme === "light" &&
    state.type === "inline"
  ) {
    switch (action) {
      case "mouse_leave":
        return { status: "default", theme: "light", type: "inline" };
      case "click":
        return { status: "pressed-visited", theme: "light", type: "inline" };
    }
  }
  if (
    state.status === "default" &&
    state.theme === "light" &&
    state.type === "standalone"
  ) {
    switch (action) {
      case "mouse_enter":
        return { status: "hover", theme: "light", type: "standalone" };
    }
  }
  if (
    state.status === "hover" &&
    state.theme === "light" &&
    state.type === "standalone"
  ) {
    switch (action) {
      case "mouse_leave":
        return { status: "default", theme: "light", type: "standalone" };
      case "click":
        return {
          status: "pressed-visited",
          theme: "light",
          type: "standalone",
        };
    }
  }
  if (
    state.status === "default" &&
    state.theme === "light" &&
    state.type === "caption"
  ) {
    switch (action) {
      case "mouse_enter":
        return { status: "hover", theme: "light", type: "caption" };
    }
  }
  if (
    state.status === "hover" &&
    state.theme === "light" &&
    state.type === "caption"
  ) {
    switch (action) {
      case "mouse_leave":
        return { status: "default", theme: "light", type: "caption" };
      case "click":
        return { status: "pressed-visited", theme: "light", type: "caption" };
    }
  }
  if (
    state.status === "default" &&
    state.theme === "dark" &&
    state.type === "inline"
  ) {
    switch (action) {
      case "mouse_enter":
        return { status: "hover", theme: "dark", type: "inline" };
    }
  }
  if (
    state.status === "hover" &&
    state.theme === "dark" &&
    state.type === "inline"
  ) {
    switch (action) {
      case "mouse_leave":
        return { status: "default", theme: "dark", type: "inline" };
      case "click":
        return { status: "pressed-visited", theme: "dark", type: "inline" };
    }
  }
  if (
    state.status === "default" &&
    state.theme === "dark" &&
    state.type === "standalone"
  ) {
    switch (action) {
      case "mouse_enter":
        return { status: "hover", theme: "dark", type: "standalone" };
    }
  }
  if (
    state.status === "hover" &&
    state.theme === "dark" &&
    state.type === "standalone"
  ) {
    switch (action) {
      case "mouse_leave":
        return { status: "default", theme: "dark", type: "standalone" };
      case "click":
        return { status: "pressed-visited", theme: "dark", type: "standalone" };
    }
  }
  if (
    state.status === "default" &&
    state.theme === "dark" &&
    state.type === "caption"
  ) {
    switch (action) {
      case "mouse_enter":
        return { status: "hover", theme: "dark", type: "caption" };
    }
  }
  if (
    state.status === "hover" &&
    state.theme === "dark" &&
    state.type === "caption"
  ) {
    switch (action) {
      case "mouse_leave":
        return { status: "default", theme: "dark", type: "caption" };
      case "click":
        return { status: "pressed-visited", theme: "dark", type: "caption" };
    }
  }
  return state;
}
Hyperlink.propTypes = {
  type: PropTypes.oneOf(["caption", "inline", "standalone"]),
  status: PropTypes.oneOf([
    "pressed-visited",
    "on-focus",
    "default",
    "hover",
    "disabled",
  ]),
  theme: PropTypes.oneOf(["black", "white", "dark", "light"]),
};
