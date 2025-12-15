// src/mod-general-structure/components/components/Modais/ModalConfirmation/UserRelConfirmation/index.tsx
import { type JSX } from "react";
import { ModalHeader } from "../../ModalBase/ModalHeader";
import { TriggerProcessScreen } from "../TriggerProcessScreen";
import { ModalFooter } from "../../ModalBase/ModalFooter";
import classes from "./style.module.css";

type UserRelConfirmationProps = {
  onConfirm?: () => void;
  onClose?: () => void;
};

export const ContractsTriggerProcess = ({
  onConfirm,
  onClose,
}: UserRelConfirmationProps): JSX.Element => {
  const handleOverlayClick = (): void => {
    if (onClose) onClose();
  };

  const handleCardClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    event.stopPropagation();
  };

  return (
    <div className={classes.overlay} onClick={handleOverlayClick}>
      <div className={classes.modal} onClick={handleCardClick}>
        <ModalHeader>Confirmar Ação</ModalHeader>
        <TriggerProcessScreen />
        <ModalFooter onConfirm={onConfirm} />
      </div>
    </div>
  );
};
