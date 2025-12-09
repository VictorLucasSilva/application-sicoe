import PropTypes from "prop-types";
import { type JSX } from "react";
import { useReducer } from "react";
import { SidebarAssets } from "../SidebarAssets";
import { Divider } from "../Divider";
import { IconEstabEstablishment } from "../IconSvg/IconEstabEstablishment";
import { IconDocEstablishment } from "../IconSvg/IconDocEstablishment";
import { IconHomeContract } from "../IconSvg/IconHomeContract";
import { IconHomeEstablishment} from "../IconSvg/IconHomeEstablishment";
import { IconUnitEstablishment } from "../IconSvg/IconUnitsEstablishment";
import classes from "./style.module.css";

interface Props {
  type: "cont" | "estab";
  level: "primary" | "collapsed";
  theme: "dark" | "light";
  selected:
    | "PCA"
    | "default"
    | "documentos"
    | "home"
    | "unidades"
    | "estabelecimentos";
  className?: any;
  sidebarAssets?: JSX.Element;
  override?: JSX.Element;
}

export const SidebarMenu = ({
  type,
  level,
  theme,
  selected,
  className,
  sidebarAssets = (
    <IconHomeContract
      className={{ height: "24px", position: "relative", width: "24px" }}
      color="#465EFF"
    />
  ),
}: Props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, {
    type: type || "estab",
    level: level || "collapsed",
    theme: theme || "light",
    selected: selected || "default",
  });
  return (
    <div
      className={`${classes.container} ${classes[`level-${state.level}`]} ${
        classes[`theme-${state.theme}`]
      } ${classes[`selected-${state.selected}`]} ${
        classes[`type-${state.type}`]
      }`}
      style={className}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
    >
      {" "}
      {(state.selected === "PCA" ||
        (state.selected === "default" &&
          state.theme === "dark" &&
          state.type === "cont") ||
        (state.selected === "default" && state.theme === "light") ||
        state.selected === "documentos" ||
        state.selected === "estabelecimentos" ||
        state.selected === "home" ||
        state.selected === "unidades") && (
        <Divider
          className={
            state.type === "estab" && state.level === "primary"
              ? { left: "unset", top: "unset", width: "296px" }
              : {
                  alignSelf: "stretch",
                  left: "unset",
                  top: "unset",
                  width: "100%",
                }
          }
          color="low-lighter"
          orientation="horizontal"
          size="small"
          theme="light"
        />
      )}{" "}
      {((state.level === "collapsed" &&
        state.selected === "PCA" &&
        state.theme === "light") ||
        (state.level === "collapsed" &&
          state.selected === "documentos" &&
          state.theme === "light") ||
        (state.level === "collapsed" &&
          state.selected === "estabelecimentos" &&
          state.theme === "light") ||
        (state.level === "collapsed" && state.selected === "home") ||
        (state.level === "collapsed" &&
          state.selected === "unidades" &&
          state.theme === "light") ||
        (state.level === "primary" &&
          state.selected === "home" &&
          state.theme === "dark") ||
        (state.selected === "PCA" && state.theme === "dark") ||
        (state.selected === "default" &&
          state.theme === "dark" &&
          state.type === "cont") ||
        (state.selected === "default" && state.theme === "light") ||
        (state.selected === "documentos" && state.theme === "dark") ||
        (state.selected === "estabelecimentos" && state.theme === "dark") ||
        (state.selected === "unidades" && state.theme === "dark")) && (
        <>
          {" "}
          <div
            className={`${classes.menuItem} ${
              state.selected === "home" && state.theme === "dark"
                ? classes.menuItemSelectedDark
                : classes.menuItemDefault
            }`}
            onClick={() => {
              dispatch("click_64");
            }}
          />{" "}
          <div
            className={`${classes.menuItem} ${
              state.theme === "dark" &&
              ["PCA", "documentos"].includes(state.selected)
                ? classes.menuItemSelectedDark
                : classes.menuItemDefault
            }`}
            onClick={() => {
              dispatch("click");
            }}
          />{" "}
        </>
      )}{" "}
      {((state.level === "collapsed" &&
        state.selected === "documentos" &&
        state.theme === "light") ||
        (state.level === "collapsed" &&
          state.selected === "estabelecimentos" &&
          state.theme === "light") ||
        (state.level === "collapsed" &&
          state.selected === "home" &&
          state.type === "estab") ||
        (state.level === "collapsed" &&
          state.selected === "unidades" &&
          state.theme === "light") ||
        (state.level === "primary" &&
          state.selected === "home" &&
          state.theme === "dark" &&
          state.type === "estab") ||
        (state.selected === "default" &&
          state.theme === "light" &&
          state.type === "estab") ||
        (state.selected === "documentos" && state.theme === "dark") ||
        (state.selected === "estabelecimentos" && state.theme === "dark") ||
        (state.selected === "unidades" && state.theme === "dark")) && (
        <>
          {" "}
          <div
            className={`${classes.menuItem} ${
              state.theme === "dark" && state.selected === "unidades"
                ? classes.menuItemSelectedDark
                : classes.menuItemDefault
            }`}
            onClick={() => {
              dispatch("click_46");
            }}
          />{" "}
          <div
            className={`${classes.menuItem} ${classes.menuItemLast} ${
              state.selected === "estabelecimentos" && state.theme === "dark"
                ? classes.menuItemSelectedDark
                : classes.menuItemDefault
            }`}
            onClick={() => {
              dispatch("click_51");
            }}
          />{" "}
        </>
      )}{" "}
      {((state.level === "primary" &&
        state.selected === "documentos" &&
        state.theme === "light") ||
        (state.level === "primary" &&
          state.selected === "estabelecimentos" &&
          state.theme === "light") ||
        (state.level === "primary" &&
          state.selected === "home" &&
          state.theme === "light" &&
          state.type === "estab") ||
        (state.level === "primary" &&
          state.selected === "unidades" &&
          state.theme === "light")) && (
        <>
          <SidebarAssets
            className={{
              alignSelf: "stretch",
              flex: "0 0 auto",
              left: "unset",
              top: "unset",
              width: "100%",
            }}
            onClick={() => {
              dispatch("click_64");
            }}
            override={
              <IconHomeEstablishment
                className={{
                  height: "24px",
                  position: "relative",
                  width: "24px",
                }}
                color={
                  state.selected === "home"
                    ? "#465EFF"
                    : ["documentos", "estabelecimentos", "unidades"].includes(
                        state.selected
                      )
                    ? "black"
                    : undefined
                }
                opacity={
                  ["documentos", "estabelecimentos", "unidades"].includes(
                    state.selected
                  )
                    ? "0.65"
                    : undefined
                }
              />
            }
            status={state.selected === "home" ? "selected" : "default"}
            text="Home"
            theme="light"
          />{" "}
          <SidebarAssets
            className={{
              alignSelf: "stretch",
              flex: "0 0 auto",
              left: "unset",
              top: "unset",
              width: "100%",
            }}
            onClick={() => {
              dispatch("click");
            }}
            override={
              <IconDocEstablishment
                className={{
                  height: "24px",
                  position: "relative",
                  width: "24px",
                }}
                color={
                  ["estabelecimentos", "home", "unidades"].includes(
                    state.selected
                  )
                    ? "black"
                    : state.selected === "documentos"
                    ? "#465EFF"
                    : undefined
                }
                opacity={
                  ["estabelecimentos", "home", "unidades"].includes(
                    state.selected
                  )
                    ? "0.65"
                    : undefined
                }
              />
            }
            status={state.selected === "documentos" ? "selected" : "default"}
            text="Documentos"
            theme="light"
          />{" "}
          <SidebarAssets
            className={{
              alignSelf: "stretch",
              flex: "0 0 auto",
              left: "unset",
              top: "unset",
              width: "100%",
            }}
            onClick={() => {
              dispatch("click_46");
            }}
            override={
              <IconUnitEstablishment
                className={{
                  height: "24px",
                  position: "relative",
                  width: "24px",
                }}
                color={
                  ["documentos", "estabelecimentos", "home"].includes(
                    state.selected
                  )
                    ? "black"
                    : state.selected === "unidades"
                    ? "#465EFF"
                    : undefined
                }
                opacity={
                  ["documentos", "estabelecimentos", "home"].includes(
                    state.selected
                  )
                    ? "0.65"
                    : undefined
                }
              />
            }
            status={state.selected === "unidades" ? "selected" : "default"}
            text="Unidades"
            theme="light"
          />{" "}
          <SidebarAssets
            className={{
              alignSelf: "stretch",
              flex: "0 0 auto",
              left: "unset",
              marginBottom: "-10.00px",
              top: "unset",
              width: "100%",
            }}
            onClick={() => {
              dispatch("click_51");
            }}
            override={
              <IconEstabEstablishment
                className={{
                  height: "24px",
                  position: "relative",
                  width: "24px",
                }}
                color={
                  ["documentos", "home", "unidades"].includes(state.selected)
                    ? "black"
                    : state.selected === "estabelecimentos"
                    ? "#465EFF"
                    : undefined
                }
                opacity={
                  ["documentos", "home", "unidades"].includes(state.selected)
                    ? "0.65"
                    : undefined
                }
              />
            }
            status={
              state.selected === "estabelecimentos" ? "selected" : "default"
            }
            text="Estabelecimentos"
            theme="light"
          />{" "}
        </>
      )}{" "}
      {state.type === "estab" &&
        state.selected === "default" &&
        state.theme === "dark" && (
          <>
            {" "}
            <div
              className={`${classes.divider} ${
                state.level === "collapsed"
                  ? classes.dividerCollapsed
                  : classes.dividerPrimary
              }`}
            />{" "}
            <div className={classes.emptyMenuItem} />{" "}
            <div className={classes.emptyMenuItem} />{" "}
            <div className={classes.emptyMenuItem} />{" "}
            <div
              className={`${classes.emptyMenuItem} ${classes.emptyMenuItemLast}`}
            />{" "}
          </>
        )}{" "}
      {((state.level === "primary" &&
        state.selected === "PCA" &&
        state.theme === "light") ||
        (state.level === "primary" &&
          state.selected === "home" &&
          state.theme === "light" &&
          state.type === "cont")) && (
        <>
          {" "}
          <SidebarAssets
            className={{
              alignSelf: "stretch",
              flex: "0 0 auto",
              left: "unset",
              top: "unset",
              width: "100%",
            }}
            onClick={() => {
              dispatch("click_230");
            }}
            override={sidebarAssets}
            status={state.selected === "PCA" ? "default" : "selected"}
            text="Home"
            theme="light"
          />{" "}
          <SidebarAssets
            className={{
              alignSelf: "stretch",
              flex: "0 0 auto",
              left: "unset",
              top: "unset",
              width: "100%",
            }}
            onClick={() => {
              dispatch("click_219");
            }}
            override={override}
            status={state.selected === "PCA" ? "selected" : "default"}
            text="PCA"
            theme="light"
          />{" "}
        </>
      )}{" "}
    </div>
  );
};

function reducer(state: any, action: any) {
  if (
    state.level === "primary" &&
    state.selected === "home" &&
    state.theme === "light" &&
    state.type === "estab"
  ) {
    switch (action) {
      case "click":
        return {
          level: "primary",
          selected: "documentos",
          theme: "light",
          type: "estab",
        };
      case "click_46":
        return {
          level: "primary",
          selected: "unidades",
          theme: "light",
          type: "estab",
        };
      case "click_51":
        return {
          level: "primary",
          selected: "estabelecimentos",
          theme: "light",
          type: "estab",
        };
    }
  }
  if (
    state.level === "primary" &&
    state.selected === "documentos" &&
    state.theme === "light" &&
    state.type === "estab"
  ) {
    switch (action) {
      case "click_64":
        return {
          level: "primary",
          selected: "home",
          theme: "light",
          type: "estab",
        };
      case "click_46":
        return {
          level: "primary",
          selected: "unidades",
          theme: "light",
          type: "estab",
        };
      case "click_51":
        return {
          level: "primary",
          selected: "estabelecimentos",
          theme: "light",
          type: "estab",
        };
    }
  }
  if (
    state.level === "primary" &&
    state.selected === "unidades" &&
    state.theme === "light" &&
    state.type === "estab"
  ) {
    switch (action) {
      case "click_64":
        return {
          level: "primary",
          selected: "home",
          theme: "light",
          type: "estab",
        };
      case "click":
        return {
          level: "primary",
          selected: "documentos",
          theme: "light",
          type: "estab",
        };
      case "click_51":
        return {
          level: "primary",
          selected: "estabelecimentos",
          theme: "light",
          type: "estab",
        };
    }
  }
  if (
    state.level === "primary" &&
    state.selected === "estabelecimentos" &&
    state.theme === "light" &&
    state.type === "estab"
  ) {
    switch (action) {
      case "click_64":
        return {
          level: "primary",
          selected: "home",
          theme: "light",
          type: "estab",
        };
      case "click":
        return {
          level: "primary",
          selected: "documentos",
          theme: "light",
          type: "estab",
        };
      case "click_46":
        return {
          level: "primary",
          selected: "unidades",
          theme: "light",
          type: "estab",
        };
    }
  }
  if (
    state.level === "primary" &&
    state.selected === "home" &&
    state.theme === "dark" &&
    state.type === "estab"
  ) {
    switch (action) {
      case "click":
        return {
          level: "primary",
          selected: "documentos",
          theme: "dark",
          type: "estab",
        };
      case "click_46":
        return {
          level: "primary",
          selected: "unidades",
          theme: "dark",
          type: "estab",
        };
      case "click_51":
        return {
          level: "primary",
          selected: "estabelecimentos",
          theme: "dark",
          type: "estab",
        };
    }
  }
  if (
    state.level === "primary" &&
    state.selected === "documentos" &&
    state.theme === "dark" &&
    state.type === "estab"
  ) {
    switch (action) {
      case "click_64":
        return {
          level: "primary",
          selected: "home",
          theme: "dark",
          type: "estab",
        };
      case "click_46":
        return {
          level: "primary",
          selected: "unidades",
          theme: "dark",
          type: "estab",
        };
      case "click_51":
        return {
          level: "primary",
          selected: "estabelecimentos",
          theme: "dark",
          type: "estab",
        };
    }
  }
  if (
    state.level === "primary" &&
    state.selected === "unidades" &&
    state.theme === "dark" &&
    state.type === "estab"
  ) {
    switch (action) {
      case "click_64":
        return {
          level: "primary",
          selected: "home",
          theme: "dark",
          type: "estab",
        };
      case "click":
        return {
          level: "primary",
          selected: "documentos",
          theme: "dark",
          type: "estab",
        };
      case "click_51":
        return {
          level: "primary",
          selected: "estabelecimentos",
          theme: "dark",
          type: "estab",
        };
    }
  }
  if (
    state.level === "primary" &&
    state.selected === "estabelecimentos" &&
    state.theme === "dark" &&
    state.type === "estab"
  ) {
    switch (action) {
      case "click_64":
        return {
          level: "primary",
          selected: "home",
          theme: "dark",
          type: "estab",
        };
      case "click":
        return {
          level: "primary",
          selected: "documentos",
          theme: "dark",
          type: "estab",
        };
      case "click_46":
        return {
          level: "primary",
          selected: "unidades",
          theme: "dark",
          type: "estab",
        };
    }
  }
  if (
    state.level === "primary" &&
    state.selected === "home" &&
    state.theme === "light" &&
    state.type === "cont"
  ) {
    switch (action) {
      case "click_219":
        return {
          level: "primary",
          selected: "PCA",
          theme: "light",
          type: "cont",
        };
    }
  }
  if (
    state.level === "primary" &&
    state.selected === "PCA" &&
    state.theme === "light" &&
    state.type === "cont"
  ) {
    switch (action) {
      case "click_230":
        return {
          level: "primary",
          selected: "home",
          theme: "light",
          type: "cont",
        };
    }
  }
  if (
    state.level === "primary" &&
    state.selected === "home" &&
    state.theme === "dark" &&
    state.type === "cont"
  ) {
    switch (action) {
      case "click_219":
        return {
          level: "primary",
          selected: "PCA",
          theme: "dark",
          type: "cont",
        };
    }
  }
  if (
    state.level === "primary" &&
    state.selected === "PCA" &&
    state.theme === "dark" &&
    state.type === "cont"
  ) {
    switch (action) {
      case "click_230":
        return {
          level: "primary",
          selected: "home",
          theme: "dark",
          type: "cont",
        };
    }
  }
  switch (action) {
    case "mouse_enter":
      return { ...state, level: "primary" };
    case "mouse_leave":
      return { ...state, level: "collapsed" };
  }
  return state;
}
SidebarMenu.propTypes = {
  type: PropTypes.oneOf(["cont", "estab"]),
  level: PropTypes.oneOf(["primary", "collapsed"]),
  theme: PropTypes.oneOf(["dark", "light"]),
  selected: PropTypes.oneOf([
    "PCA",
    "default",
    "documentos",
    "home",
    "unidades",
    "estabelecimentos",
  ]),
};
