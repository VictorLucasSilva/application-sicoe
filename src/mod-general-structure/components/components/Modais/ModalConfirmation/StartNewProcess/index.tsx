import { useMemo, useState, type JSX } from "react";
import type React from "react";

import { Button } from "../../../../general-components/Button";
import { Divider } from "../../../../general-components/Divider";

import classes from "./style.module.css";

type ModalWriteNewProcessProps = {
  onClose?: () => void;
  onNext?: () => void; // Salvar
  onBackToInfo?: () => void; // Voltar pro InfoContract
};

type ProcessKey = "aditivo" | "contratacao" | "remanescente" | "ata";

const PROCESS_OPTIONS: Array<{ key: ProcessKey; label: string }> = [
  { key: "aditivo", label: "Aditivo" },
  { key: "contratacao", label: "Contratação" },
  { key: "remanescente", label: "Convocação de Remanescente" },
  { key: "ata", label: "Acionamentos de Ata de Registro de Preço" },
];

const PROCESS_STEPS: Record<ProcessKey, string[]> = {
  aditivo: [
    "Confecção de insumos - Preenchimento das FQs, saldo de nota técnica",
    "Abertura de chamado.",
    "Eventuais correções ou complementação",
    "PÓS Assinatura de Contrato envio de FQ/insumos complementares,",
  ],
  contratacao: [
    "Definição de Escopo e especificações técnicas",
    "Elaboração do Projeto básico",
    "Cotação de Preços",
    "Elaboração de Nota técnica",
    "Chamado para Envio dos insumos para GESUC",
    "PÓS Assinatura de Contrato envio de FQ/insumos complementares,",
  ],
  remanescente: [
    "Abertura de chamado",
    "Confecção de insumos - Preenchimento das FQs, saldo de nota técnica",
    "PÓS Assinatura de Contrato envio de FQ/insumos complementares,",
  ],
  ata: [
    "Elaboração da Nota técnica",
    "Preenchimento dos insumos",
    "Abertura de chamado - Acompanhar a conclusão do chamado",
    "Preparação da formalização do Pedido - FQ",
  ],
};

type StepState = {
  observation: string;
  defaultStartDate: string; // yyyy-mm-dd
  startDate: string; // yyyy-mm-dd
  acknowledgedManual: boolean; // ciência manual (check clicado)
};

const MS_DAY = 24 * 60 * 60 * 1000;

const startOfDay = (d: Date): Date => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

const toISODate = (d: Date): string => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const parseISODate = (s: string): Date => {
  const [y, m, d] = s.split("-").map((n) => Number(n));
  return new Date(y, m - 1, d);
};

const addDays = (d: Date, days: number): Date => {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
};

const diffDaysFromToday = (today: Date, targetISO: string): number => {
  if (!targetISO) return 0;
  const t = startOfDay(parseISODate(targetISO));
  const diff = t.getTime() - today.getTime();
  return Math.max(0, Math.ceil(diff / MS_DAY));
};

const monthsLabelFromDays = (days: number): string => {
  if (days === 0) return "Hoje - restam 0 dias";
  if (days < 30) return `A menos de 1 mês - restam ${days} dias`;

  const months = Math.round(days / 30);
  const monthWord = months === 1 ? "mês" : "meses";
  return `A ${months} ${monthWord} - restam ${days} dias`;
};

const buildInitialState = (today: Date): Record<ProcessKey, StepState[]> => {
  const make = (key: ProcessKey): StepState[] =>
    PROCESS_STEPS[key].map((_, idx) => {
      const defaultDate = toISODate(addDays(today, (idx + 1) * 30));
      return {
        observation: "",
        defaultStartDate: defaultDate,
        startDate: defaultDate,
        acknowledgedManual: false,
      };
    });

  return {
    aditivo: make("aditivo"),
    contratacao: make("contratacao"),
    remanescente: make("remanescente"),
    ata: make("ata"),
  };
};

const isDateChanged = (s: StepState): boolean => s.startDate !== s.defaultStartDate;

export const ModalWriteNewProcess = ({
  onClose,
  onNext,
  onBackToInfo,
}: ModalWriteNewProcessProps): JSX.Element => {
  const today = useMemo(() => startOfDay(new Date()), []);

  const [selectedProcess, setSelectedProcess] = useState<ProcessKey | null>(null);
  const [stepsByProcess, setStepsByProcess] = useState<Record<ProcessKey, StepState[]>>(
    () => buildInitialState(today),
  );

  const handleOverlayClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    event.stopPropagation();
    if (onClose) onClose();
  };

  const handleCardClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    event.stopPropagation();
  };

  const handleBackClick = (): void => {
    if (onBackToInfo) onBackToInfo();
  };

  const handleSaveClick = (): void => {
    if (onNext) onNext();
  };

  // ✅ ao selecionar uma opção: desabilita as outras.
  // ✅ para trocar: clique de novo na opção selecionada -> desseleciona e zera tudo.
  const handleSelectProcess = (key: ProcessKey): void => {
    setSelectedProcess((prev) => {
      // clicou na mesma opção => desseleciona e zera tudo
      if (prev === key) {
        setStepsByProcess(buildInitialState(today));
        return null;
      }

      // clicou em outra opção:
      // só vai acontecer quando prev for null (porque as outras ficam disabled)
      return key;
    });
  };

  const currentStepsState = selectedProcess ? stepsByProcess[selectedProcess] : [];
  const currentStepsTitles = selectedProcess ? PROCESS_STEPS[selectedProcess] : [];

  const completedCount = useMemo(() => {
    return currentStepsState.reduce((acc, s) => {
      const hasObs = (s.observation || "").trim().length > 0;
      const dateChanged = isDateChanged(s);
      const checked = s.acknowledgedManual || hasObs || dateChanged;
      return acc + (checked ? 1 : 0);
    }, 0);
  }, [currentStepsState]);

  const totalCount = currentStepsState.length;
  const progressPercent =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  const canSave = !!selectedProcess && totalCount > 0 && completedCount === totalCount;

  const updateStep = (index: number, patch: Partial<StepState>): void => {
    if (!selectedProcess) return;

    setStepsByProcess((prev) => {
      const arr = [...(prev[selectedProcess] ?? [])];
      const current = arr[index];
      if (!current) return prev;

      arr[index] = { ...current, ...patch };
      return { ...prev, [selectedProcess]: arr };
    });
  };

  const toggleAcknowledged = (index: number): void => {
    if (!selectedProcess) return;

    setStepsByProcess((prev) => {
      const arr = [...(prev[selectedProcess] ?? [])];
      const current = arr[index];
      if (!current) return prev;

      arr[index] = { ...current, acknowledgedManual: !current.acknowledgedManual };
      return { ...prev, [selectedProcess]: arr };
    });
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

          <Divider size="medium" theme="light" orientation="horizontal" color="low-lighter" />
        </header>

        <div className={classes.content}>
          <div className={classes.infoContractNewProcess}>
            <div className={classes.sectionInfoContract}>
              <div className={classes.supplier}>Fornecedor</div>
              <div className={classes.subSupplier}>BB Tecnologia e Serviços</div>
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
            {!selectedProcess && (
              <div className={classes.userLabel}>Definição do Processo</div>
            )}
            <div className={classes.textField}>
              {!selectedProcess ? (
                <div className={classes.textFieldLabel}>Só um item pode ser selecionado</div>
              ) : (
                <div className={classes.textFieldLabel}>
                  Para definir outro processo basta clicar no item selecionado.
                </div>
              )}

              <div className={classes.chipsRow}>
                {PROCESS_OPTIONS.map((opt) => {
                  const isSelected = selectedProcess === opt.key;
                  const isDisabled = selectedProcess !== null && !isSelected;

                  return (
                    <button
                      key={opt.key}
                      type="button"
                      className={
                        isSelected
                          ? classes.chipSelected
                          : isDisabled
                            ? classes.chipDisabled
                            : classes.chip
                      }
                      aria-pressed={isSelected}
                      disabled={isDisabled}
                      onClick={() => handleSelectProcess(opt.key)}
                      title={
                        isDisabled
                          ? "Para trocar, clique novamente na opção selecionada para liberar."
                          : undefined
                      }
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              {selectedProcess && (
                <div className={classes.stepsList}>
                  {currentStepsTitles.map((stepTitle, idx) => {
                    const stepState = currentStepsState[idx];

                    const hasObs = !!(stepState?.observation || "").trim();
                    const dateChanged = stepState ? isDateChanged(stepState) : false;

                    const checked = stepState
                      ? stepState.acknowledgedManual || hasObs || dateChanged
                      : false;

                    const daysRemaining = stepState
                      ? diffDaysFromToday(today, stepState.startDate)
                      : 0;

                    const monthsDaysText = monthsLabelFromDays(daysRemaining);

                    const checkTitle = (() => {
                      if (!stepState) return "Clique para confirmar ciência da etapa";
                      if (stepState.acknowledgedManual) return "Etapa confirmada (manual)";
                      if (hasObs && dateChanged)
                        return "Etapa confirmada (observação preenchida e data alterada)";
                      if (hasObs) return "Etapa confirmada (observação preenchida)";
                      if (dateChanged) return "Etapa confirmada (data alterada)";
                      return "Clique para confirmar ciência da etapa";
                    })();

                    return (
                      <div
                        key={`${selectedProcess}-${idx}`}
                        className={`${classes.stepCard} ${checked ? classes.stepCardChecked : ""
                          }`}
                      >
                        <div className={classes.stepHeader}>
                          <div className={classes.stepTitle}>
                            {idx + 1} - {stepTitle}
                          </div>

                          <button
                            type="button"
                            className={checked ? classes.ackButtonChecked : classes.ackButton}
                            aria-label="Confirmar ciência da etapa"
                            aria-pressed={checked}
                            title={checkTitle}
                            onClick={() => toggleAcknowledged(idx)}
                          >
                            ✓
                          </button>
                        </div>

                        <div className={classes.stepFieldsRow}>
                          <div className={classes.dateField}>
                            <label
                              className={classes.fieldLabel}
                              htmlFor={`date-${selectedProcess}-${idx}`}
                            >
                              Alterar Data (Início)
                            </label>

                            <div className={classes.fieldSubLabel}>{monthsDaysText}</div>

                            <input
                              id={`date-${selectedProcess}-${idx}`}
                              className={classes.dateInput}
                              type="date"
                              value={stepState?.startDate ?? ""}
                              onChange={(e) => updateStep(idx, { startDate: e.target.value })}
                            />
                          </div>

                          <div className={classes.obsField}>
                            <label
                              className={classes.fieldLabel}
                              htmlFor={`obs-${selectedProcess}-${idx}`}
                            >
                              Observações
                            </label>

                            <div className={classes.fieldSubLabelSpacer} aria-hidden="true">
                              &nbsp;
                            </div>

                            <textarea
                              id={`obs-${selectedProcess}-${idx}`}
                              className={classes.obsInput}
                              placeholder="Opcional"
                              value={stepState?.observation ?? ""}
                              onChange={(e) => updateStep(idx, { observation: e.target.value })}
                              rows={2}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        <footer className={classes.footer}>
          {selectedProcess && (
            <div className={classes.progressArea}>
              <div className={classes.progressTrack} aria-label="Barra de progresso">
                <div
                  className={classes.progressFill}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className={classes.progressTopRow}>
                <div className={classes.progressLabel}>Progresso</div>
                <div className={classes.progressMeta}>
                  {completedCount}/{totalCount} ({progressPercent}%)
                </div>
              </div>
            </div>
          )}

          <Divider size="medium" theme="light" orientation="horizontal" color="low-lighter" />

          <div className={classes.footerButtons}>
            {!selectedProcess && (
              <Button
                className={{ flex: "0 0 auto" }}
                text1="Voltar"
                onClick={handleBackClick}
              />
            )}

            {selectedProcess && (
              <Button
                className={{ flex: "0 0 auto" }}
                text1="Salvar"
                disabled={!canSave}
                onClick={canSave ? handleSaveClick : undefined}
              />
            )}
          </div>
        </footer>
      </div>
    </div>
  );
};
