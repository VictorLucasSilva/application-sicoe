import { type JSX, useEffect, useMemo, useState } from "react";

import { Divider } from "../../../general-components/Divider";
import { Button } from "../../../general-components/Button";

import classes from "./style.module.css";

export type ReportKey = "audit" | "users" | "email" | "contracts";

export type GenerateReportPayload = {
  selected: ReportKey[];
  period: { from: string; to: string };
  format: "pdf" | "csv";
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onGenerate?: (payload: GenerateReportPayload) => void;
};

const REPORT_LABEL: Record<ReportKey, string> = {
  audit: "Auditoria",
  users: "Usuários",
  email: "E-mail",
  contracts: "Monitoramento de Contratos",
};

const todayISO = (): string => new Date().toISOString().slice(0, 10);

export const ModalGenerateReport = ({
  isOpen,
  onClose,
  onGenerate,
}: Props): JSX.Element | null => {
  const [selected, setSelected] = useState<Record<ReportKey, boolean>>({
    audit: false,
    users: true,
    email: false,
    contracts: true,
  });

  const [format, setFormat] = useState<"pdf" | "csv">("pdf");

  const [dateFrom, setDateFrom] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return d.toISOString().slice(0, 10);
  });
  const [dateTo, setDateTo] = useState<string>(() => todayISO());

  const selectedKeys = useMemo(() => {
    return (Object.keys(selected) as ReportKey[]).filter((k) => selected[k]);
  }, [selected]);

  const canGenerate = selectedKeys.length > 0;

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggle = (k: ReportKey): void => {
    setSelected((prev) => ({ ...prev, [k]: !prev[k] }));
  };

  const payload: GenerateReportPayload = {
    selected: selectedKeys,
    period: { from: dateFrom, to: dateTo },
    format,
  };

  const handleGenerate = (): void => {
    if (!canGenerate) return;
    onGenerate?.(payload);
  };

  return (
    <div
      className={classes.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Gerar relatório"
      onMouseDown={() => onClose()}
    >
      <div className={classes.modal} onMouseDown={(e) => e.stopPropagation()}>
        <header className={classes.header}>
          <div className={classes.headerTitles}>
            <div className={classes.title}>Relatório</div>
            <div className={classes.subtitle}>
              Selecione os relatórios e veja uma pré-visualização antes de gerar
            </div>
          </div>

          <button
            type="button"
            className={classes.closeBtn}
            onClick={onClose}
            aria-label="Fechar"
            title="Fechar"
          >
            ×
          </button>
        </header>

        <Divider
          className={{ alignSelf: "stretch", left: "unset", top: "unset" }}
          style={{ width: "100%" }}
          color="secondary-pure"
          orientation="horizontal"
          size="large"
          theme="light"
        />

        <div className={classes.body}>
          <aside className={classes.leftPane}>
            <div className={classes.blockTitle}>Tipos de relatório</div>

            <label className={classes.checkRow}>
              <input
                type="checkbox"
                checked={selected.audit}
                onChange={() => toggle("audit")}
              />
              <span>{REPORT_LABEL.audit}</span>
            </label>

            <label className={classes.checkRow}>
              <input
                type="checkbox"
                checked={selected.users}
                onChange={() => toggle("users")}
              />
              <span>{REPORT_LABEL.users}</span>
            </label>

            <label className={classes.checkRow}>
              <input
                type="checkbox"
                checked={selected.email}
                onChange={() => toggle("email")}
              />
              <span>{REPORT_LABEL.email}</span>
            </label>

            <label className={classes.checkRow}>
              <input
                type="checkbox"
                checked={selected.contracts}
                onChange={() => toggle("contracts")}
              />
              <span>{REPORT_LABEL.contracts}</span>
            </label>

            <div className={classes.blockSpacer} />

            <div className={classes.blockTitle}>Período</div>
            <div className={classes.twoCols}>
              <label className={classes.field}>
                <span>De</span>
                <input
                  className={classes.input}
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  max={dateTo}
                />
              </label>

              <label className={classes.field}>
                <span>Até</span>
                <input
                  className={classes.input}
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  min={dateFrom}
                  max={todayISO()}
                />
              </label>
            </div>

            <div className={classes.blockSpacer} />

            <div className={classes.blockTitle}>Formato</div>
            <div className={classes.formatRow}>
              <label className={classes.radioRow}>
                <input
                  type="radio"
                  name="format"
                  checked={format === "pdf"}
                  onChange={() => setFormat("pdf")}
                />
                <span>PDF</span>
              </label>
              <label className={classes.radioRow}>
                <input
                  type="radio"
                  name="format"
                  checked={format === "csv"}
                  onChange={() => setFormat("csv")}
                />
                <span>CSV</span>
              </label>
            </div>
            {!canGenerate && (
              <div className={classes.hint}>
                Selecione pelo menos 1 relatório para habilitar a geração.
              </div>
            )}
            <div className={classes.footer}>
              <Button
                text1="Gerar"
                theme="light"
                status={canGenerate ? "active" : "disabled"}
                onClick={handleGenerate}
              />
            </div>
          </aside>

          <main className={classes.rightPane}>
            <div className={classes.previewHeader}>
              <div className={classes.previewTitle}>Pré-visualização</div>
              <div className={classes.previewMeta}>
                {selectedKeys.length ? (
                  <>
                    <span className={classes.pill}>
                      {selectedKeys.length} selecionado(s)
                    </span>
                    <span className={classes.pill}>
                      {payload.period.from} → {payload.period.to}
                    </span>
                    <span className={classes.pill}>
                      {payload.format.toUpperCase()}
                    </span>
                  </>
                ) : (
                  <span className={classes.previewEmpty}>
                    Nada selecionado ainda
                  </span>
                )}
              </div>
            </div>

            <div className={classes.previewBox}>
              {selectedKeys.length === 0 ? (
                <div className={classes.previewPlaceholder}>
                  Marque um ou mais tipos de relatório à esquerda para ver o
                  preview.
                </div>
              ) : (
                <div className={classes.previewScroll}>
                  {selectedKeys.includes("audit") && (
                    <section className={classes.section}>
                      <div className={classes.sectionTitle}>Auditoria</div>
                      <table className={classes.table}>
                        <thead>
                          <tr>
                            <th>Data/Hora</th>
                            <th>Ação</th>
                            <th>Usuário</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>2026-01-13 09:12</td>
                            <td>Exportou relatório</td>
                            <td>Administrador</td>
                          </tr>
                          <tr>
                            <td>2026-01-13 08:50</td>
                            <td>Aplicou filtro</td>
                            <td>Victor</td>
                          </tr>
                          <tr>
                            <td>2026-01-12 18:22</td>
                            <td>Visualizou contrato</td>
                            <td>Auditor</td>
                          </tr>
                        </tbody>
                      </table>
                    </section>
                  )}

                  {selectedKeys.includes("users") && (
                    <section className={classes.section}>
                      <div className={classes.sectionTitle}>Usuários</div>
                      <table className={classes.table}>
                        <thead>
                          <tr>
                            <th>Usuário</th>
                            <th>Status</th>
                            <th>Perfil</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Maria S.</td>
                            <td>Online</td>
                            <td>Usuário</td>
                          </tr>
                          <tr>
                            <td>João P.</td>
                            <td>Offline</td>
                            <td>Gerente Regional</td>
                          </tr>
                          <tr>
                            <td>Ana C.</td>
                            <td>Online</td>
                            <td>Auditor</td>
                          </tr>
                        </tbody>
                      </table>
                    </section>
                  )}

                  {selectedKeys.includes("email") && (
                    <section className={classes.section}>
                      <div className={classes.sectionTitle}>E-mail</div>
                      <table className={classes.table}>
                        <thead>
                          <tr>
                            <th>Data</th>
                            <th>Destinatários</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>2026-01-13</td>
                            <td>admins@…</td>
                            <td>Enviado</td>
                          </tr>
                          <tr>
                            <td>2026-01-12</td>
                            <td>usuarios@…</td>
                            <td>Enviado</td>
                          </tr>
                          <tr>
                            <td>2026-01-11</td>
                            <td>auditoria@…</td>
                            <td>Falhou</td>
                          </tr>
                        </tbody>
                      </table>
                    </section>
                  )}

                  {selectedKeys.includes("contracts") && (
                    <section className={classes.section}>
                      <div className={classes.sectionTitle}>
                        Monitoramento de Contratos
                      </div>
                      <table className={classes.table}>
                        <thead>
                          <tr>
                            <th>Contrato</th>
                            <th>Fornecedor</th>
                            <th>Situação</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>CT-10293</td>
                            <td>Fornecedor A</td>
                            <td>Ativo</td>
                          </tr>
                          <tr>
                            <td>CT-10210</td>
                            <td>Fornecedor B</td>
                            <td>A vencer</td>
                          </tr>
                          <tr>
                            <td>CT-10001</td>
                            <td>Fornecedor C</td>
                            <td>Vencido</td>
                          </tr>
                        </tbody>
                      </table>
                    </section>
                  )}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
