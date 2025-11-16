import { type CSSProperties } from "react";

type Props = {
  className?: CSSProperties; // style extra
  color?: string;
  size?: number;
};

export const LogoEstablishment = ({
  className,
  size = 128,
}: Props) => {
  return (
    <img
      src="/images/LogoEstablishment.svg"  // vem de public/images
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
