import PropTypes from "prop-types";
import { type JSX, type CSSProperties, useReducer } from "react";
import { LogoContracts } from "../LogoContracts";
import classes from "./styles.module.css";
import { useNavigate } from "react-router-dom";

interface Props {
  title?: boolean;
  titleLabel?: string;
  secondaryText?: boolean;
  secondaryContent?: string;
  status?: "active" | "hover";
  theme?: "dark" | "light";
  className?: CSSProperties;
  icon?: JSX.Element;
  textClassName?: CSSProperties;
  textClassNameOverride?: CSSProperties;
  onClick?: () => void;  
}

export const CardHome = ({
  title = true,
  titleLabel = "Title",
  secondaryText = true,
  secondaryContent = "Texto secundário",
  status,
  theme,
  className,
  icon = (
    <LogoContracts
      className={{ height: "128px", width: "128px", position: "relative" }}
      color="#465EFF"
    />
  ),
  onClick,
  textClassName,
  textClassNameOverride,
}: Props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, {
    status: status || "active",
    theme: theme || "light",
  });
  const navigate = useNavigate(); 
  const handleClick = () => { 
    if (onClick) { onClick(); } 
    else { navigate("");
    }
  };

  return (
    <div
      className={`${classes.moduleCard} ${
        state.theme === "dark" ? classes.themeDark : classes.themeLight
      } ${state.status === "hover" ? classes.statusHover : classes.statusActive}`}
      style={className}
      onMouseEnter={() => dispatch("mouse_enter")}
      onMouseLeave={() => dispatch("mouse_leave")}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      {icon}
      <div className={classes.spacer} />
      {title && (
        <div
          className={`${classes.titleText} ${
            state.theme === "dark" ? classes.titleDark : classes.titleLight
          }`}
          style={textClassName}
        >
          {titleLabel}
        </div>
      )}
      {secondaryText && (
        <div
          className={`${classes.secondaryText} ${
            state.theme === "dark" ? classes.secondaryDark : classes.secondaryLight
          }`}
          style={textClassNameOverride}
        >
          {secondaryContent}
        </div>
      )}
    </div>
  );
};

function reducer(state: any, action: any) {
  switch (action) {
    case "mouse_enter": return { ...state, status: "hover" };
    case "mouse_leave": return { ...state, status: "active" };
    default: return state;
  }
}

CardHome.propTypes = {
  title: PropTypes.bool,
  titleLabel: PropTypes.string,
  secondaryText: PropTypes.bool,
  secondaryContent: PropTypes.string,
  status: PropTypes.oneOf(["active", "hover"]),
  theme: PropTypes.oneOf(["dark", "light"]),
};
