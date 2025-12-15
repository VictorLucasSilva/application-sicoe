// src/mod-general-structure/components/components/Modais/ModalConfirmation/ModalFooter/index.tsx
import { type JSX, type ReactNode } from "react";
import { Button } from "../../../../general-components/Button";
import { Divider } from "../../../../general-components/Divider";
import classes from "./style.module.css";

type ModalFooterProps = {
  className?: string;
  onConfirm?: () => void;
  children?: ReactNode;
  confirmButtonClassName?: string; // nova prop
};

export const ModalFooter = ({
  className,
  onConfirm,
  children,
  confirmButtonClassName,
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

        <div onClick={handleConfirmClick}>
          <Button
            className={`${classes.button} ${confirmButtonClassName ?? ""}`}
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
