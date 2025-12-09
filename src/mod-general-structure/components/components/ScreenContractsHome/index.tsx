import { type JSX } from "react";
import classes from "./style.module.css";

import polygonIcon from "../../../../../public/icons/search.svg"
import searchIcon from "../../../../../public/icons/search.svg"
import filterIcon from "../../../../../public/icons/filter.svg"

const statusCards = [
  { label: "Ativos" },
  { label: "Com saldo" },
  { label: "Sem saldo" },
  { label: "A Vencer" },
  { label: "Vencido" },
];
import { SubsectionBarCard } from "../SubsectionBarCard";

const contracts = Array.from({ length: 40 }, (_, index) => ({ id: index + 1 }));



export const ScreenContractsHome = (): JSX.Element => {
  return (
    <div className={classes.screen}>
      {/* Situação dos contratos */}
      <section className={classes.section}>
        <header className={classes.sectionHeader}>
          <div className={classes.sectionTitleWrapper}>
            <span className={classes.sectionMarker}>
              <img src={polygonIcon} alt="" />
            </span>
            <h2 className={classes.sectionTitle}>Situação dos Contratos</h2>
          </div>
        </header>

        <div className={classes.statusGrid}>
          {statusCards.map((item) => (
            <article key={item.label} className={classes.statusCard}>
              <div className={classes.statusValue}>99</div>
              <div className={classes.statusLabel}>{item.label}</div>
            </article>
          ))}
        </div>
      </section>

      {/* Contratos com Fornecedores */}
      <section className={classes.section}>
        <header className={classes.sectionHeader}>
          <div className={classes.sectionTitleWrapper}>
            <span className={classes.sectionMarker}>
              <img src={polygonIcon} alt="" />
            </span>
            <h2 className={classes.sectionTitle}>Contratos com Fornecedores</h2>
          </div>
        </header>

        <div className={classes.searchRow}>
          <div className={classes.searchInput}>
            <img src={searchIcon} alt="" className={classes.searchIcon} />
            <input placeholder="Buscar..." />
          </div>

          <button type="button" className={classes.filterButton}>
            <img src={filterIcon} alt="" className={classes.filterIcon} />
            <span>Exibir filtros</span>
            <span className={classes.filterBadge}>1</span>
          </button>
        </div>

        <div className={classes.subsectionListOuter}>
          <div className={classes.subsectionListScroll}>
            {contracts.map((contract) => (
              <SubsectionBarCard key={contract.id} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
