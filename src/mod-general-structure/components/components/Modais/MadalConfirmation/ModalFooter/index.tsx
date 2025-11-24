// src/mod-general-structure/components/components/Modais/ModalConfirmation/ModalFooter/index.tsx
import { type JSX, type ReactNode } from "react";
import { Button } from "../../../../general-components/Button";
import { Divider } from "../../../../general-components/Divider";
import classes from "./style.module.css";

type ModalFooterProps = {
  className?: string;
  onConfirm?: () => void;
  children?: ReactNode;
};

export const ModalFooter = ({
  className,
  onConfirm,
  children,
}: ModalFooterProps): JSX.Element => {
  const handleConfirmClick = (): void => {
    if (onConfirm) onConfirm();
  };

  return (
    <div className={classes.footer}>
      <Divider
        className={classes.divider}
        color="low-lighter"
        orientation="horizontal"
        size="small"
        theme="light"
      />

      <div className={`${classes.buttonContainer} ${className ?? ""}`}>
        {children}

        {/* wrapper cuidando do clique */}
        <div onClick={handleConfirmClick}>
          <Button
            className={classes.button}
            hierarchy="primary"
            icon="off"
            size="small"
            status="default"
            text="on"
            text1="CONFIRMAR"
            theme="light"
          />
        </div>
      </div>
    </div>
  );
};
