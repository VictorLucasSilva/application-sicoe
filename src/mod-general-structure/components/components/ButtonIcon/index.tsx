// src/mod-general-structure/components/components/ButtonIcon/index.tsx
import { type JSX, type CSSProperties } from "react";
import { IconB } from "./IconB";
import classes from "./style.module.css";

interface Props {
  text?: string;
  className?: CSSProperties;      // estilos inline opcionais para o botão
  icon?: JSX.Element;             // ícone opcional
  textClassName?: CSSProperties;  // estilos inline opcionais para o texto
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
