// src/mod-general-structure/components/components/PagerAssets/index.tsx
import { type CSSProperties, type JSX } from "react";
import { ChevronLeft } from "../ChevronLeft";
import { ChevronRight } from "../ChevronRight";
import classes from "./style.module.css";

type Props = {
  type:
    | "hover-page"
    | "continuation"
    | "default-page"
    | "selected-page"
    | "navigate-left"
    | "navigate-right";
  theme: "dark" | "light";
  className?: CSSProperties;
  dayClassName?: CSSProperties;
  text?: string;
};

// tamanho do “quadradinho” onde ficam as setas
const chevronSize: CSSProperties = {
  width: 24,
  height: 24,
};

export const PagerAssets = ({
  type,
  theme,
  className,
  dayClassName,
  text,
}: Props): JSX.Element => {
  // SETA ESQUERDA – só a seta, sem bolinha de fundo
  if (type === "navigate-left") {
    return (
      <div
        className={`${classes.nav} ${classes[theme]}`}
        style={className}
      >
        <ChevronLeft className={chevronSize} />
      </div>
    );
  }

  // SETA DIREITA – só a seta, sem bolinha de fundo
  if (type === "navigate-right") {
    return (
      <div
        className={`${classes.nav} ${classes[theme]}`}
        style={className}
      >
        <ChevronRight className={chevronSize} />
      </div>
    );
  }

  // conteúdo de texto das páginas / "..."
  let content = text;

  if (!content) {
    if (type === "continuation") {
      content = "...";
    } else if (type === "selected-page") {
      content = "1";
    } else if (type === "hover-page") {
      content = "3";
    } else {
      content = "2";
    }
  }

  // PÁGINAS NUMERADAS E "..."
  return (
    <div
      className={`${classes.container} ${classes[type]} ${classes[theme]}`}
      style={className}
    >
      <div
        className={`${classes.day} ${classes[`day-${type}`]} ${
          classes[theme]
        }`}
        style={dayClassName}
      >
        {content}
      </div>
    </div>
  );
};
