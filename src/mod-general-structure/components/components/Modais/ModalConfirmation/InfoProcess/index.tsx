import { type JSX } from "react";
import type React from "react";

import { Button } from "../../../../general-components/Button";
import { Divider } from "../../../../general-components/Divider";
import { Check } from "../../../Check";
import { Text } from "../../../Text";
import { Timeline } from "../../../Timeline";

import classes from "./style.module.css";

type ModalInfoProcessProps = {
  onClose?: () => void;
  onSave?: () => void;
};

export const ModalInfoProcess = ({
  onClose,
  onSave,
}: ModalInfoProcessProps): JSX.Element => {
  const handleOverlayClick = (): void => {
    if (onClose) onClose();
  };

  const handleCardClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    event.stopPropagation();
  };

  const handleSaveClick = (): void => {
    if (onSave) onSave();
  };

  return (
    <div className={classes.overlay} onClick={handleOverlayClick}>
      <div className={classes.modal} onClick={handleCardClick}>
        <header className={classes.header}>
          <div className={classes.headerTop}>
            <div className={classes.title}>Acesso aos Estabelecimentos</div>

            <button
              type="button"
              className={classes.closeButton}
              aria-label="Fechar modal"
              onClick={onClose}
            >
              ×
            </button>
          </div>

          <Divider
            className={{
              alignSelf: "stretch",
              left: "unset",
              top: "unset",
              width: "100%",
            }}
            color="low-lighter"
            orientation="horizontal"
            size="small"
            theme="light"
          />
        </header>

        <div className={classes.content}>
          {" "}
          <Text
            className={{
              alignSelf: "stretch",
              flex: "0 0 auto",
              left: "unset",
              top: "unset",
              width: "100%",
            }}
            color="low-primary"
            size="x-large"
            text="Etapas de Renovação"
            type="subtitle"
            weight="semibold"
          />{" "}
          <Timeline
            className={{
              alignSelf: "stretch",
              display: "flex",
              flex: "0 0 auto",
              left: "unset",
              marginBottom: "-24.00px",
              top: "unset",
              width: "100%",
            }}
            icon="on"
            override={<Check />}
            side="right"
            theme="light"
          />{" "}
        </div>

        <footer className={classes.footer}>
          <Divider
            className={{
              alignSelf: "stretch",
              left: "unset",
              top: "unset",
              width: "100%",
            }}
            color="low-lighter"
            orientation="horizontal"
            size="small"
            theme="light"
          />
          <div className={classes.footerButtons}>
            <Button
              className={{ flex: "0 0 auto", left: "unset", top: "unset" }}
              hierarchy="primary"
              icon="off"
              size="small"
              status="default"
              text="on"
              text1="SALVAR"
              theme="light"
              onClick={handleSaveClick}
            />
          </div>
        </footer>
      </div>
    </div>
  );
};
