import PropTypes from "prop-types";
import { type JSX } from "react";
import { IconClear } from "../../general-components/IconSvg/IconClear"
import { ClearWrapper } from "./ClearWrapper";
import { FilterList } from "./FilterList";
import classes from "./style.module.css";
interface Props {
  type: "action" | "choice" | "filter" | "table" | "input";
  status: "active" | "selected" | "focus" | "hover" | "disabled";
  avatar: "off" | "on";
  icon: "off" | "on";
  theme: "dark" | "light";
  className: any;
  text: string;
}
export const ChipOld = ({
  type,
  status,
  avatar,
  icon,
  theme,
  className,
  text = "Ativo",
}: Props): JSX.Element => {
  const chipClasses = [
    classes.chip,
    classes[`chip--${type}`],
    classes[`chip--${status}`],
    classes[`chip--${theme}`],
    classes[`chip--avatar-${avatar}`],
    classes[`chip--icon-${icon}`],
    classes[`chip--${type}-${status}-${theme}`],
    classes[`chip--${type}-${status}-${theme}-${avatar}-${icon}`],
  ]
    .filter(Boolean)
    .join(" ");
  const textClasses = [
    classes.text,
    classes[`text--${type}`],
    classes[`text--${status}`],
    classes[`text--${theme}`],
    classes[`text--${type}-${status}-${theme}`],
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={chipClasses}>
      {" "}
      {(avatar === "on" ||
        (icon === "off" && status === "selected" && type === "filter") ||
        (icon === "on" && status === "selected") ||
        (icon === "on" && type === "action") ||
        (icon === "on" && type === "input") ||
        (status === "active" && theme === "dark" && type === "table") ||
        (status === "focus" && type === "table") ||
        (status === "hover" && type === "table")) && (
        <div
          className={
            avatar === "on"
              ? classes.avatarPlaceholder
              : classes.iconPlaceholder
          }
        />
      )}{" "}
      {theme === "light" && type === "table" && status === "active" && (
        <FilterList className={classes.filterListIcon} />
      )}{" "}
      <div className={textClasses}>
        {" "}
        {type === "table" && status === "selected" && <>Ocultar filtros</>}{" "}
        {type === "table" && ["active", "focus", "hover"].includes(status) && (
          <>Exibir filtros</>
        )}{" "}
        {((status === "focus" && type === "action") ||
          (status === "focus" && type === "choice") ||
          (status === "focus" && type === "filter") ||
          (status === "focus" && type === "input")) && <>Foco</>}{" "}
        {((status === "hover" && type === "action") ||
          (status === "hover" && type === "choice") ||
          (status === "hover" && type === "filter") ||
          (status === "hover" && type === "input")) && <>Hover</>}{" "}
        {type === "input" &&
          avatar === "off" &&
          status === "active" &&
          icon === "off" && <>{text}</>}{" "}
        {type === "input" && icon === "on" && <>Com ícone</>}{" "}
        {type === "input" && avatar === "on" && <>Com avatar</>}{" "}
        {status === "active" && type === "action" && <>Normal</>}{" "}
        {status === "selected" && ["choice", "filter"].includes(type) && (
          <>Selecionado</>
        )}{" "}
        {status === "disabled" && <>Desativado</>}{" "}
        {status === "active" && ["choice", "filter"].includes(type) && (
          <>Não selecionado</>
        )}{" "}
      </div>{" "}
      {theme === "light" && type === "table" && status === "active" && (
        <div className={classes.badge}>
          {" "}
          <div className={classes.badgeText}>1</div>{" "}
        </div>
      )}{" "}
      {theme === "light" &&
        type === "input" &&
        icon === "off" &&
        avatar === "off" &&
        status === "active" && <IconClear className={classes.clearIcon} />}{" "}
      {((status === "active" && theme === "dark" && type === "table") ||
        (status === "focus" && type === "table") ||
        (status === "hover" && type === "table") ||
        (status === "selected" && type === "table")) && (
        <div className={classes[`tablePlaceholder--${theme}-${status}`]} />
      )}{" "}
      {((avatar === "off" &&
        icon === "off" &&
        status === "active" &&
        theme === "dark" &&
        type === "input") ||
        (avatar === "on" && type === "input") ||
        (icon === "on" && type === "input") ||
        (status === "focus" && type === "input") ||
        (status === "hover" && type === "input")) && <ClearWrapper />}{" "}
    </div>
  );
};
ChipOld.propTypes = {
  type: PropTypes.oneOf(["action", "choice", "filter", "table", "input"]),
  status: PropTypes.oneOf(["active", "selected", "focus", "hover", "disabled"]),
  avatar: PropTypes.oneOf(["off", "on"]),
  icon: PropTypes.oneOf(["off", "on"]),
  theme: PropTypes.oneOf(["dark", "light"]),
  text: PropTypes.string,
};
