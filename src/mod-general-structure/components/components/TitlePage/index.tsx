import PropTypes from "prop-types";
import { type JSX } from "react";
import { Iconer } from "../IconPage";
import classes from "./style.module.css";
import image from "./image.svg";
interface Props {
  text: string;
  theme: "dark" | "light";
  className?: any;
  groupClassName?: any;
  polygon: string;
  iconerSizeMediumColorClassName?: any;
  divClassName?: any;
}
export const SectionTitle = ({
  text = "Section Title",
  theme,
  className,
  groupClassName,
  polygon = "polygon-11.svg",
  iconerSizeMediumColorClassName,
  divClassName,
}: Props): JSX.Element => {
  return (
    <div
      className={`${classes.container} ${
        theme === "dark" ? classes.containerDark : classes.containerLight
      } ${className || ""}`}
    >
      {" "}
      <div
        className={`${classes.group} ${
          theme === "dark" ? classes.groupDark : classes.groupLight
        } ${groupClassName || ""}`}
      >
        {" "}
        <img
          className={`${classes.polygon} ${
            theme === "light" ? classes.polygonLight : classes.polygonDark
          }`}
          alt="Polygon"
          src={theme === "light" ? polygon : image}
        />{" "}
        {theme === "light" && (
          <Iconer
            className={iconerSizeMediumColorClassName}
            color="brand-primary"
            size="medium"
          />
        )}{" "}
        {theme === "dark" && <div className={classes.iconDark} />}{" "}
      </div>{" "}
      <div
        className={`${classes.textWrapper} ${
          theme === "dark" ? classes.textWrapperDark : classes.textWrapperLight
        } ${divClassName || ""}`}
      >
        {" "}
        {text}{" "}
      </div>{" "}
    </div>
  );
};
SectionTitle.propTypes = {
  text: PropTypes.string,
  theme: PropTypes.oneOf(["dark", "light"]),
  polygon: PropTypes.string,
};
