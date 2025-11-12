import { type CSSProperties } from "react";
import svgimagem from "../../../../../public/images/LogoContracts.svg";

type Props = {
  className?: CSSProperties; 
  color?: string;             
  size?: number;              
};

export const LogoContracts = ({
  className,
  size = 128,
}: Props) => {
  return (
    <img
      src={svgimagem}
      alt="Monitoramento de Contratos"
      style={{
        width: size,
        height: size,
        display: "block",
        ...className,          
      }}
      aria-label="Monitoramento de Contratos"
    />
  );
};