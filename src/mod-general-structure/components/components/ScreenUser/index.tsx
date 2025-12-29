import { type JSX, useState } from "react";
import { PageTitle } from "../../general-components/PageTitle";
import { TableHeaderUser } from "../Table/Header";
import { RowTableUser } from "../Table/Row";
import { Pagination } from "../Pagination";
import { Divider } from "../../general-components/Divider";
import { ButtonIcon } from "../../general-components/ButtonIcon";
import { IconB } from "../../general-components/ButtonIcon/IconB";
import { Button } from "../../general-components/Button";
import { UserTitleIcon } from "../../general-components/IconPage";
import { ModalWriteUserUpdate } from "../Modais/ModalWrite/UserUpdate";
import { ModalWriteUserRelation } from "../Modais/ModalWrite/UserRelation";
import { UserUpdConfirmation } from "../Modais/ModalConfirmation/UserUpdConfirmation";
import { UserDelConfirmation } from "../Modais/ModalConfirmation/UserDelConfirmation";
import { UserRelConfirmation } from "../Modais/ModalConfirmation/UserRelConfirmation";
import { ModalUserFilter } from "../../components/Modais/ModalFilter/User";
import add from "../../../../../public/icons/plus.svg";

import classes from "./style.module.css";
import { Filter } from "../Filter";

export const ScreenUser = (): JSX.Element => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRelationModalOpen, setIsRelationModalOpen] = useState(false);
  const [isRelationConfirmModalOpen, setIsRelationConfirmModalOpen] =
    useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const openEditModal = (): void => setIsEditModalOpen(true);
  const closeEditModal = (): void => setIsEditModalOpen(false);

  const handleSaveFromEditModal = (): void => {
    setIsEditModalOpen(false);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmUpdate = (): void => setIsConfirmModalOpen(false);

  const openDeleteModal = (): void => setIsDeleteModalOpen(true);
  const closeDeleteModal = (): void => setIsDeleteModalOpen(false);
  const handleConfirmDelete = (): void => setIsDeleteModalOpen(false);

  const openRelationModal = (): void => setIsRelationModalOpen(true);
  const closeRelationModal = (): void => setIsRelationModalOpen(false);

  const handleSaveFromRelationModal = (): void => {
    setIsRelationModalOpen(false);
    setIsRelationConfirmModalOpen(true);
  };

  const handleConfirmRelation = (): void => setIsRelationConfirmModalOpen(false);

  const openFilterModal = (): void => setIsFilterModalOpen(true);
  const closeFilterModal = (): void => setIsFilterModalOpen(false);
  const handleSaveFromFilterModal = (): void => setIsFilterModalOpen(false);

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

          <Filter onFilterClick={openFilterModal} className={classes.filter} />
        </div>

        <div className={classes.tableCard}>
          <TableHeaderUser />
          <RowTableUser
            onEditClick={openEditModal}
            onDeleteClick={openDeleteModal}
            onRelationClick={openRelationModal}
          />
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
            className={{ marginLeft: 0 }}
            icon={<IconB className={{ width: 32, height: 32 }} />}
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

      {isFilterModalOpen && (
        <ModalUserFilter onClose={closeFilterModal} onSave={handleSaveFromFilterModal} />
      )}

      {isEditModalOpen && (
        <ModalWriteUserUpdate onClose={closeEditModal} onSave={handleSaveFromEditModal} />
      )}

      {isConfirmModalOpen && (
        <UserUpdConfirmation onConfirm={handleConfirmUpdate} onClose={handleConfirmUpdate} />
      )}

      {isDeleteModalOpen && (
        <UserDelConfirmation onConfirm={handleConfirmDelete} onClose={closeDeleteModal} />
      )}

      {isRelationModalOpen && (
        <ModalWriteUserRelation onClose={closeRelationModal} onSave={handleSaveFromRelationModal} />
      )}

      {isRelationConfirmModalOpen && (
        <UserRelConfirmation onConfirm={handleConfirmRelation} onClose={handleConfirmRelation} />
      )}
    </div>
  );
};

export const Screen = ScreenUser;
