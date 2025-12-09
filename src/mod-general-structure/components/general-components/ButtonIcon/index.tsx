// src/mod-general-structure/components/components/ButtonIcon/index.tsx
import { type JSX, type CSSProperties } from "react";
import { IconB } from "./IconB";
import classes from "./style.module.css";

interface Props {
  text?: string;
  className?: CSSProperties;      
  icon?: JSX.Element;             
  textClassName?: CSSProperties;  
}

export const ButtonIcon = ({
  text = "button",
  className,
  icon = (
    <IconB
      className={{
        height: 16,
        width: 16,
      }}
    />
  ),
  textClassName,
}: Props): JSX.Element => {
  return (
    <button className={classes.button} style={className}>
      {icon}
      <span className={classes.text} style={textClassName}>
        {text}
      </span>
    </button>
  );
};
