import { type JSX, type ReactNode } from "react";
import classes from "./style.module.css";
import { SpinnerLoading } from "../../../../general-components/LoadingSpinner"

type ModalScreenProps = {
  children?: ReactNode;
  className?: string;
};

export const ModalScreen = ({
  children,
  className,
}: ModalScreenProps): JSX.Element => {
  return (
    <div className={`${classes.container} ${className ?? ""}`}>
      <div className={classes.content}>
        <p className={classes.text}>
          Conteúdo da modal com exemplo de duas linhas de texto em uma modal de
          seis colunas. Botão crítico como alternativa.
        </p>
        {children}
      </div>
    </div>
  );
};

export const ModalScreenLoading = (): JSX.Element => {
  return (
    <div className={classes.container}>
      <SpinnerLoading
        animation="top"
        className={{
          height: "48px",
          left: "unset",
          top: "unset",
          width: "48px",
        }}
        logotipoInternalLogotipoInternalClassName={{
          backgroundImage: "url(vector-2.svg)",
          left: "calc(50.00% - 26px)",
          position: "absolute",
          top: "calc(50.00% - 8px)",
          transform: "rotate(90.00deg)",
        }}
        progress="progress-2.svg"
        progressClassName={{ backgroundColor: "var(--brandprimarypure)" }}
        size="large"
        theme="light"
        type="spinner"
      />
    </div>
  );
};
