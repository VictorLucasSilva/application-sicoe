import { type JSX } from "react";

import { PageTitle } from "../../general-components/PageTitle";
import { TableHeader } from "../Table/Header";
import { RowTableAudit } from "../Table/Row";
import { Pagination } from "../Pagination";
import { Divider } from "../../general-components/Divider";
import { ButtonIcon } from "../../general-components/ButtonIcon";
import { IconB } from "../../general-components/ButtonIcon/IconB";
import { AuditTitleIcon } from "../../general-components/IconPage";

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
    </div>
  );
};

export const Screen = ScreenAudit;
