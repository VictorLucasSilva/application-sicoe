import { type JSX } from "react";
import type React from "react";

import { Button } from "../../../../general-components/Button";
import { Divider } from "../../../../general-components/Divider";

import classes from "./style.module.css";

type ModalWriteNewProcessProps = {
  onClose?: () => void;
  onNext?: () => void;
};

export const ModalWriteNewProcess = ({
  onClose,
  onNext,
}: ModalWriteNewProcessProps): JSX.Element => {
  const handleOverlayClick = (): void => {
    if (onClose) onClose();
  };

  const handleCardClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    event.stopPropagation();
  };

  const handleNextClick = (): void => {
    if (onNext) onNext();
  };

  return (
    <div className={classes.overlay} onClick={handleOverlayClick}>
      <div className={classes.modal} onClick={handleCardClick}>
        <header className={classes.header}>
          <div className={classes.headerTop}>
            <div className={classes.title}>Novo Processo</div>

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
            size="medium"
            theme="light"
          />
        </header>
        <div className={classes.content}>
          <div className={classes.infoContractNewProcess}>
            <div className={classes.sectionInfoContract}>
              <div className={classes.supplier}>Fornecedor</div>
              <div className={classes.subSupplier}>
                BB Tecnologia e Serviços
              </div>
            </div>
            <div className={classes.sectionInfoContract}>
              <div className={classes.dgco}>DGCO</div>
              <div className={classes.subDgco}>0001/2025</div>
            </div>
            <div className={classes.sectionInfoContract}>
              <div className={classes.dataExpire}>Data de Vencimento</div>
              <div className={classes.subDataExpire}>12/05/2026</div>
            </div>
          </div>
          <div className={classes.divider}></div>
          <div className={classes.userBlock}>
            <div className={classes.userLabel}>Definição do Processo</div>
            <div className={classes.textField}>
              <div className={classes.textFieldLabel}>Só um item pode ser selecionado</div>
              <div className={classes.chipsRow}>
                <button className={classes.chip}>Aditivo</button>
                <button className={classes.chip}>Contratação</button>
                <button className={classes.chip}>Convocação de Remanescente</button>
                <button className={classes.chip}>Acionamentos de Ata de Registro de Preço</button>
              </div>
            </div>
          </div>
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
            size="medium"
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
              text1="Próximo"
              theme="light"
              onClick={handleNextClick}
            />
          </div>
        </footer>
      </div>
    </div>
  );
};
