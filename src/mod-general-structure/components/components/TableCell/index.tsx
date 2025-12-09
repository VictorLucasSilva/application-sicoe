import PropTypes from "prop-types";
import { type JSX } from "react";
import { Person } from "../Person";
import classes from "./style.module.css";

import button2 from "../../../assets/icons/icon-no-mod/no-mod-login-lock.svg";
import button from "../../../assets/icons/icon-no-mod/no-mod-login-lock.svg";
import caixa2 from "../../../assets/icons/icon-no-mod/no-mod-login-lock.svg";
import caixa from "../../../assets/icons/icon-no-mod/no-mod-login-lock.svg";
import image1 from "../../../assets/icons/icon-no-mod/no-mod-login-lock.svg";
import pequeno from "../../../assets/icons/icon-no-mod/no-mod-login-lock.svg";

interface Props {
  sort?: boolean;
  help?: boolean;
  avatarText?: boolean;
  title?: string;
  text?: string;
  secondaryText?: string;
  actionsTitle?: boolean;
  type:
    | "rating"
    | "icon"
    | "checkbox"
    | "button"
    | "actions-title"
    | "avatar"
    | "switch"
    | "progress-bar"
    | "hyperlink"
    | "text-2-lines"
    | "tag-label"
    | "text-1-line"
    | "empty"
    | "action-icons"
    | "radio-button"
    | "badge"
    | "header";
  spacing: "small" | "default";
  className?: any;
}

export const TableCell = ({
  //sort = false, 
  //help = false,
  //avatarText = false,
  title = "Título",
  text = "Texto",
  secondaryText = "",
  actionsTitle = true,
  type,
  spacing,
  className,
}: Props): JSX.Element => {
  return (
    <div
      className={`${classes.tableCell} ${classes[`type-${type}`]} ${
        classes[`spacing-${spacing}`]
      } ${className || ""}`}
    >
      {(type === "action-icons" ||
        type === "avatar" ||
        type === "badge" ||
        type === "button" ||
        type === "checkbox" ||
        type === "header" ||
        type === "hyperlink" ||
        type === "progress-bar" ||
        type === "radio-button" ||
        type === "rating" ||
        type === "switch" ||
        type === "tag-label" ||
        type === "text-1-line") && (
        <div
          className={`${classes.innerContainer} ${
            classes[`innerContainer-${type}`] || ""
          }`}
        >
          {type === "header" && <>{title}</>}

          {type === "text-1-line" && <>{text}</>}

          {type === "avatar" && (
            <>
              <img
                className={classes.avatarImage}
                alt="Avatar imagem"
                src={spacing === "small" ? image1 : pequeno}
              />
              <div className={classes.avatarBadge} />
            </>
          )}

          {(type === "badge" ||
            type === "button" ||
            type === "checkbox" ||
            type === "hyperlink" ||
            type === "radio-button" ||
            type === "switch" ||
            type === "tag-label") && (
            <div
              className={`${classes.contentWrapper} ${
                classes[`contentWrapper-${type}`] || ""
              }`}
            >
              {type === "badge" && <>99+</>}

              {["button", "switch"].includes(type) && (
                <div
                  className={`${classes.buttonSwitch} ${
                    classes[`buttonSwitch-${type}`] || ""
                  }`}
                >
                  {type === "button" && <>BUTTON</>}
                </div>
              )}

              {["checkbox", "radio-button"].includes(type) && (
                <img
                  className={`${classes.checkboxRadio} ${
                    classes[`checkboxRadio-${type}`] || ""
                  }`}
                  alt="Button"
                  src={
                    spacing === "small" && type === "radio-button"
                      ? button2
                      : spacing === "default" && type === "checkbox"
                      ? caixa
                      : spacing === "small" && type === "checkbox"
                      ? caixa2
                      : button
                  }
                />
              )}

              {type === "hyperlink" && <>Link</>}

              {type === "tag-label" && <>Tag Label</>}
            </div>
          )}

          {type === "action-icons" && (
            <>
              <Person className={classes.iconPlaceholder} />
              <Person className={classes.iconPlaceholder} />
              <Person className={classes.iconPlaceholder} />
            </>
          )}

          {type === "rating" && (
            <>
              <div
                className={`${classes.ratingStar} ${
                  classes[`ratingStar-1-${spacing}`]
                }`}
              />
              <div
                className={`${classes.ratingStar} ${
                  classes[`ratingStar-2-${spacing}`]
                }`}
              />
              <div
                className={`${classes.ratingStar} ${
                  classes[`ratingStar-3-${spacing}`]
                }`}
              />
              <div
                className={`${classes.ratingStar} ${
                  classes[`ratingStar-4-${spacing}`]
                }`}
              />
              <div
                className={`${classes.ratingStar} ${
                  classes[`ratingStar-5-${spacing}`]
                }`}
              />
            </>
          )}

          {type === "progress-bar" && (
            <>
              <div className={classes.progressPercentage}>50%</div>
              <div className={classes.progressBarContainer}>
                <div className={classes.progressBarBackground} />
                <div className={classes.progressBarFill} />
              </div>
            </>
          )}
        </div>
      )}

      {type === "text-2-lines" && (
        <div
          className={`${classes.innerContainer} ${classes.innerContainerText2}`}
        >
          <div className={classes.text2LinesMain}>{text}</div>
          <div className={classes.text2LinesSecondary}>{secondaryText}</div>
        </div>
      )}

      {type === "icon" && <Person className={classes.iconPlaceholder} />}

      {type === "actions-title" && actionsTitle && (
        <div className={classes.actionsTitleText}>Ações</div>
      )}
    </div>
  );
};

TableCell.propTypes = {
  sort: PropTypes.bool,
  help: PropTypes.bool,
  avatarText: PropTypes.bool,
  title: PropTypes.string,
  text: PropTypes.string,
  secondaryText: PropTypes.string,
  actionsTitle: PropTypes.bool,
  type: PropTypes.oneOf([
    "rating",
    "icon",
    "checkbox",
    "button",
    "actions-title",
    "avatar",
    "switch",
    "progress-bar",
    "hyperlink",
    "text-2-lines",
    "tag-label",
    "text-1-line",
    "empty",
    "action-icons",
    "radio-button",
    "badge",
    "header",
  ]),
  spacing: PropTypes.oneOf(["small", "default"]),
};
