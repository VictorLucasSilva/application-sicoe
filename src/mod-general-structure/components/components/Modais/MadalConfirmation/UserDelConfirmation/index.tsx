import { type JSX, type MouseEvent as ReactMouseEvent } from "react";
import { ModalHeader } from "../ModalHeader";
import { ModalScreen } from "../ModalScreen";
import { ModalFooter } from "../ModalFooter";
import classes from "./style.module.css";

type UserDelConfirmationProps = {
  onConfirm?: () => void;
  onClose?: () => void;
};

export const UserDelConfirmation = ({
  onConfirm,
  onClose,
}: UserDelConfirmationProps): JSX.Element => {
  const handleOverlayClick = (): void => {
    if (onClose) onClose();
  };

  const handleCardClick = (
    event: ReactMouseEvent<HTMLDivElement>,
  ): void => {
    event.stopPropagation();
  };

  return (
    <div className={classes.overlay} onClick={handleOverlayClick}>
      <div className={classes.modal} onClick={handleCardClick}>
      <ModalHeader>
        <span className={classes.redText}>Confirmar Ação</span>
      </ModalHeader>
        <ModalScreen />
        <ModalFooter onConfirm={onConfirm} 
        confirmButtonClassName={classes.dangerButton} />
      </div>
    </div>
  );
};
