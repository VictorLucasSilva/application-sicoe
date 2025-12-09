import { type CSSProperties, type JSX } from "react";
import classes from "./styles.module.css";

type LogotipoProps = {
  application?: string;
  color?: string;
  className?: CSSProperties;  
  orientation?: string;
  size?: string;
  vector?: string;            
};

export const Logo = ({ className }: LogotipoProps): JSX.Element => {
  return (
    <div className={classes.container} style={className}>
      <img
        className={classes.image}
        alt="Vector"
        src="/icons/logo-yellow.svg"
      />
    </div>
  );
};
