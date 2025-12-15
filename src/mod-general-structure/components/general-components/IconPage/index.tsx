// src/mod-general-structure/components/components/IconPage/index.tsx
import PropTypes from "prop-types";
import { type JSX } from "react";
import classes from "./style.module.css";

import polygonSvg from "../../../../../public/icons/polygon.svg";

interface IconerProps {
  size: "large" | "x-large" | "medium" | "small";
  color:
    | "low"
    | "high"
    | "highlight"
    | "brand-primary"
    | "brand-primary-lighter"
    | "brand-secondary"
    | "brand-primary-1"
    | "brand-primary-2"
    | "brand-primary-cont-1"
    | "brand-primary-cont-2";
  className?: any;
}

export const Iconer = ({ size, color, className }: IconerProps): JSX.Element => {
  const getClassNames = () => {
    const classNames = [classes.iconer];
    classNames.push(classes[`size-${size}`]);
    classNames.push(classes[`variant-${size}-${color}`]);
    return classNames.join(" ");
  };

  return <div className={`${getClassNames()} ${className || ""}`} />;
};

Iconer.propTypes = {
  size: PropTypes.oneOf(["large", "x-large", "medium", "small"]),
  color: PropTypes.oneOf([
    "low",
    "high",
    "highlight",
    "brand-primary",
    "brand-primary-1",
    "brand-primary-2",
    "brand-primary-cont-1",
    "brand-primary-cont-2",
    "brand-primary-lighter",
    "brand-secondary",
  ]),
};

interface TitleIconProps {
  className?: string;
}

export const AuditTitleIcon = ({ className }: TitleIconProps): JSX.Element => {
  return (
    <div className={`${classes.titleIconWrapper} ${className || ""}`}>
      <img src={polygonSvg} alt="" className={classes.titlePolygon} />
      <Iconer
        size="medium"
        color="brand-primary"
        className={classes.titleIcon}
      />
    </div>
  );
};

export const EmailTitleIcon = ({ className }: TitleIconProps): JSX.Element => {
  return (
    <div className={`${classes.titleIconWrapper} ${className || ""}`}>
      <img src={polygonSvg} alt="" className={classes.titlePolygon} />
      <Iconer
        size="medium"
        color="brand-primary-1"
        className={classes.titleIcon}
      />
    </div>
  );
};

export const UserTitleIcon = ({ className }: TitleIconProps): JSX.Element => {
  return (
    <div className={`${classes.titleIconWrapper} ${className || ""}`}>
      <img src={polygonSvg} alt="" className={classes.titlePolygon} />
      <Iconer
        size="medium"
        color="brand-primary-2"
        className={classes.titleIcon}
      />
    </div>
  );
};

export const ContractHomeTitle1 = ({ className }: TitleIconProps): JSX.Element => {
  return (
    <div className={`${classes.titleIconWrapper} ${className || ""}`}>
      <img src={polygonSvg} alt="" className={classes.titlePolygon} />
      <Iconer
        size="medium"
        color="brand-primary-cont-1"
        className={classes.titleIcon}
      />
    </div>
  );
};

export const ContractHomeTitle2 = ({ className }: TitleIconProps): JSX.Element => {
  return (
    <div className={`${classes.titleIconWrapper} ${className || ""}`}>
      <img src={polygonSvg} alt="" className={classes.titlePolygon} />
      <Iconer
        size="medium"
        color="brand-primary-cont-2"
        className={classes.titleIcon}
      />
    </div>
  );
};