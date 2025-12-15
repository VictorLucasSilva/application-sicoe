import { type JSX } from "react";
import classes from "./style.module.css";

import { PageTitle } from "../../general-components/PageTitle";
import { ContractHomeTitle1, ContractHomeTitle2} from "../../general-components/IconPage";
import { Filter } from  "../../components/Filter"
 
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
      <section className={classes.section}>
        <header className={classes.sectionHeader}>
          <div className={classes.sectionTitleWrapper}>
              <PageTitle
                text="Situação dos Contratos"
                theme="light"
                icon={<ContractHomeTitle1 />}
                className={classes.title}
              />
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

      <section className={classes.section}>
        <header className={classes.sectionHeader}>
          <div className={classes.sectionTitleWrapper}>
              <PageTitle
                text="Contratos com Fornecedores"
                theme="light"
                
                icon={<ContractHomeTitle2 />}
                className={classes.title}
              />
          </div>
        </header>
          <Filter/>
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
