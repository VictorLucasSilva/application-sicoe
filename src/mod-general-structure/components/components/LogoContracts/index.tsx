import { type CSSProperties } from "react";

type Props = {
  className?: CSSProperties;
  color?: string;
  size?: number;
};

export const LogoContracts = ({
  className,
  color = "#465EFF",   // azul do layout
  size = 128,
}: Props) => {
  return (
    <svg
      style={className}
      width={size}
      height={size}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Monitoramento de Contratos"
    >
      {/* moldura nos cantos */}
      <g stroke={color} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 44V20h24" />
        <path d="M92 20h24v24" />
        <path d="M116 84v24H92" />
        <path d="M36 108H12V84" />
      </g>

      {/* pena/caneta */}
      <path d="M72 40l16 16-28 28H44V84z" fill={color} />
      <path d="M44 84h16" stroke={color} strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
};
