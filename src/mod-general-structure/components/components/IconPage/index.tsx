// src/mod-general-structure/components/components/IconPage/index.tsx
import PropTypes from "prop-types";
import { type JSX } from "react";
import classes from "./style.module.css";

import polygonSvg from "../../../../../public/images/Polygon 11.svg";

interface IconerProps {
  size: "large" | "x-large" | "medium" | "small";
  color:
    | "low"
    | "high"
    | "highlight"
    | "brand-primary"
    | "brand-primary-lighter"
    | "brand-secondary"
    | "brand-primary-1";
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
        color="brand-primary-1"
        className={classes.titleIcon}
      />
    </div>
  );
};

// Exemplo para futuras páginas (é só copiar e trocar o color ou o CSS):
// export const ContractsTitleIcon = ({ className }: TitleIconProps): JSX.Element => (
//   <div className={`${classes.titleIconWrapper} ${className || ""}`}>
//     <img src={polygonSvg} alt="" className={classes.titlePolygon} />
//     <Iconer
//       size="medium"
//       color="brand-secondary"
//       className={classes.titleIcon}
//     />
//   </div>
// );
