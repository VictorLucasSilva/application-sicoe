import { useState, type JSX } from "react";
import { PageTitle } from "../../general-components/PageTitle";
import { TableHeaderEmail } from "../Table/Header";
import { RowTableEmail } from "../Table/Row";
import { Pagination } from "../Pagination";
import { Divider } from "../../general-components/Divider";
import { ButtonIcon } from "../../general-components/ButtonIcon";
import { IconB } from "../../general-components/ButtonIcon/IconB";
import { EmailTitleIcon } from "../../general-components/IconPage";
import { Filter } from "../../components/Filter"
import { ModalEmailFilter } from "../../components/Modais/ModalFilter/Email";

import classes from "./style.module.css";

export const ScreenEmail = (): JSX.Element => {

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false) 

  const openFilterModal = (): void => {
    setIsFilterModalOpen(true)
  }

  const closeFilterModal = (): void => {
    setIsFilterModalOpen(false);
  }

  const handleSaveFromFilterModal = (): void => {
    setIsFilterModalOpen(false);
  };

  return (
    <div className={classes.screen}>
      <div className={classes.wrapper}>
        <PageTitle
          text="Envio de E-mails"
          theme="light"
          icon={<EmailTitleIcon />}
          className={classes.title}
        />
        <Filter
          onFilterClick={openFilterModal}
        />
        <div className={classes.tableCard}>
          <TableHeaderEmail />
          <RowTableEmail />
        </div>
        <div className={classes.paginationArea}>
          <Pagination type="desktop" theme="light" />
        </div>
        <Divider
          size="small"
          theme="light"
          orientation="horizontal"
          color="primary-pure"
          style={{ width: "100%" }}
        />
        <div className={classes.footerArea}>
          <ButtonIcon
            text="VOLTAR"
            icon={
              <IconB
                className={{
                  width: 32,
                  height: 32,
                }}
              />
            }
          />
        </div>
      </div>
      {isFilterModalOpen && (
        <ModalEmailFilter
          onClose={closeFilterModal}
          onSave={handleSaveFromFilterModal}
        />
      )}
    </div>
  );
};

export const Screen = ScreenEmail;
