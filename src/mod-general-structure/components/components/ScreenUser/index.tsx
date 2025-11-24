// src/mod-general-structure/components/components/ScreenUser/index.tsx
import { type JSX, useState } from "react";

import { PageTitle } from "../PageTitle";
import { TableHeaderUser } from "../Table/Header";
import { RowTableUser } from "../Table/Row";
import { Pagination } from "../Pagination";
import { Divider } from "../../general-components/Divider";
import { ButtonIcon } from "../ButtonIcon";
import { IconB } from "../ButtonIcon/IconB";
import { Button } from "../../general-components/Button";
import { UserTitleIcon } from "../IconPage";

import { ModalWriteUserUpdate } from "../Modais/ModalWrite/UserUpdate";
import { ModalWriteUserRelation } from "../Modais/ModalWrite/UserRelation";
import { UserUpdConfirmation } from "../../components/Modais/MadalConfirmation/UserUpdConfirmation"
import { UserDelConfirmation } from "../../components/Modais/MadalConfirmation/UserDelConfirmation"
import { UserRelConfirmation } from "../../components/Modais/MadalConfirmation/UserRelConfirmation"

import search from "../../../../../public/images/search.svg";
import fill from "../../../../../public/images/Filter.svg";
import add from "../../../assets/images/add.svg";

import classes from "./style.module.css";

export const ScreenUser = (): JSX.Element => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRelationModalOpen, setIsRelationModalOpen] = useState(false); // 👈 NOVO
  const [isRelationConfirmModalOpen, setIsRelationConfirmModalOpen] =
    useState(false); // 👈 NOVO

  const openEditModal = (): void => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = (): void => {
    setIsEditModalOpen(false);
  };

  // chamado quando clicar em SALVAR dentro do modal de edição
  const handleSaveFromEditModal = (): void => {
    setIsEditModalOpen(false);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmUpdate = (): void => {
    // aqui depois você coloca a chamada de API / submit real
    setIsConfirmModalOpen(false);
  };

  // 👇 HANDLERS DE EXCLUSÃO
  const openDeleteModal = (): void => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = (): void => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = (): void => {
    // aqui entra sua chamada de API para excluir
    setIsDeleteModalOpen(false);
  };

  // 👇 HANDLERS DE RELAÇÃO (estabelecimentos)
  const openRelationModal = (): void => {
    setIsRelationModalOpen(true);
  };

  const closeRelationModal = (): void => {
    setIsRelationModalOpen(false);
  };

  const handleSaveFromRelationModal = (): void => {
    // fecha relação e abre confirmação
    setIsRelationModalOpen(false);
    setIsRelationConfirmModalOpen(true);
  };

  const handleConfirmRelation = (): void => {
    // aqui você chama a API de salvar relação se quiser
    setIsRelationConfirmModalOpen(false);
  };

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
          {/* ícone de editar chama openEditModal */}
          <RowTableUser onEditClick={openEditModal} onDeleteClick={openDeleteModal} onRelationClick={openRelationModal}/>
          
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

      {/* MODAL DE EDIÇÃO (Editar Usuário) */}
      {isEditModalOpen && (
        <ModalWriteUserUpdate
          onClose={closeEditModal}
          onSave={handleSaveFromEditModal}
        />
      )}

      {/* MODAL DE CONFIRMAÇÃO */}
      {isConfirmModalOpen && (
        <UserUpdConfirmation
          onConfirm={handleConfirmUpdate}
          onClose={handleConfirmUpdate}
        />
      )}

      {/* MODAL DE CONFIRMAÇÃO DE EXCLUSÃO */}
      {isDeleteModalOpen && (
        <UserDelConfirmation
          onConfirm={handleConfirmDelete}
          onClose={closeDeleteModal}
        />
      )}

      {/* MODAL DE RELAÇÃO DE ESTABELECIMENTOS */}
      {isRelationModalOpen && (
        <ModalWriteUserRelation
          onClose={closeRelationModal}
          onSave={handleSaveFromRelationModal}
        />
      )}

      {/* MODAL DE CONFIRMAÇÃO DA RELAÇÃO */}
      {isRelationConfirmModalOpen && (
        <UserRelConfirmation
          onConfirm={handleConfirmRelation}
          onClose={handleConfirmRelation}
        />
      )}
    </div>
  );
};

export const Screen = ScreenUser;
