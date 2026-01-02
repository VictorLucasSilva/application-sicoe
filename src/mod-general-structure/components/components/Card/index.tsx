import PropTypes from "prop-types";
import { type JSX, useReducer } from "react";
import type { CSSProperties } from "react";

import { IconCardContract } from "../../general-components/IconSvg/IconCardContract";
import classes from "./style.module.css";

interface Props {
  complementaryText?: boolean;
  title?: boolean;
  titleLabel?: string;
  complementaryContent?: string;
  elevation?: "off" | "on";
  theme?: "dark" | "light";
  className?: any;
  textClassName?: any;
  textClassNameOverride?: any;

  override?: JSX.Element;
}

export const MicroCard = ({
  complementaryText = true,
  title = true,
  titleLabel = "99",
  complementaryContent = "Status",
  elevation = "off",
  theme = "light",
  className,
  textClassName,
  override = <IconCardContract />,
  textClassNameOverride,
}: Props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, {
    elevation: elevation || "off",
    theme: theme || "light",
  });

  const containerExtraClass = typeof className === "string" ? className : "";
  const containerStyle: CSSProperties | undefined =
    className && typeof className === "object" ? className : undefined;

  const titleExtraClass = typeof textClassName === "string" ? textClassName : "";
  const titleStyle: CSSProperties | undefined =
    textClassName && typeof textClassName === "object" ? textClassName : undefined;

  const compExtraClass =
    typeof textClassNameOverride === "string" ? textClassNameOverride : "";
  const compStyle: CSSProperties | undefined =
    textClassNameOverride && typeof textClassNameOverride === "object"
      ? textClassNameOverride
      : undefined;

  return (
    <div
      className={`${classes.microCard} ${
        state.theme === "dark" ? classes.themeDark : classes.themeLight
      } ${state.elevation === "on" ? classes.elevationOn : classes.elevationOff} ${containerExtraClass}`}
      style={containerStyle}
      onMouseEnter={() => dispatch("mouse_enter")}
      onMouseLeave={() => dispatch("mouse_leave")}
    >
      {title && (
        <div className={classes.titleContainer}>
          <div
            className={`${classes.titleText} ${
              state.theme === "dark" ? classes.titleTextDark : classes.titleTextLight
            } ${titleExtraClass}`}
            style={titleStyle}
          >
            {titleLabel}
          </div>
        </div>
      )}

      <div className={classes.complementaryContainer}>
        {state.theme === "light" && <>{override}</>}
        {state.theme === "dark" && <div className={classes.iconPlaceholder} />}

        {complementaryText && (
          <div
            className={`${classes.complementaryText} ${
              state.theme === "dark"
                ? classes.complementaryTextDark
                : classes.complementaryTextLight
            } ${compExtraClass}`}
            style={compStyle}
          >
            {complementaryContent}
          </div>
        )}
      </div>
    </div>
  );
};

function reducer(state: any, action: any) {
  switch (action) {
    case "mouse_enter":
      return { ...state, elevation: "on" };
    case "mouse_leave":
      return { ...state, elevation: "off" };
    default:
      return state;
  }
}

MicroCard.propTypes = {
  complementaryText: PropTypes.bool,
  title: PropTypes.bool,
  titleLabel: PropTypes.string,
  complementaryContent: PropTypes.string,
  elevation: PropTypes.oneOf(["off", "on"]),
  theme: PropTypes.oneOf(["dark", "light"]),
};
