import { useState, type JSX } from "react";
import classes from "./style.module.css";

import { PageTitle } from "../../general-components/PageTitle";
import { ContractHomeTitle1, ContractHomeTitle2 } from "../../general-components/IconPage";
import { Filter } from "../../components/Filter";

import { ModalContractFilter } from "../../components/Modais/ModalFilter/ContractsHome";
import { SubsectionBarCard } from "../SubsectionBarCard";
import { SubsectionCard } from "../SubsectionCard";

import { ModalInfoContract } from "../Modais/ModalConfirmation/InfoContract";
import { ModalWriteNewProcess } from "../Modais/ModalConfirmation/StartNewProcess";
import { ModalInfoProcess } from "../Modais/ModalConfirmation/InfoProcess";

import iconAtivo from "../../../assets/icons/icon-contract/c-ativo.svg";
import iconComSaldo from "../../../assets/icons/icon-contract/c-com-saldo.svg";
import iconSemSaldo from "../../../assets/icons/icon-contract/c-sem-saldo.svg";
import iconAVencer from "../../../assets/icons/icon-contract/c-a-vencer.svg";
import iconVencido from "../../../assets/icons/icon-contract/c-vencido.svg";

const statusCards = [
  { label: "Ativos", value: 99, iconSrc: iconAtivo },
  { label: "Com saldo", value: 99, iconSrc: iconComSaldo },
  { label: "Sem saldo", value: 99, iconSrc: iconSemSaldo },
  { label: "A Vencer", value: 99, iconSrc: iconAVencer },
  { label: "Vencido", value: 99, iconSrc: iconVencido },
];

const hasProcess = true;
const contracts = Array.from({ length: 40 }, (_, index) => ({ id: index + 1 }));

export const ScreenContractsHome = (): JSX.Element => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isInfoContractModalOpen, setIsInfoContractModalOpen] = useState(false);
  const [isStartProcessModalOpen, setIsStartProcessModalOpen] = useState(false);
  const [isInfoProcessModalOpen, setIsInfoProcessModalOpen] = useState(false);
  const openFilterModal = (): void => setIsFilterModalOpen(true);
  const closeFilterModal = (): void => setIsFilterModalOpen(false);
  const handleSaveFromFilterModal = (): void => setIsFilterModalOpen(false);

  const openInfoContractModal = (): void => setIsInfoContractModalOpen(true);
  const closeInfoContractModal = (): void => setIsInfoContractModalOpen(false);
  const handleSaveFromInfoContractModal = (): void => setIsInfoContractModalOpen(false);

  const openStartProcessFromInfo = (): void => {
    setIsInfoContractModalOpen(false);
    setIsInfoProcessModalOpen(false);
    setIsStartProcessModalOpen(true);
  };

  const closeStartProcessModal = (): void => {
    setIsStartProcessModalOpen(false);
  };

  const backToInfoContract = (): void => {
    setIsStartProcessModalOpen(false);
    setIsInfoProcessModalOpen(false);
    setIsInfoContractModalOpen(true);
  };

  const handleSaveFromStartProcessModal = (): void => {
    setIsStartProcessModalOpen(false);
  };

  const openInfoProcessFromInfo = (): void => {
    setIsInfoContractModalOpen(false);
    setIsStartProcessModalOpen(false);
    setIsInfoProcessModalOpen(true);
  };

  const closeInfoProcessModal = (): void => {
    setIsInfoProcessModalOpen(false);
  };

  const backToInfoContractFromProcess = (): void => {
    setIsInfoProcessModalOpen(false);
    setIsInfoContractModalOpen(true);
  };

  const handleEndProcess = (): void => {
    setIsInfoProcessModalOpen(false);
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
          <SubsectionCard items={statusCards} />
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

        <Filter onFilterClick={openFilterModal} className={classes.filter} />

        <div className={classes.subsectionListOuter}>
          <div className={classes.subsectionListScroll}>
            {contracts.map((contract) => (
              <SubsectionBarCard
                key={contract.id}
                onInfoContractClick={openInfoContractModal}
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
          processCta={hasProcess ? "details" : "start"}
          onOpenProcessDetails={openInfoProcessFromInfo}
        />
      )}

      {isStartProcessModalOpen && (
        <ModalWriteNewProcess
          onClose={closeStartProcessModal}
          onBackToInfo={backToInfoContract}
          onNext={handleSaveFromStartProcessModal}
        />
      )}

      {isInfoProcessModalOpen && (
        <ModalInfoProcess
          onClose={closeInfoProcessModal}
          onBack={backToInfoContractFromProcess}
          onEndProcess={handleEndProcess}
        />
      )}
    </div>
  );
};

