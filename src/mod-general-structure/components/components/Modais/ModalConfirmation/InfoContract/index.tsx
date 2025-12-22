import { useState, type JSX } from "react";
import type React from "react";

import { Button } from "../../../../general-components/Button";
import { Divider } from "../../../../general-components/Divider";
import { Check, CheckNumber } from "../../../Check";
import {
  BlueLineLeft,
  BlueLineRight,
  GrayLineLeft,
  GrayLineRight,
} from "../../../Line";
import { Text } from "../../../Text";

import classes from "./style.module.css";
import { ModalWriteNewProcess } from "../StartNewProcess";

type ModalInfoContractProps = {
  onClose?: () => void;
  onSave?: () => void;
};

export const ModalInfoContract = ({
  onClose,
  onSave,
}: ModalInfoContractProps): JSX.Element => {
  const [isStartProcessModalOpen, setIsStartProcessModalOpen] = useState(false)

  const openStartProcessModal = (): void => {
    setIsStartProcessModalOpen(true);
    onClose
  }

  const closeStartProcessModal = (): void => {
    setIsStartProcessModalOpen(false);
  }

  const handleNextFromStartProcessModal = (): void => {
    setIsStartProcessModalOpen(false);
  }

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
          />{" "}
          <div className={classes.infoSection}>
            {" "}
            <div className={classes.infoBlock}>
              {" "}
              <div className={classes.infoItem}>
                {" "}
                <div className={classes.infoItemContent}>
                  {" "}
                  <div className={classes.infoRow}>
                    {" "}
                    <div className={classes.infoColumn}>
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
                        size="medium"
                        text1="Texto primário"
                        type="text"
                        weight="semibold"
                      />{" "}
                    </div>{" "}
                    <div className={classes.infoValueEnd}>
                      {" "}
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
                        text1="Valor"
                        textClassName={{
                          alignSelf: "unset",
                          textAlign: "right",
                          whiteSpace: "nowrap",
                          width: "fit-content",
                        }}
                        type="text"
                        weight="regular"
                      />{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className={classes.infoRow}>
                    {" "}
                    <div className={classes.infoColumn}>
                      {" "}
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
                        text1="Texto secundário"
                        type="text"
                        weight="regular"
                      />{" "}
                    </div>{" "}
                    <div className={classes.infoValueStart}>
                      {" "}
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
                        text1="Valor"
                        textClassName={{
                          alignSelf: "unset",
                          textAlign: "right",
                          whiteSpace: "nowrap",
                          width: "fit-content",
                        }}
                        type="text"
                        weight="regular"
                      />{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
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
              />{" "}
            </div>{" "}
            <div className={classes.infoBlock}>
              {" "}
              <div className={classes.infoItem}>
                {" "}
                <div className={classes.infoItemContent}>
                  {" "}
                  <div className={classes.infoRow}>
                    {" "}
                    <div className={classes.infoColumn}>
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
                        size="medium"
                        text1="Texto primário"
                        type="text"
                        weight="semibold"
                      />{" "}
                    </div>{" "}
                    <div className={classes.infoValueEnd}>
                      {" "}
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
                        text1="Valor"
                        textClassName={{
                          alignSelf: "unset",
                          textAlign: "right",
                          whiteSpace: "nowrap",
                          width: "fit-content",
                        }}
                        type="text"
                        weight="regular"
                      />{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className={classes.infoRow}>
                    {" "}
                    <div className={classes.infoColumn}>
                      {" "}
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
                        text1="Texto secundário"
                        type="text"
                        weight="regular"
                      />{" "}
                    </div>{" "}
                    <div className={classes.infoValueStart}>
                      {" "}
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
                        text1="Valor"
                        textClassName={{
                          alignSelf: "unset",
                          textAlign: "right",
                          whiteSpace: "nowrap",
                          width: "fit-content",
                        }}
                        type="text"
                        weight="regular"
                      />{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
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
              />{" "}
            </div>{" "}
            <div className={classes.infoBlock}>
              {" "}
              <div className={classes.infoItem}>
                {" "}
                <div className={classes.infoItemContent}>
                  {" "}
                  <div className={classes.infoRow}>
                    {" "}
                    <div className={classes.infoColumn}>
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
                        size="medium"
                        text1="Texto primário"
                        type="text"
                        weight="semibold"
                      />{" "}
                    </div>{" "}
                    <div className={classes.infoValueEnd}>
                      {" "}
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
                        text1="Valor"
                        textClassName={{
                          alignSelf: "unset",
                          textAlign: "right",
                          whiteSpace: "nowrap",
                          width: "fit-content",
                        }}
                        type="text"
                        weight="regular"
                      />{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className={classes.infoRow}>
                    {" "}
                    <div className={classes.infoColumn}>
                      {" "}
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
                        text1="Texto secundário"
                        type="text"
                        weight="regular"
                      />{" "}
                    </div>{" "}
                    <div className={classes.infoValueStart}>
                      {" "}
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
                        text1="Valor"
                        textClassName={{
                          alignSelf: "unset",
                          textAlign: "right",
                          whiteSpace: "nowrap",
                          width: "fit-content",
                        }}
                        type="text"
                        weight="regular"
                      />{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
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
              />{" "}
            </div>{" "}
          </div>{" "}
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
          />
          <div className={classes.stepsContainer}>
            <div className={classes.stepsContent}>
              <div className={classes.stepsLine}>
                <div className={classes.iconText}>
                  <div className={classes.iconLines}>
                    <div className={classes.icon}>
                      <Check />
                    </div>
                    <div className={classes.lineLeft}>
                      <BlueLineLeft />
                    </div>
                    <div className={classes.lineRight}>
                      <BlueLineRight />
                    </div>
                  </div>
                  <div className={classes.text}>
                    <Text
                      className={{
                        alignSelf: "stretch",
                        height: "24px",
                        left: "unset",
                        top: "unset",
                        width: "100%",
                      }}
                      color="brandprimarypure"
                      size="x-small"
                      text="Step Inicial"
                      type="text"
                      weight="regular"
                    />
                  </div>
                </div>
                <div className={classes.iconText}>
                  <div className={classes.iconLinesCenter}>
                    <div className={classes.icon}>
                      <Check />
                    </div>
                    <div className={classes.lineLeft}>
                      <BlueLineLeft />
                    </div>
                    <div className={classes.lineRight}>
                      <BlueLineRight />
                    </div>
                  </div>
                  <div className={classes.text}>
                    <Text
                      className={{
                        alignSelf: "stretch",
                        height: "24px",
                        left: "unset",
                        top: "unset",
                        width: "100%",
                      }}
                      color="brandprimarypure"
                      size="x-small"
                      text="Step Intermediario"
                      type="text"
                      weight="regular"
                    />
                  </div>
                </div>
                <div className={classes.iconText}>
                  <div className={classes.iconLinesCenter}>
                    <div className={classes.icon}>
                      <Check />
                    </div>
                    <div className={classes.lineLeft}>
                      <BlueLineLeft />
                    </div>
                    <div className={classes.lineRight}>
                      <GrayLineRight />
                    </div>
                  </div>
                  <div className={classes.text}>
                    <Text
                      className={{
                        alignSelf: "stretch",
                        height: "24px",
                        left: "unset",
                        top: "unset",
                        width: "100%",
                      }}
                      color="brandprimarypure"
                      size="x-small"
                      text="Step Intermediario"
                      type="text"
                      weight="regular"
                    />
                  </div>
                </div>
                <div className={classes.iconText}>
                  <div className={classes.iconLinesCenter}>
                    <div className={classes.icon}>
                      <CheckNumber number="4" />
                    </div>
                    <div className={classes.lineLeft}>
                      <GrayLineLeft />
                    </div>
                    <div className={classes.lineRight}></div>
                    <GrayLineRight />
                    <div className={classes.icon}>
                      <CheckNumber number="5" />
                    </div>
                  </div>
                  <div className={classes.text}>
                    <Text
                      className={{
                        alignSelf: "stretch",
                        height: "24px",
                        left: "unset",
                        top: "unset",
                        width: "100%",
                      }}
                      color="high-secondary"
                      size="x-small"
                      text="Step Intermediario"
                      type="text"
                      weight="regular"
                    />
                  </div>
                </div>
                <div className={classes.iconText}>
                  <div className={classes.iconLinesCenter}></div>
                </div>
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
            
            <Button
              className={{ flex: "0 0 auto", left: "unset", top: "unset" }}
              hierarchy="primary"
              icon="off"
              size="small"
              status="default"
              text="on"
              text1="INICIAR PROCESSO"
              theme="dark"
              onClick={openStartProcessModal}
            />
          </div>
        </footer>
      </div>
      {isStartProcessModalOpen && (
        <ModalWriteNewProcess
          onClose={closeStartProcessModal}
          onNext={handleNextFromStartProcessModal}
        />
      )}
    </div>
  );
};
