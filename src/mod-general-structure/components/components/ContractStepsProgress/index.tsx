import { useMemo, useState, type JSX } from "react";
import type React from "react";

import { Check, CheckNumber } from "../Check";
import { StepDetailsPopover } from "./StepDetailsPopover";
import classes from "./style.module.css";

export type ProcessKey = "aditivo" | "contratacao" | "remanescente" | "ata";

type StepsByProcess = Record<ProcessKey, string[]>;

type Props = {
  process: ProcessKey;
  daysInProcess: number;
  daysPerStep?: number;
  stepsByProcess?: StepsByProcess;

  observationsByStep?: string[];
  processStartDateISO?: string;
};

const DEFAULT_STEPS_BY_PROCESS: StepsByProcess = {
  aditivo: [
    "Confecção de insumos - Preenchimento das FQs, saldo de nota técnica",
    "Abertura de chamado",
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

const clamp01 = (n: number): number => Math.max(0, Math.min(1, n));

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

export const ContractStepsProgress = ({
  process,
  daysInProcess,
  daysPerStep = 30,
  stepsByProcess,
  observationsByStep,
  processStartDateISO,
}: Props): JSX.Element => {
  const stepsSource = stepsByProcess ?? DEFAULT_STEPS_BY_PROCESS;
  const titles = stepsSource[process] ?? [];
  const stepsCount = titles.length;

  const safeDays = Math.max(0, Math.floor(daysInProcess || 0));
  const safeDaysPerStep = Math.max(1, Math.floor(daysPerStep || 30));

  const [openStepIdx, setOpenStepIdx] = useState<number | null>(null);

  if (stepsCount === 0) return <div className={classes.empty} />;

  const isDone = (idx: number): boolean => safeDays >= idx * safeDaysPerStep;

  const totalDaysForBar = Math.max(1, stepsCount * safeDaysPerStep);

  const progressRatio = useMemo(
    () => clamp01(safeDays / totalDaysForBar),
    [safeDays, totalDaysForBar],
  );

  const progressPercent = useMemo(
    () => Math.round(progressRatio * 100),
    [progressRatio],
  );

  const finished = safeDays >= totalDaysForBar;

  const processStart = useMemo(() => {
    if (processStartDateISO) return parseISODate(processStartDateISO);
    const today = new Date();
    const start = addDays(today, -safeDays);
    start.setHours(0, 0, 0, 0);
    return start;
  }, [processStartDateISO, safeDays]);

  const usableWidthExpr = "(100% - (2 * var(--edge)) - var(--circle))";

  const closePopover = (): void => setOpenStepIdx(null);

  const wrapperVars = useMemo(
    () =>
      ({
        ["--steps" as any]: stepsCount + 1,
      }) as React.CSSProperties,
    [stepsCount],
  );

  return (
    <div
      className={classes.wrapper}
      style={wrapperVars}
      aria-label="Etapas do processo"
      onMouseDown={closePopover}
    >
      <div className={classes.track} aria-hidden="true" />

      <div
        className={classes.fill}
        role="progressbar"
        aria-label="Progresso das etapas"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progressPercent}
        style={{
          width: `calc(${usableWidthExpr} * ${progressRatio})`,
        }}
      />

      <div className={classes.stepsLayer}>
        {titles.map((title, idx) => {
          const pos = idx / stepsCount;
          const done = isDone(idx);

          const stepStartISO = toISODate(addDays(processStart, idx * safeDaysPerStep));
          const stepEndDay = (idx + 1) * safeDaysPerStep;
          const daysRemaining = Math.max(0, stepEndDay - safeDays);

          const obs = observationsByStep?.[idx] ?? "";
          const isOpen = openStepIdx === idx;

          return (
            <div
              key={`${process}-${idx}`}
              className={classes.step}
              style={{
                left: `calc(var(--edge) + var(--pad) + ${usableWidthExpr} * ${pos})`,
              }}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className={classes.circleBtn}
                aria-label="Abrir detalhes da etapa"
                onClick={() => setOpenStepIdx((cur) => (cur === idx ? null : idx))}
              >
                {done ? <Check /> : <CheckNumber number={String(idx + 1)} />}
              </button>

              {isOpen && (
                <StepDetailsPopover
                  title={title}
                  startDateISO={stepStartISO}
                  daysRemaining={daysRemaining}
                  observation={obs}
                  onClose={closePopover}
                />
              )}

              <div
                className={`${classes.label} ${done ? classes.labelDone : classes.labelTodo}`}
                title={title}
              >
                {title}
              </div>
            </div>
          );
        })}

        <div
          className={classes.final}
          style={{
            left: `calc(var(--edge) + var(--pad) + ${usableWidthExpr})`,
          }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className={`${classes.finalLabel} ${finished ? classes.labelDone : classes.labelTodo}`}>
            Processo Finalizado
          </div>
        </div>
      </div>
    </div>
  );
};
