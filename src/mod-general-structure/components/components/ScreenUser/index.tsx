import { type JSX } from "react";

import { PageTitle } from "../PageTitle";
import { TableHeader } from "../Table/Header";
import { RowTableUser } from "../Table/Row";
import { Pagination } from "../Pagination";
import { Divider } from "../../general-components/Divider";
import { ButtonIcon } from "../ButtonIcon";
import { IconB } from "../ButtonIcon/IconB";
import { UserTitleIcon } from "../IconPage";

import classes from "./style.module.css";

export const ScreenUser = (): JSX.Element => {
  return (
    <div className={classes.screen}>
      <div className={classes.wrapper}>
        <PageTitle
          text="Gerenciar Usuário"
          theme="light"
          icon={<UserTitleIcon />}
          className={classes.title}
        />
        <div className={classes.tableCard}>
          <TableHeader />
          <RowTableUser />
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
          <ButtonIcon
            text="Liberar Acesso"
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

export const Screen = ScreenUser;
