import { useMemo, type JSX } from "react";
import type React from "react";

import { Button } from "../../../../general-components/Button";
import { Check, CheckNumber } from "../../../Check";
import { Text } from "../../../Text";

import classes from "./style.module.css";

type ProcessKey = "aditivo" | "contratacao" | "remanescente" | "ata";

const PROCESS_TO_VIEW: ProcessKey = "contratacao";
const DAYS_IN_PROCESS = 119;
const DAYS_PER_STEP = 30;
const PROCESS_START_DATE_ISO: string | null = null;

const BAR_BLUE = "#465eff";
const TODO_BAR = "#c9c9c9";
const TODO_SOFT = "rgba(201,201,201,0.22)";

const PEN_ICON_SRC = "/icons/pen.svg";

const STEPS_BY_PROCESS: Record<ProcessKey, string[]> = {
  aditivo: [
    "Confecção de insumos - Preenchimento das FQs, saldo de nota técnica",
    "Abertura de chamado.",
    "Eventuais correções ou complementação",
    "PÓS Assinatura de Contrato envio de FQ/insumos complementares",
  ],
  contratacao: [
    "Definição de Escopo e especificações técnicas",
    "Elaboração do Projeto básico",
    "Cotação de Preços",
    "Elaboração de Nota técnica",
    "Chamado para Envio dos insumos para GESUC",
    "PÓS Assinatura de Contrato envio de FQ/insumos complementares",
  ],
  remanescente: [
    "Abertura de chamado",
    "Confecção de insumos - Preenchimento das FQs, saldo de nota técnica",
    "PÓS Assinatura de Contrato envio de FQ/insumos complementares",
  ],
  ata: [
    "Elaboração da Nota técnica",
    "Preenchimento dos insumos",
    "Abertura de chamado - Acompanhar a conclusão do chamado",
    "Preparação da formalização do Pedido - FQ",
  ],
};

const PROCESS_LABEL: Record<ProcessKey, string> = {
  aditivo: "Aditivo",
  contratacao: "Contratação",
  remanescente: "Convocação de Remanescente",
  ata: "Acionamento de Ata de Registro de Preço",
};

const toISODate = (d: Date): string => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const parseISODate = (s: string): Date => {
  const [y, m, d] = s.split("-").map((n) => Number(n));
  return new Date(y, (m || 1) - 1, d || 1);
};

const addDays = (d: Date, days: number): Date => {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
};

const formatBR = (iso: string): string => {
  const dt = parseISODate(iso);
  const dd = String(dt.getDate()).padStart(2, "0");
  const mm = String(dt.getMonth() + 1).padStart(2, "0");
  const yy = dt.getFullYear();
  return `${dd}/${mm}/${yy} às 11h00`;
};

type ModalInfoProcessProps = {
  onClose?: () => void;
  onBack?: () => void;
  onEndProcess?: () => void;
};

export const ModalInfoProcess = ({
  onClose,
  onBack,
  onEndProcess,
}: ModalInfoProcessProps): JSX.Element => {
  const steps = STEPS_BY_PROCESS[PROCESS_TO_VIEW] ?? [];
  const stepsCount = steps.length;

  const safeDays = Math.max(0, Math.floor(DAYS_IN_PROCESS || 0));
  const safeDaysPerStep = Math.max(1, Math.floor(DAYS_PER_STEP || 30));

  const totalDaysForProcess = Math.max(1, stepsCount * safeDaysPerStep);
  const processFinished = safeDays >= totalDaysForProcess;

  const currentStepIdx = useMemo(() => {
    if (stepsCount === 0) return -1;
    if (processFinished) return -1;
    return Math.min(stepsCount - 1, Math.floor(safeDays / safeDaysPerStep));
  }, [processFinished, safeDays, safeDaysPerStep, stepsCount]);

  const processStart = useMemo(() => {
    if (PROCESS_START_DATE_ISO) return parseISODate(PROCESS_START_DATE_ISO);
    const today = new Date();
    const start = addDays(today, -safeDays);
    start.setHours(0, 0, 0, 0);
    return start;
  }, [safeDays]);

  const processEndISO = useMemo(
    () => toISODate(addDays(processStart, totalDaysForProcess)),
    [processStart, totalDaysForProcess],
  );

  const notifyBeforeISO = useMemo(() => {
    const daysBefore = Math.max(0, totalDaysForProcess - 10);
    return toISODate(addDays(processStart, daysBefore));
  }, [processStart, totalDaysForProcess]);

  const orderedIdxs = useMemo(() => {
    return Array.from({ length: stepsCount }, (_, i) => i).reverse();
  }, [stepsCount]);

  const isTodo = (idx: number): boolean => safeDays < idx * safeDaysPerStep;
  const isDone = (idx: number): boolean => safeDays >= (idx + 1) * safeDaysPerStep;
  const isCurrent = (idx: number): boolean => idx === currentStepIdx;

  const handleOverlayClick = (): void => onClose?.();
  const handleCardClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => event.stopPropagation();

  const handleBackClick = (): void => {
    if (onBack) onBack();
    else onClose?.();
  };

  const handleEndClick = (): void => onEndProcess?.();

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

          <div className={classes.blueDivider} />
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
            text={`Etapas do Processo - ${PROCESS_LABEL[PROCESS_TO_VIEW]}`}
            type="subtitle"
            weight="semibold"
          />

          <div className={classes.timelineScroll}>
            <div className={classes.timelineList}>
              {orderedIdxs.map((idx, posInView) => {
                const title = steps[idx];

                const done = isDone(idx);
                const todo = isTodo(idx);
                const current = isCurrent(idx);
                const showPen = current && !processFinished;
                const stepBarColor = todo ? TODO_BAR : BAR_BLUE;
                const stepSoft = todo ? TODO_SOFT : "rgba(70,94,255,0.10)";
                const stepStartISO = toISODate(addDays(processStart, idx * safeDaysPerStep));
                const stepEndISO = toISODate(addDays(processStart, (idx + 1) * safeDaysPerStep));
                const rowVars = {
                  ["--step-bar" as any]: stepBarColor,
                  ["--step-soft" as any]: stepSoft,
                } as React.CSSProperties;

                const isLastRendered = posInView === orderedIdxs.length - 1;

                const rowClass = [
                  classes.stepRow,
                  todo ? classes.stepTodo : "",
                  current ? classes.stepCurrent : "",
                  done ? classes.stepDone : "",
                ]
                  .filter(Boolean)
                  .join(" ");

                return (
                  <div
                    key={`process-${PROCESS_TO_VIEW}-${idx}`}
                    className={rowClass}
                    style={rowVars}
                  >
                    <div className={classes.rail}>
                      <div className={classes.iconStatic} aria-hidden="true">
                        {done ? (
                          <Check />
                        ) : (
                          <CheckNumber
                            number={String(idx + 1)}
                            className={classes.checkNumGray as unknown as string}
                          />
                        )}
                      </div>

                      {!isLastRendered && (
                        <div className={classes.railLine} aria-hidden="true" />
                      )}
                    </div>

                    <div className={classes.stepCard}>
                      <div className={classes.stepTopRow}>
                        <div className={classes.stepTitle}>{title}</div>

                        <div className={classes.stepTopActions}>
                          {done && <span className={classes.doneMark}>✔️</span>}

                          {current && (
                            <button
                              type="button"
                              className={classes.primaryChip}
                              onClick={(e) => e.preventDefault()}
                            >
                              Iniciar Próxima Etapa
                            </button>
                          )}
                        </div>
                      </div>

                      <div className={classes.datesRow}>
                        <div className={classes.dateStartGroup}>
                          <div className={classes.metaLabel}>Início do processo</div>
                          <div className={todo ? classes.datePillTodo : classes.datePillStart}>
                            {formatBR(stepStartISO)}
                          </div>
                        </div>

                        {!todo && (
                          <div className={classes.dateEndGroup}>
                            <div className={classes.endTopRow}>
                              <div className={classes.metaLabel}>Data Final</div>

                              {showPen && (
                                <button
                                  type="button"
                                  className={classes.penBtn}
                                  aria-label="Editar data final"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  <img className={classes.penIcon} src={PEN_ICON_SRC} alt="Editar" />
                                </button>
                              )}
                            </div>

                            <div className={classes.datePillEnd}>{formatBR(stepEndISO)}</div>
                          </div>
                        )}
                      </div>

                      <div className={classes.sectionHeaderRow}>
                        <div className={classes.sectionTitlePlain}>Observações</div>

                        {showPen && (
                          <img
                            className={classes.penIcon}
                            src={PEN_ICON_SRC}
                            alt="Editar"
                          />
                        )}
                      </div>

                      <div className={classes.stepDesc}>
                        Exemplo de conteúdo detalhado. Com exceção do nó e da barra, nenhum dos outros
                        elementos são obrigatórios. Também é possível utilizar elementos como avatar, imagem
                        e vídeo.
                      </div>

                      {!todo && (
                        <>
                          <div className={classes.sectionTitleRow}>
                            <div className={classes.sectionTitlePlain}>Notificações</div>
                          </div>

                          <div className={classes.notifyList}>
                            <div className={classes.notifyItem}>
                              <span className={classes.notifyDate}>{formatBR(notifyBeforeISO)}</span>
                              <span className={classes.notifyText}>
                                Notificação no Sistema e Email (Faltam 10 dias para finaliza a etapa)
                              </span>
                            </div>

                            <div className={classes.notifyItem}>
                              <span className={classes.notifyDate}>{formatBR(processEndISO)}</span>
                              <span className={classes.notifyText}>
                                Notificação no Sistema e Email (Fim da Etapa)
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <footer className={classes.footer}>
          <div className={classes.blueDivider} />

          <div className={classes.footerInner}>
            <Button
              className={{ flex: "0 0 auto", left: "unset", top: "unset" }}
              hierarchy="primary"
              icon="off"
              size="small"
              status="default"
              text="on"
              text1="VOLTAR"
              theme="light"
              onClick={handleBackClick}
            />

            <Button
              className={{ flex: "0 0 auto", left: "unset", top: "unset" }}
              hierarchy="primary"
              icon="off"
              size="small"
              status="default"
              text="on"
              text1="ENCERRAR PROCESSO"
              theme="light"
              onClick={handleEndClick}
            />
          </div>
        </footer>
      </div>
    </div>
  );
};
