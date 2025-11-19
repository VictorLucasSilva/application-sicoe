import { type JSX } from "react";
import { TableCell } from "../../TableCell";
import classes from "./style.module.css";

const rows = Array.from({ length: 10 });

export const RowTableAudit = (): JSX.Element => {
  return (
    <div className={classes.tableBody}>
      {rows.map((_, index) => (
        <div key={index} className={classes.row}>
          <TableCell spacing="default" text="Texto" type="text-1-line" />
          <TableCell spacing="default" text="Texto" type="text-1-line" />
          <TableCell
            spacing="default"
            text="Tag Label"
            type="tag-label"
          />
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

export const RowTableUser = (): JSX.Element => {
  return (
    <div className={classes.tableBody}>
      {rows.map((_, index) => (
        <div key={index} className={classes.row}>
          <TableCell spacing="default" text="Texto" type="text-1-line" />
          <TableCell spacing="default" text="Texto" type="text-1-line" />
          <TableCell
            spacing="default"
            text="Tag Label"
            type="tag-label"
          />
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