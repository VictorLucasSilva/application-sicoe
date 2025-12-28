import { type JSX } from "react";
import type React from "react";

import { Button } from "../../../../general-components/Button";
import { Divider } from "../../../../general-components/Divider";
import { ContractStepsProgress } from "../../../ContractStepsProgress";
import { Text } from "../../../Text";

import classes from "./style.module.css";

type ModalInfoContractProps = {
  onClose?: () => void;
  onSave?: () => void;
  onStartProcess?: () => void;

  processCta?: "start" | "details";
  onOpenProcessDetails?: () => void;
};

export const ModalInfoContract = ({
  onClose,
  onSave,
  onStartProcess,
  processCta = "start",
  onOpenProcessDetails,
}: ModalInfoContractProps): JSX.Element => {

  const handlePrimaryClick = (): void => {
    if (processCta === "details") {
      onOpenProcessDetails?.();
      return;
    }
    onStartProcess?.();
  };

  const handleOverlayClick = (): void => {
    if (onClose) onClose();
  };

  const handleCardClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
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
            <div className={classes.title}>Contrato</div>

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
            text="Informações do Contrato"
            type="subtitle"
            weight="semibold"
          />

          <div className={classes.infoSection}>
            <div className={classes.infoBlock}>
              <div className={classes.infoItem}>
                <div className={classes.infoItemContent}>
                  <div className={classes.infoRow}>
                    <div className={classes.infoColumn}>
                      <Text
                        className={{
                          alignSelf: "stretch",
                          flex: "0 0 auto",
                          left: "unset",
                          top: "unset",
                          width: "100%",
                        }}
                        color="low-primary"
                        size="medium"
                        text="Texto primário"
                        type="text"
                        weight="semibold"
                      />
                    </div>
                    <div className={classes.infoValueEnd}>
                      <Text
                        className={{
                          alignItems: "flex-end",
                          display: "inline-flex",
                          flex: "0 0 auto",
                          left: "unset",
                          top: "unset",
                          width: "unset",
                        }}
                        color="low-primary"
                        size="medium"
                        text="Valor"
                        textClassName={{
                          alignSelf: "unset",
                          textAlign: "right",
                          whiteSpace: "nowrap",
                          width: "fit-content",
                        }}
                        type="text"
                        weight="regular"
                      />
                    </div>
                  </div>

                  <div className={classes.infoRow}>
                    <div className={classes.infoColumn}>
                      <Text
                        className={{
                          alignSelf: "stretch",
                          height: "24px",
                          left: "unset",
                          top: "unset",
                          width: "100%",
                        }}
                        color="low-secondary"
                        size="small"
                        text="Texto secundário"
                        type="text"
                        weight="regular"
                      />
                    </div>
                    <div className={classes.infoValueStart}>
                      <Text
                        className={{
                          alignItems: "flex-end",
                          display: "inline-flex",
                          flex: "0 0 auto",
                          left: "unset",
                          top: "unset",
                          width: "unset",
                        }}
                        color="low-secondary"
                        size="small"
                        text="Valor"
                        textClassName={{
                          alignSelf: "unset",
                          textAlign: "right",
                          whiteSpace: "nowrap",
                          width: "fit-content",
                        }}
                        type="text"
                        weight="regular"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Divider
                className={{
                  alignSelf: "stretch",
                  left: "unset",
                  marginBottom: "-0.50px",
                  top: "unset",
                  width: "50%",
                }}
                color="low-lighter"
                orientation="horizontal"
                size="extra-small"
                theme="light"
              />
            </div>

            <div className={classes.infoBlock}>
              <div className={classes.infoItem}>
                <div className={classes.infoItemContent}>
                  <div className={classes.infoRow}>
                    <div className={classes.infoColumn}>
                      <Text
                        className={{
                          alignSelf: "stretch",
                          flex: "0 0 auto",
                          left: "unset",
                          top: "unset",
                          width: "100%",
                        }}
                        color="low-primary"
                        size="medium"
                        text="Texto primário"
                        type="text"
                        weight="semibold"
                      />
                    </div>
                    <div className={classes.infoValueEnd}>
                      <Text
                        className={{
                          alignItems: "flex-end",
                          display: "inline-flex",
                          flex: "0 0 auto",
                          left: "unset",
                          top: "unset",
                          width: "unset",
                        }}
                        color="low-primary"
                        size="medium"
                        text="Valor"
                        textClassName={{
                          alignSelf: "unset",
                          textAlign: "right",
                          whiteSpace: "nowrap",
                          width: "fit-content",
                        }}
                        type="text"
                        weight="regular"
                      />
                    </div>
                  </div>

                  <div className={classes.infoRow}>
                    <div className={classes.infoColumn}>
                      <Text
                        className={{
                          alignSelf: "stretch",
                          height: "24px",
                          left: "unset",
                          top: "unset",
                          width: "100%",
                        }}
                        color="low-secondary"
                        size="small"
                        text="Texto secundário"
                        type="text"
                        weight="regular"
                      />
                    </div>
                    <div className={classes.infoValueStart}>
                      <Text
                        className={{
                          alignItems: "flex-end",
                          display: "inline-flex",
                          flex: "0 0 auto",
                          left: "unset",
                          top: "unset",
                          width: "unset",
                        }}
                        color="low-secondary"
                        size="small"
                        text="Valor"
                        textClassName={{
                          alignSelf: "unset",
                          textAlign: "right",
                          whiteSpace: "nowrap",
                          width: "fit-content",
                        }}
                        type="text"
                        weight="regular"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Divider
                className={{
                  alignSelf: "stretch",
                  left: "unset",
                  marginBottom: "-0.50px",
                  top: "unset",
                  width: "50%",
                }}
                color="low-lighter"
                orientation="horizontal"
                size="extra-small"
                theme="light"
              />
            </div>

            <div className={classes.infoBlock}>
              <div className={classes.infoItem}>
                <div className={classes.infoItemContent}>
                  <div className={classes.infoRow}>
                    <div className={classes.infoColumn}>
                      <Text
                        className={{
                          alignSelf: "stretch",
                          flex: "0 0 auto",
                          left: "unset",
                          top: "unset",
                          width: "100%",
                        }}
                        color="low-primary"
                        size="medium"
                        text="Texto primário"
                        type="text"
                        weight="semibold"
                      />
                    </div>
                    <div className={classes.infoValueEnd}>
                      <Text
                        className={{
                          alignItems: "flex-end",
                          display: "inline-flex",
                          flex: "0 0 auto",
                          left: "unset",
                          top: "unset",
                          width: "unset",
                        }}
                        color="low-primary"
                        size="medium"
                        text="Valor"
                        textClassName={{
                          alignSelf: "unset",
                          textAlign: "right",
                          whiteSpace: "nowrap",
                          width: "fit-content",
                        }}
                        type="text"
                        weight="regular"
                      />
                    </div>
                  </div>

                  <div className={classes.infoRow}>
                    <div className={classes.infoColumn}>
                      <Text
                        className={{
                          alignSelf: "stretch",
                          height: "24px",
                          left: "unset",
                          top: "unset",
                          width: "100%",
                        }}
                        color="low-secondary"
                        size="small"
                        text="Texto secundário"
                        type="text"
                        weight="regular"
                      />
                    </div>
                    <div className={classes.infoValueStart}>
                      <Text
                        className={{
                          alignItems: "flex-end",
                          display: "inline-flex",
                          flex: "0 0 auto",
                          left: "unset",
                          top: "unset",
                          width: "unset",
                        }}
                        color="low-secondary"
                        size="small"
                        text="Valor"
                        textClassName={{
                          alignSelf: "unset",
                          textAlign: "right",
                          whiteSpace: "nowrap",
                          width: "fit-content",
                        }}
                        type="text"
                        weight="regular"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Divider
                className={{
                  alignSelf: "stretch",
                  left: "unset",
                  marginBottom: "-0.50px",
                  top: "unset",
                  width: "50%",
                }}
                color="low-lighter"
                orientation="horizontal"
                size="extra-small"
                theme="light"
              />
            </div>
          </div>

          <Text
            className={{
              alignSelf: "stretch",
              flex: "0 0 auto",
              left: "unset",
              top: "unset",
              width: "100%",
            }}
            color="low-primary"
            size="x-huge"
            type="subtitle"
            weight="semibold"
            text="Etapas de Contratação"
          />

          <div className={classes.stepsContainer}>
            <ContractStepsProgress process="ata" daysInProcess={18} observationsByStep={[]} />
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
              text1="VER NO SISCCON"
              theme="light"
              onClick={handleSaveClick}
            />

            {processCta && (
              <Button
                className={{ flex: "0 0 auto", left: "unset", top: "unset" }}
                hierarchy="primary"
                icon="off"
                size="small"
                status="default"
                text="on"
                text1={processCta === "details" ? "DETALHES DO PROCESSO" : "INICIAR PROCESSO"}
                theme="dark"
                onClick={handlePrimaryClick}
              />
            )}
          </div>
        </footer>
      </div>
    </div>
  );
};
