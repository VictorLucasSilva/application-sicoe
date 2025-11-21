import { type JSX } from "react";
import { ArrowDropDown } from "../../../ArrowDropdown";
import { Button } from "../../../../general-components/Button";
import { Divider } from "../../../../general-components/Divider";
import { IconCalendar } from "../../../../general-components/IconSvg/IconCalendar";
import image from "../../../../../../../public/images/Down.svg";
import linha from "../../../../../../../public/images/Down.svg";
import classes from "./style.module.css";

type Props = {
  onClose?: () => void;
};

export const ModalWriteUserUpdate = ({ onClose }: Props): JSX.Element => {
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
      <div className={classes.modalEditar} onClick={handleCardClick}>
        <header className={classes.header}>
          <div className={classes.headerTop}>
            <div className={classes.title}>Editar Usuário</div>

            <button
              type="button"
              className={classes.closeButton}
              onClick={onClose}
              aria-label="Fechar modal"
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
          <div className={classes.userLabel}>Usuário</div>

          <div className={classes.fieldsContainer}>
            {/* PERFIL */}
            <div className={classes.fieldWrapper}>
              <div className={classes.fieldInner}>
                <div className={classes.fieldLabel}>Perfil</div>
                <div className={classes.fieldContent}>
                  <div className={classes.fieldPlaceholder}>Filtrar</div>
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
              <img className={classes.fieldLine} alt="Linha" src={linha} />
            </div>

            {/* VIGÊNCIA */}
            <div className={classes.fieldWrapper2}>
              <div className={classes.fieldInner}>
                <div className={classes.fieldLabel2}>Vigência</div>
                <div className={classes.fieldContent}>
                  <div className={classes.fieldPlaceholder}>DD/MM/AAAA</div>
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
              <img className={classes.fieldLine} alt="Linha" src={image} />
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
            />
          </div>
        </footer>
      </div>
    </div>
  );
};
