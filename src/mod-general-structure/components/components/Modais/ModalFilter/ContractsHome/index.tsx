import { type JSX } from "react";
import type React from "react";

import { ArrowDropDown } from "../../../../general-components/ArrowDropdown";
import { Button } from "../../../../general-components/Button";
import { Divider } from "../../../../general-components/Divider";
import { IconClear } from "../../../../general-components/IconSvg/IconClear";

import classes from "./style.module.css";
import { InputData } from "../../../InputData";

type ModalContractFilterProps = {
  onClose?: () => void;
  onSave?: () => void;
};

export const ModalContractFilter = ({
  onClose,
  onSave,
}: ModalContractFilterProps): JSX.Element => {
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
            <div className={classes.title}>Filtro Contratos</div>

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
              <div className={classes.userLabel}>Situação dos Contratos</div>
              <div className={classes.textField}>
                <div className={classes.textFieldLabel}>
                  Selecione um ou mais itens
                </div>
                <div className={classes.chipsRow}>
                  <button className={classes.chipSelected}>Ativo</button>
                  <button className={classes.chip}>A Vencer</button>
                  <button className={classes.chip}>Vencido</button>
                  <button className={classes.chip}>Com Saldo</button>
                  <button className={classes.chip}>Sem Saldo</button>
                </div>
              </div>
            </div>
            <div className={classes.userBlock}>
              <InputData title="Vencimento" />
            </div>
          </div>
          <div className={classes.dropdownSection}>
            <div className={classes.dropdownLabel}></div>
            <div className={classes.userLabel}>Nome do Fornecedor</div>
            <div className={classes.dropdownLabel}>Itens selecionados</div>
            <div className={classes.dropdownField}>
              <div className={classes.chipsRow}>
                <button className={classes.chipSelected}>BB Tecnologia e Serviços ×</button>
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
            <div className={classes.userLabel}>DGCO</div>
            <div className={classes.dropdownLabel}>Itens selecionados</div>
            <div className={classes.dropdownField}>
              <div className={classes.chipsRow}>
                <button className={classes.chipSelected}>0000/2025 ×</button>
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
          <div className={classes.userBlock}>
            <div className={classes.userLabel}>Tipo</div>
            <div className={classes.textField}>
              <div className={classes.textFieldLabel}>
                Selecione um ou mais itens
              </div>
              <div className={classes.chipsRow}>
                <button className={classes.chip}>Locação</button>
                <button className={classes.chipSelected}>Manutenção</button>
                <button className={classes.chip}>Limpeza</button>
                <button className={classes.chip}>Segurança</button>
                <button className={classes.chipSelected}>Elevadores</button>
                <button className={classes.chip}>Ata</button>
              </div>
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
        <footer className={classes.footer}>
          <div className={classes.footerButtons}>
            <Button
              className={{ flex: "0 0 auto", left: "unset", top: "unset" }}
              hierarchy="primary"
              icon="off"
              size="small"
              status="default"
              text="on"
              text1="Aplicar Filtros"
              theme="light"
              onClick={handleSaveClick}
            />
          </div>
        </footer>
      </div>
    </div>
  );
};
