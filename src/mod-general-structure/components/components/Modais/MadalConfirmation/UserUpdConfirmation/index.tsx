import { type JSX } from "react";
import { ModalHeader } from "../ModalHeader";
import { ModalScreen } from "../ModalScreen";
import { ModalFooter } from "../ModalFooter";
import classes from "./style.module.css";

type UserUpdConfirmationProps = {
  onConfirm?: () => void;
  onClose?: () => void;
};

export const UserUpdConfirmation = ({
  onConfirm,
  onClose,
}: UserUpdConfirmationProps): JSX.Element => {
  const handleOverlayClick = (): void => {
    if (onClose) onClose();
  };

  const handleModalClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    event.stopPropagation();
  };

  return (
    <div className={classes.overlay} onClick={handleOverlayClick}>
      <div className={classes.modal} onClick={handleModalClick}>
        <ModalHeader>Confirmar Ação</ModalHeader>
        <ModalScreen />
        <ModalFooter onConfirm={onConfirm} />
      </div>
    </div>
  );
};
