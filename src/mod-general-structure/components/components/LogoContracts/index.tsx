import { type CSSProperties } from "react";

type Props = {
  className?: CSSProperties; // na prática é um style extra
  color?: string;
  size?: number;
};

export const LogoContracts = ({
  className,
  size = 128,
}: Props) => {
  return (
    <img
      src="/images/LogoContracts.svg"   // vem de public/images
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
