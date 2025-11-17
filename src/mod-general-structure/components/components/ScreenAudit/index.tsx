// src/mod-general-structure/components/components/ScreenAudit/index.tsx
import { type JSX } from "react";

import { PageTitle } from "../PageTitle";
import { TableHeader } from "../Table/Header";
import { RowTableAudit } from "../Table/Row";
import { Pagination } from "../Pagination";
import { Divider } from "../../general-components/Divider";
import { ButtonIcon } from "../ButtonIcon";
import { IconB } from "../ButtonIcon/IconB";
import { AuditTitleIcon } from "../IconPage";

import classes from "./style.module.css";

export const ScreenAudit = (): JSX.Element => {
  return (
    <div className={classes.screen}>
      <div className={classes.wrapper}>
        <PageTitle
          text="Auditoria"
          theme="light"
          icon={<AuditTitleIcon />}
          className={classes.title}
        />
        <div className={classes.tableCard}>
          <TableHeader />
          <RowTableAudit />
        </div>
        <div className={classes.paginationArea}>
          <Pagination type="desktop" theme="light" />
        </div>
        <Divider
          size="small"
          theme="light"
          orientation="horizontal"
          color="primary-pure"
          style={{ width: "100%", marginTop: 16 }}
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
    </div>
  );
};

export const Screen = ScreenAudit;
