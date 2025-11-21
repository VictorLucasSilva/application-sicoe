// src/mod-general-structure/components/components/ScreenUser/index.tsx
import { type JSX } from "react";

import { PageTitle } from "../PageTitle";
import { TableHeaderUser } from "../Table/Header";
import { RowTableUser } from "../Table/Row";
import { Pagination } from "../Pagination";
import { Divider } from "../../general-components/Divider";
import { ButtonIcon } from "../ButtonIcon";
import { IconB } from "../ButtonIcon/IconB";
import { Button } from "../../general-components/Button";
import { UserTitleIcon } from "../IconPage";

import search from "../../../../../public/images/search.svg";
import fill from "../../../../../public/images/Filter.svg";
import add from "../../../assets/images/add.svg"

import classes from "./style.module.css";

export const ScreenUser = (): JSX.Element => {
  return (
    <div className={classes.screen}>
      <div className={classes.wrapper}>
        <div className={classes.topRow}>
          <PageTitle
            text="Gerenciar Usuários"
            theme="light"
            icon={<UserTitleIcon />}
            className={classes.title}
          />

          <div className={classes.searchFilterGroup}>
            <div className={classes.searchWrapper}>
              <div className={classes.searchIconWrapper}>
                <img src={search} alt="" className={classes.searchIcon} />
              </div>
              <input
                className={classes.searchInput}
                type="text"
                placeholder="Buscar..."
              />
            </div>

            <button className={classes.filterButton} type="button">
              <img src={fill} alt="" className={classes.filterIconImg} />
              <span className={classes.filterText}>Exibir filtros</span>
              <span className={classes.filterBadge}>1</span>
            </button>
          </div>
        </div>

        <div className={classes.tableCard}>
          <TableHeaderUser />
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
          style={{ width: "100%"}}
        />

        <div className={classes.footerArea}>
          <ButtonIcon
            text="VOLTAR"
            className={{
              marginLeft: 0,
            }}
            icon={
              <IconB
                className={{
                  width: 32,
                  height: 32,
                }}
              />
            }
          />

          <Button
            className={classes.newUserButton}
            text1="CADASTRAR NOVO USUÁRIO"
            iconLeft={
              <img
                src={add}
                alt=""
                width={40}
                height={40}
                className={classes.newUserInlineIcon}
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

export const Screen = ScreenUser;
