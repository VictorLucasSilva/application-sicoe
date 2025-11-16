// src/mod-general-structure/components/components/ButtonIcon/IconB/index.tsx
import { type JSX, type CSSProperties } from "react";
import classes from "./style.module.css";
import vector from "../../../../assets/images/Lock.svg";

type Props = {
  className?: CSSProperties; 
};

export const IconB = ({ className }: Props): JSX.Element => {
  return (
    <div className={classes.container} style={className}>
      <img className={classes.image} alt="Ícone botão" src={vector} />
    </div>
  );
};
