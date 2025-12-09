// src/mod-general-structure/components/components/Table/Row/index.tsx
import { type JSX } from "react";
import { TableCell } from "../../TableCell";
import classes from "./style.module.css";
import estuser from "../../../../assets/icons/icon-no-mod/no-mod-user-estab-plus.svg";
import update from "../../../../../../public/icons/pen.svg";
import exclude from "../../../../assets/icons/icon-no-mod/no-mod-user-block.svg";

const rows = Array.from({ length: 10 });

export const RowTableAudit = (): JSX.Element => {
  return (
    <div className={classes.tableBody}>
      {rows.map((_, index) => (
        <div key={index} className={classes.row}>
          <TableCell spacing="default" text="Texto" type="text-1-line" />
          <TableCell spacing="default" text="Texto" type="text-1-line" />
          <TableCell spacing="default" text="Tag Label" type="tag-label" />
          <TableCell spacing="default" text="Texto" type="text-1-line" />
          <TableCell spacing="default" text="Texto" type="text-1-line" />
          <TableCell
            spacing="small"
            text="dd/mm/aaaa"
            secondaryText="mm:ss"
            type="text-2-lines"
          />
        </div>
      ))}
    </div>
  );
};

export const RowTableEmail = (): JSX.Element => {
  return (
    <div className={classes.tableBody}>
      {rows.map((_, index) => (
        <div key={index} className={classes.rowemail}>
          <TableCell spacing="default" text="Texto" type="text-1-line" />
          <TableCell spacing="default" text="Texto" type="text-1-line" />
          <TableCell spacing="default" text="Texto" type="text-1-line" />
          <TableCell spacing="default" text="Texto" type="text-1-line" />
          <TableCell
            spacing="small"
            text="dd/mm/aaaa"
            secondaryText="mm:ss"
            type="text-2-lines"
          />
        </div>
      ))}
    </div>
  );
};

/* ---- USERS ---- */

type RowTableUserProps = {
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  onRelationClick?: () => void; // 👈 NOVO
};

export const RowTableUser = ({
  onEditClick,
  onDeleteClick,
  onRelationClick,
}: RowTableUserProps): JSX.Element => {
  return (
    <div className={classes.tableBody}>
      {rows.map((_, index) => (
        <div key={index} className={classes.rowUser}>
          {/* Nome */}
          <TableCell spacing="default" text="Texto" type="text-1-line" />
          {/* Usuário */}
          <TableCell spacing="default" text="Texto" type="text-1-line" />
          {/* UOR */}
          <TableCell spacing="default" text="Texto" type="text-1-line" />
          {/* Perfil - Tag Label preta */}
          <div className={classes.tagCell}>
            <span className={classes.tagLabel}>Tag Label</span>
          </div>
          {/* Status - radio + texto */}
          <div className={classes.statusCell}>
            <input
              type="radio"
              className={classes.statusRadio}
              defaultChecked
            />
            <span className={classes.statusLabel}>Ativo</span>
          </div>
          {/* Fim da Vigência */}
          <TableCell spacing="default" text="dd/mm/aaaa" type="text-1-line" />
          {/* Ícones de ação */}
          <div className={classes.actionsCell}>
            <img
              src={estuser}
              alt="Estabelecimentos do usuário"
              className={classes.actionIcon}
              onClick={onRelationClick} // 👈 ABRE MODAL DE RELAÇÃO
            />
            <img
              src={update}
              alt="Editar usuário"
              className={classes.actionIcon}
              onClick={onEditClick}
            />
            <img
              src={exclude}
              alt="Excluir usuário"
              className={classes.actionIcon}
              onClick={onDeleteClick}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
