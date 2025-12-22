import PropTypes from "prop-types";
import { type JSX } from "react";
import { useReducer } from "react";
import { Divider } from "../../general-components/Divider";
import classes from "./style.module.css";

interface Props {
  secondaryText: boolean;
  title: boolean;
  header: boolean;
  headerLabel: string;
  titleLabel: string;
  secondaryContent: string;
  divider: boolean;
  status: "active" | "hover";
  elevation: "off";
  theme: "dark" | "light";
  progress: "zero";
  className: any;
  onInfoContractClick: () => void;
}

export const ContBarCard = ({
  secondaryText = false,
  title = true,
  header = false,
  headerLabel = "Header",
  titleLabel = "Title",
  secondaryContent = "Texto secundário",
  divider = true,
  status,
  elevation,
  theme,
  progress,
  className,
  onInfoContractClick,
}: Props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, {
    status: status || "active",
    elevation: elevation || "off",
    theme: theme || "light",
    progress: progress || "zero",
  });
  return (
    <div
      className={`${classes.container} ${
        state.theme === "dark" ? classes.themeDark : classes.themeLight
      } ${
        state.status === "hover" ? classes.statusHover : classes.statusActive
      }`}
      style={className}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}

      onClick={onInfoContractClick}
    >
      {" "}
      {title && (
        <div className={classes.titleSection}>
          {" "}
          {title && (
            <div
              className={`${classes.titleText} ${
                state.theme === "dark"
                  ? classes.titleTextDark
                  : classes.titleTextLight
              }`}
            >
              {" "}
              Contrato{" "}
            </div>
          )}{" "}
          <div
            className={`${classes.supplierName} ${
              state.theme === "dark"
                ? classes.supplierNameDark
                : classes.supplierNameLight
            }`}
          >
            {" "}
            Nome do Fornecedor{" "}
          </div>{" "}
        </div>
      )}{" "}
      <div className={classes.dividerWrapper}>
        {" "}
        <Divider
          className={
            state.theme === "dark"
              ? {
                  alignSelf: "stretch",
                  backgroundColor: "var(--colors-neutral-high-lighter)",
                  height: "unset",
                  left: "unset",
                  top: "unset",
                }
              : {
                  alignSelf: "stretch",
                  height: "unset",
                  left: "unset",
                  top: "unset",
                }
          }
          color="low-lighter"
          orientation="vertical"
          size="small"
          theme="light"
        />{" "}
      </div>{" "}
      <div className={classes.balanceSection}>
        {" "}
        <div
          className={`${classes.balanceLabel} ${
            state.theme === "dark" ? classes.labelDark : classes.labelLight
          }`}
        >
          {" "}
          Saldo{" "}
        </div>{" "}
        <div
          className={`${classes.balanceValue} ${
            state.theme === "dark" ? classes.valueDark : classes.valueLight
          }`}
        >
          {" "}
          R$ 0.000.000,00{" "}
        </div>{" "}
        <div
          className={`${classes.progressWrapper} ${
            state.theme === "light" && state.status === "active"
              ? classes.progressWrapperActive
              : ""
          } ${
            state.theme === "dark" ||
            (state.status === "hover" && state.theme === "light")
              ? classes.progressWrapperOther
              : ""
          }`}
        >
          {state.theme === "light" && state.status === "active" && (
            <div className={classes.progressContainer}>
              <div className={classes.progressBarBackground} />{" "}
              <div className={classes.progressBarForeground} />{" "}
            </div>
          )}{" "}
        </div>{" "}
      </div>{" "}
      <div className={classes.dividerWrapper}>
        <Divider
          className={
            state.theme === "dark"
              ? {
                  alignSelf: "stretch",
                  backgroundColor: "var(--colors-neutral-high-lighter)",
                  height: "unset",
                  left: "unset",
                  top: "unset",
                }
              : {
                  alignSelf: "stretch",
                  height: "unset",
                  left: "unset",
                  top: "unset",
                }
          }
          color="low-lighter"
          orientation="vertical"
          size="small"
          theme="light"
        />{" "}
      </div>{" "}
      <div className={classes.expirationSection}>
        <div
          className={`${classes.expirationLabel} ${
            state.theme === "dark" ? classes.labelDark : classes.labelLight
          }`}
        >
          Vencimento{" "}
        </div>{" "}
        <div
          className={`${classes.expirationDays} ${
            state.theme === "dark" ? classes.valueDark : classes.valueLight
          }`}
        >
          365 dias{" "}
        </div>{" "}
        <div
          className={`${classes.expirationDate} ${
            state.theme === "dark" ? classes.dateDark : classes.dateLight
          }`}
        >
          dd/mm/aaaa{" "}
        </div>{" "}
      </div>{" "}
      <div className={classes.dividerWrapper}>
        <Divider
          className={
            state.theme === "dark"
              ? {
                  alignSelf: "stretch",
                  backgroundColor: "var(--colors-neutral-high-lighter)",
                  height: "unset",
                  left: "unset",
                  top: "unset",
                }
              : {
                  alignSelf: "stretch",
                  height: "unset",
                  left: "unset",
                  top: "unset",
                }
          }
          color="low-lighter"
          orientation="vertical"
          size="small"
          theme="light"
        />{" "}
      </div>{" "}
      <div className={classes.accountSection}>
        <div
          className={`${classes.accountLabel} ${
            state.theme === "dark" ? classes.labelDark : classes.labelLight
          }`}
        >
          Conta&nbsp;&nbsp;Orcamentária{" "}
        </div>{" "}
        <div
          className={`${classes.accountValue} ${
            state.theme === "dark" ? classes.valueDark : classes.valueLight
          }`}
        >
          99999-9{" "}
        </div>{" "}
      </div>{" "}
      <div className={classes.dividerWrapper}>
        <Divider
          className={
            state.theme === "dark"
              ? {
                  alignSelf: "stretch",
                  backgroundColor: "var(--colors-neutral-high-lighter)",
                  height: "unset",
                  left: "unset",
                  top: "unset",
                }
              : {
                  alignSelf: "stretch",
                  height: "unset",
                  left: "unset",
                  top: "unset",
                }
          }
          color="low-lighter"
          orientation="vertical"
          size="small"
          theme="light"
        />{" "}
      </div>{" "}
      <div className={classes.accountSection}>
        {" "}
        <div
          className={`${classes.accountLabel} ${
            state.theme === "dark" ? classes.labelDark : classes.labelLight
          }`}
        >
          {" "}
          Conta Contábil{" "}
        </div>{" "}
        <div
          className={`${classes.accountValue} ${
            state.theme === "dark" ? classes.valueDark : classes.valueLight
          }`}
        >
          {" "}
          99999-9{" "}
        </div>{" "}
      </div>{" "}
      <div className={classes.dividerWrapper}>
        {" "}
        <Divider
          className={
            state.theme === "dark"
              ? {
                  alignSelf: "stretch",
                  backgroundColor: "var(--colors-neutral-high-lighter)",
                  height: "unset",
                  left: "unset",
                  top: "unset",
                }
              : {
                  alignSelf: "stretch",
                  height: "unset",
                  left: "unset",
                  top: "unset",
                }
          }
          color="low-lighter"
          orientation="vertical"
          size="small"
          theme="light"
        />{" "}
      </div>{" "}
      <div className={classes.accountSection}>
        {" "}
        <div
          className={`${classes.accountLabel} ${
            state.theme === "dark" ? classes.labelDark : classes.labelLight
          }`}
        >
          {" "}
          Area Atendida{" "}
        </div>{" "}
        <div
          className={`${classes.accountValue} ${
            state.theme === "dark" ? classes.valueDark : classes.valueLight
          }`}
        >
          {" "}
          UOR{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
function reducer(state: any, action: any) {
  switch (action) {
    case "mouse_enter":
      return { ...state, status: "hover" };
    case "mouse_leave":
      return { ...state, status: "active" };
  }
  return state;
}
ContBarCard.propTypes = {
  secondaryText: PropTypes.bool,
  title: PropTypes.bool,
  header: PropTypes.bool,
  headerLabel: PropTypes.string,
  titleLabel: PropTypes.string,
  secondaryContent: PropTypes.string,
  divider: PropTypes.bool,
  status: PropTypes.oneOf(["active", "hover"]),
  elevation: PropTypes.oneOf(["off"]),
  theme: PropTypes.oneOf(["dark", "light"]),
  progress: PropTypes.oneOf(["zero"]),
};
