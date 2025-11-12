import { type CSSProperties } from "react";

type Props = {
  className?: CSSProperties;
  color?: string;
  size?: number;
};

export const LogoEstablishment = ({
  className,
  color = "#465EFF",
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
      aria-label="Controle de Estabelecimentos"
    >
      {/* prédio */}
      <rect x="18" y="24" width="48" height="64" rx="6" stroke={color} strokeWidth="8"/>
      <g fill={color}>
        <rect x="26" y="32" width="8" height="8" rx="2"/>
        <rect x="42" y="32" width="8" height="8" rx="2"/>
        <rect x="26" y="48" width="8" height="8" rx="2"/>
        <rect x="42" y="48" width="8" height="8" rx="2"/>
        <rect x="26" y="64" width="8" height="8" rx="2"/>
        <rect x="42" y="64" width="8" height="8" rx="2"/>
      </g>

      {/* linhas de base */}
      <path d="M18 96h92" stroke={color} strokeWidth="8" strokeLinecap="round"/>
      <path d="M64 108h46" stroke={color} strokeWidth="8" strokeLinecap="round"/>

      {/* lápis */}
      <g transform="translate(68,60)">
        <rect x="0" y="22" width="34" height="10" rx="5" transform="rotate(-20)" fill={color}/>
        <polygon points="38,20 48,24 40,32" fill={color}/>
      </g>
    </svg>
  );
};
