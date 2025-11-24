import { type JSX } from "react";
import { ArrowDropDown } from "../../../ArrowDropdown";
import { Button } from "../../../../general-components/Button";
import { Divider } from "../../../../general-components/Divider";
import { IconCalendar } from "../../../../general-components/IconSvg/IconCalendar";

import classes from "./style.module.css";

type Props = {
  onClose?: () => void;
  onSave?: () => void;
};

export const ModalWriteUserUpdate = ({ onClose, onSave }: Props): JSX.Element => {
  const handleOverlayClick = (): void => {
    if (onClose) onClose();
  };

  const handleCardClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    // impede fechar ao clicar dentro do card
    event.stopPropagation();
  };

  const handleSaveClick = (): void => {
    if (onSave) onSave();
  };

  return (
    <div className={classes.overlay} onClick={handleOverlayClick}>
      <div className={classes.modalEditar} onClick={handleCardClick}>
        {/* HEADER */}
        <header className={classes.header}>
          <div className={classes.headerTop}>
            <h2 className={classes.title}>Editar Usuário</h2>

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

        {/* CONTEÚDO */}
        <div className={classes.content}>
          <div className={classes.userLabel}>Usuário</div>

          <div className={classes.fieldsRow}>
            {/* PERFIL */}
            <div className={classes.field}>
              <div className={classes.fieldLabel}>Perfil</div>
              <div className={classes.fieldInput}>
                <span className={classes.fieldPlaceholder}>Filtrar</span>
                <div className={classes.fieldSpacer} />
                <ArrowDropDown
                  className={{
                    height: "24px",
                    position: "relative",
                    width: "24px",
                  }}
                />
              </div>
            </div>

            {/* VIGÊNCIA */}
            <div className={classes.field}>
              <div className={classes.fieldLabel}>Vigência</div>
              <div className={classes.fieldInput}>
                <span className={classes.fieldPlaceholder}>DD/MM/AAAA</span>
                <div className={classes.fieldSpacer} />
                <IconCalendar
                  className={{
                    height: "24px",
                    position: "relative",
                    width: "24px",
                  }}
                  opacity="0.25"
                />
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
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
