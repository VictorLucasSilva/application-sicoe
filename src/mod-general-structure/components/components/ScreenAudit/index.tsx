// src/mod-general-structure/components/components/ScreenAudit/index.tsx
import { type JSX } from "react";

import { PageTitle } from "../PageTitle";
import { TableHeader } from "../Table/Header";
import { RowTableAudit } from "../Table/Row";
import { Pagination } from "../Pagination";
import { Divider } from "../../general-components/Divider";
import { ButtonIcon } from "../ButtonIcon";
import { IconB } from "../ButtonIcon/IconB";

import classes from "./style.module.css";

// components/ScreenAudit/index.tsx
export const ScreenAudit = (): JSX.Element => {
  return (
    <div className={classes.screen}>
      <div className={classes.wrapper}>
        <PageTitle
          text="Auditoria"
          theme="light"
          polygon="image.svg"
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
          size="medium"
          theme="light"
          orientation="horizontal"
          color="secondary-pure"
          style={{ width: "100%", marginTop: 8 }}
        />

        <div className={classes.footerArea}>
          <ButtonIcon
            text="VOLTAR"
            icon={<IconB />}
            className={{
              display: "inline-flex",
              paddingInline: 24,
              paddingBlock: 10,
            }}
            textClassName={{}}
          />
        </div>
      </div>
    </div>
  );
};


export const Screen = ScreenAudit;
