import { useState, type JSX } from "react";
import classes from "./style.module.css";

import { PageTitle } from "../../general-components/PageTitle";
import { ContractHomeTitle1, ContractHomeTitle2 } from "../../general-components/IconPage";
import { Filter } from "../../components/Filter";

import { ModalContractFilter } from "../../components/Modais/ModalFilter/ContractsHome";
import { SubsectionBarCard } from "../SubsectionBarCard";

import { ModalInfoContract } from "../Modais/ModalConfirmation/InfoContract";
import { ModalWriteNewProcess } from "../Modais/ModalConfirmation/StartNewProcess";

const statusCards = [
  { label: "Ativos" },
  { label: "Com saldo" },
  { label: "Sem saldo" },
  { label: "A Vencer" },
  { label: "Vencido" },
];

const contracts = Array.from({ length: 40 }, (_, index) => ({ id: index + 1 }));

export const ScreenContractsHome = (): JSX.Element => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const [isInfoContractModalOpen, setIsInfoContractModalOpen] = useState(false);
  const [isStartProcessModalOpen, setIsStartProcessModalOpen] = useState(false);

  const openFilterModal = (): void => setIsFilterModalOpen(true);
  const closeFilterModal = (): void => setIsFilterModalOpen(false);
  const handleSaveFromFilterModal = (): void => setIsFilterModalOpen(false);

  const openInfoContractModal = (): void => setIsInfoContractModalOpen(true);
  const closeInfoContractModal = (): void => setIsInfoContractModalOpen(false);
  const handleSaveFromInfoContractModal = (): void => setIsInfoContractModalOpen(false);

  // ✅ ao clicar "INICIAR PROCESSO": fecha InfoContract e abre StartNewProcess
  const openStartProcessFromInfo = (): void => {
    setIsInfoContractModalOpen(false);
    setIsStartProcessModalOpen(true);
  };

  const closeStartProcessModal = (): void => {
    setIsStartProcessModalOpen(false);
  };

  // ✅ botão "Voltar" do StartNewProcess abre o InfoContract de novo
  const backToInfoContract = (): void => {
    setIsStartProcessModalOpen(false);
    setIsInfoContractModalOpen(true);
  };

  const handleSaveFromStartProcessModal = (): void => {
    // aqui você decide o que fazer ao salvar
    setIsStartProcessModalOpen(false);
  };

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

        <Filter onFilterClick={openFilterModal} />

        <div className={classes.subsectionListOuter}>
          <div className={classes.subsectionListScroll}>
            {contracts.map((contract) => (
              <SubsectionBarCard
                onInfoContractClick={openInfoContractModal}
                key={contract.id}
              />
            ))}
          </div>
        </div>
      </section>

      {isFilterModalOpen && (
        <ModalContractFilter onClose={closeFilterModal} onSave={handleSaveFromFilterModal} />
      )}

      {isInfoContractModalOpen && (
        <ModalInfoContract
          onClose={closeInfoContractModal}
          onSave={handleSaveFromInfoContractModal}
          onStartProcess={openStartProcessFromInfo}
        />
      )}

      {isStartProcessModalOpen && (
        <ModalWriteNewProcess
          onClose={closeStartProcessModal}
          onBackToInfo={backToInfoContract}
          onNext={handleSaveFromStartProcessModal}
        />
      )}
    </div>
  );
};
