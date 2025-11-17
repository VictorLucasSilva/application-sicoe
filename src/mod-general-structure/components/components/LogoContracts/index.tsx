import { type CSSProperties } from "react";

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
      src="/images/LogoContracts.svg"
      alt="Monitoramento de Contratos"
      style={{
        width: size,
        height: size,
        display: "block",
        ...(className ?? {}),
      }}
      aria-label="Monitoramento de Contratos"
    />
  );
};
