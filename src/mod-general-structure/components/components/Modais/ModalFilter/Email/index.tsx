import { type JSX } from "react";
import type React from "react";

import { ArrowDropDown } from "../../../../general-components/ArrowDropdown";
import { Button } from "../../../../general-components/Button";
import { Divider } from "../../../../general-components/Divider";
import { IconClear } from "../../../../general-components/IconSvg/IconClear";

import classes from "./style.module.css";
import { InputData } from "../../../InputData";

type ModalWriteUserRelationProps = {
  onClose?: () => void;
  onSave?: () => void;
};

export const ModalWriteUserRelation = ({
  onClose,
  onSave,
}: ModalWriteUserRelationProps): JSX.Element => {
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
            <div className={classes.title}>Filtro E-mail</div>

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
          <div className={classes.userBlockInline}>
            <div className={classes.userBlock}>
              <div className={classes.userLabel}>Tipo</div>
              <div className={classes.textField}>
                <div className={classes.textFieldLabel}>
                  Selecione um ou mais tipos
                </div>
                <div className={classes.chipsRow}>
                  <button className={classes.chipSelected}>
                    Em Análise | Administradores
                  </button>
                  <button className={classes.chip}>
                    Pendências | Usuários
                  </button>
                </div>
              </div>
            </div>
            <div className={classes.userBlock}>
              <InputData title="Data" />
            </div>
          </div>

          <div className={classes.dropdownSection}>
            <div className={classes.dropdownLabel}></div>
            <div className={classes.userLabel}>Destino</div>
            <div className={classes.dropdownLabel}>Itens selecionados</div>
            <div className={classes.dropdownField}>
              <div className={classes.chipsRow}>
                <button className={classes.chipSelected}>
                  ext-vlucas.silva ×
                </button>
              </div>

              <div className={classes.dropdownIcons}>
                <IconClear
                  className={{
                    height: "24px",
                    position: "relative",
                    width: "24px",
                  }}
                  opacity="0.65"
                />
                <ArrowDropDown
                  className={{
                    height: "24px",
                    position: "relative",
                    width: "24px",
                  }}
                />
              </div>
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
          </div>
          <div className={classes.dropdownSection}>
            <div className={classes.dropdownLabel}></div>
            <div className={classes.userLabel}>Objeto</div>
            <div className={classes.dropdownLabel}>Itens selecionados</div>
            <div className={classes.dropdownField}>
              <div className={classes.chipsRow}>
                <button className={classes.chipSelected}>
                  AVBC | MATRIZ ×
                </button>
                <button className={classes.chipSelected}>
                  AVBC | FILIAL - BELO HORIZONTE ×
                </button>
              </div>

              <div className={classes.dropdownIcons}>
                <IconClear
                  className={{
                    height: "24px",
                    position: "relative",
                    width: "24px",
                  }}
                  opacity="0.65"
                />
                <ArrowDropDown
                  className={{
                    height: "24px",
                    position: "relative",
                    width: "24px",
                  }}
                />
              </div>
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
          </div>
        </div>
        <footer className={classes.footer}>
          <div className={classes.footerButtons}>
            <Button
              className={{ flex: "0 0 auto", left: "unset", top: "unset" }}
              hierarchy="primary"
              icon="off"
              size="small"
              status="default"
              text="on"
              text1="Filtrar"
              theme="light"
              onClick={handleSaveClick}
            />
          </div>
        </footer>
      </div>
    </div>
  );
};
