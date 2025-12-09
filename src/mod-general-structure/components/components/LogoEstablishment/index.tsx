import { type CSSProperties } from "react";

type Props = {
  className?: CSSProperties; 
  color?: string;
  size?: number;
};

export const LogoEstablishment = ({
  className,
  size = 128,
}: Props) => {
  return (
    <img
      src="/icons/logo-establishment.svg" 
      alt="Controle de Estabelecimentos"
      style={{
        width: size,
        height: size,
        display: "block",
        ...(className ?? {}),
      }}
      aria-label="Controle de Estabelecimentos"
    />
  );
};
