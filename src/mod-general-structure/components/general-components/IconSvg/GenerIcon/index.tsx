import { type CSSProperties, type JSX } from "react";
import classes from "./style.module.css";

type SvgComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

type IconProps = {
  src: SvgComponent;
  alt?: string;
  containerClassName?: string;
  svgClassName?: string;
  containerStyle?: CSSProperties;
  color?: string;
  size?: number;
};

export const Icon = ({
  src: Svg,
  alt,
  containerClassName,
  svgClassName,
  containerStyle,
  color = "currentColor",
  size = 24,
}: IconProps): JSX.Element => {const svgStyle: CSSProperties = {width: size, height: size, color, };

  return (
    <div
      className={`${classes.container} ${containerClassName}`}
      style={containerStyle}
      role={alt ? "img" : undefined}
      aria-label={alt}
    >
      <Svg className={`${classes.svg} ${svgClassName}`} style={svgStyle} />
    </div>
  );
};
