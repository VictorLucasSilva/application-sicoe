import { type JSX } from "react";
import { IconTableHeader } from "../../IconTableHeader";
import classes from "./style.module.css";
export const TableHeader = (): JSX.Element => {
  return (
    <div className={classes.container}>
      {" "}
      <div className={classes.cell}>
        {" "}
        <div className={classes.label}>ID</div>{" "}
        <IconTableHeader className={classes.icon} />{" "}
      </div>{" "}
      <div className={classes.cell}>
        {" "}
        <div className={classes.label}>Login</div>{" "}
        <IconTableHeader className={classes.icon} />{" "}
      </div>{" "}
      <div className={classes.cell}>
        {" "}
        <div className={classes.label}>Perfil</div>{" "}
        <IconTableHeader className={classes.icon} />{" "}
      </div>{" "}
      <div className={classes.cell}>
        {" "}
        <div className={classes.label}>Ação</div>{" "}
        <IconTableHeader className={classes.icon} />{" "}
      </div>{" "}
      <div className={classes.cell}>
        {" "}
        <div className={classes.label}>Objeto</div>{" "}
        <IconTableHeader className={classes.icon} />{" "}
      </div>{" "}
      <div className={classes.cell}>
        {" "}
        <div className={classes.label}>Data/Hora</div>{" "}
        <IconTableHeader className={classes.icon} />{" "}
      </div>{" "}
    </div>
  );
};
