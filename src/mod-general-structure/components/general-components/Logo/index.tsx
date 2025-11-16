import { type CSSProperties, type JSX } from "react";
import classes from "./styles.module.css";

type LogotipoProps = {
  application?: string;
  color?: string;
  className?: CSSProperties;  // você passa um objeto de estilo
  orientation?: string;
  size?: string;
  vector?: string;            // por enquanto não usamos, se quiser depois ajustamos
};

export const Logo = ({ className }: LogotipoProps): JSX.Element => {
  return (
    <div className={classes.container} style={className}>
      <img
        className={classes.image}
        alt="Vector"
        src="/images/Logotipo.svg"   // asset em public/images
      />
    </div>
  );
};
