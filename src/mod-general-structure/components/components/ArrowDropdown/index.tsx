// src/mod-general-structure/components/components/ArrowDropdown/index.tsx
import { type CSSProperties, type JSX } from "react";
import image from "../../../../../public/images/arrow_drop_down.svg";
import classes from "./style.module.css";

type Props = {
  className?: CSSProperties;
};

export const ArrowDropDown = ({ className }: Props): JSX.Element => {
  return (
    <div className={classes.container} style={className}>
      <img className={classes.image} alt="Vector" src={image} />
    </div>
  );
};
