// src/mod-general-structure/components/components/Table/Row/index.tsx
import { type JSX } from "react";
import { TableCell } from "../../TableCell";
import classes from "./style.module.css";
import estuser from "../../../../assets/icons/icon-no-mod/no-mod-user-estab-plus.svg";
import update from "../../../../../../public/icons/pen.svg";
import exclude from "../../../../assets/icons/icon-no-mod/no-mod-user-block.svg";
import { Radio } from "../../Radio";

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

type RowTableUserProps = {
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  onRelationClick?: () => void; 
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
          <TableCell spacing="default" text="Texto" type="text-1-line" />
          <TableCell spacing="default" text="Texto" type="text-1-line" />
          <TableCell spacing="default" text="Texto" type="text-1-line" />
          <div className={classes.tagCell}>
            <span className={classes.tagLabel}>Tag Label</span>
          </div>
          <Radio
            label="Ativo"
          />
          <TableCell spacing="default" text="dd/mm/aaaa" type="text-1-line" />
          <div className={classes.actionsCell}>
            <img
              src={estuser}
              alt="Estabelecimentos do usuário"
              className={classes.actionIcon}
              onClick={onRelationClick} 
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
