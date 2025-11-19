// src/mod-general-structure/components/components/ButtonIcon/IconB/index.tsx
import { type JSX, type CSSProperties } from "react";
import classes from "./style.module.css";
import vector from "../../../../../../public/images/chevron_left.svg";
import buttonAdd from "../../../../assets/images/add.svg"

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

export const IconX = ({ className }: Props): JSX.Element => {
  return (
    <div className={classes.container} style={className}>
      <img className={classes.image} alt="Ícone botão" src={buttonAdd} />
    </div>
  );
};