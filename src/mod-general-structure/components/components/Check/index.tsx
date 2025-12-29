import { type JSX } from "react";
import check from "../../../assets/icons/icon-contract/contract-home-check.svg";
import classes from "./style.module.css";

type CheckProps = {
  className?: string;
  opacity?: string;

  bgColor?: string;
  borderColor?: string;
  textColor?: string;

  number?: string;
};

export const Check = ({ className, opacity, bgColor, borderColor }: CheckProps): JSX.Element => {
  return (
    <div
      className={`${classes.container} ${className ?? ""}`}
      style={{
        opacity: opacity ? Number(opacity) : undefined,
        backgroundColor: bgColor,
        borderColor: borderColor ?? bgColor,
      }}
    >
      <img className={classes.image} alt="Vector" src={check} />
    </div>
  );
};

export const CheckNumber = ({
  className,
  number,
  opacity,
  bgColor,
  borderColor,
  textColor,
}: CheckProps): JSX.Element => {
  return (
    <div
      className={`${classes.containerNum} ${className ?? ""}`}
      style={{
        opacity: opacity ? Number(opacity) : undefined,
        backgroundColor: bgColor,
        borderColor: borderColor,
      }}
    >
      <div className={classes.text} style={{ color: textColor }}>
        {number}
      </div>
    </div>
  );
};
