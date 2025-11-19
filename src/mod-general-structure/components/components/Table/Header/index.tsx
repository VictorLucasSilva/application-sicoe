import { type JSX } from "react";
import { IconTableHeader } from "../../IconTableHeader";
import classes from "./style.module.css";

export const TableHeader = (): JSX.Element => {
  return (
    <div className={classes.container}>
      <div className={classes.cell}>
        <div className={classes.label}>ID</div>
        <IconTableHeader className={classes.icon} />
      </div>
      <div className={classes.cell}>
        <div className={classes.label}>Login</div>
        <IconTableHeader className={classes.icon} />
      </div>
      <div className={classes.cell}>
        <div className={classes.label}>Perfil</div>
        <IconTableHeader className={classes.icon} />
      </div>
      <div className={classes.cell}>
        <div className={classes.label}>Ação</div>
        <IconTableHeader className={classes.icon} />
      </div>
      <div className={classes.cell}>
        <div className={classes.label}>Objeto</div>
        <IconTableHeader className={classes.icon} />
      </div>
      <div className={classes.cell}>
        <div className={classes.label}>Data/Hora</div>
        <IconTableHeader className={classes.icon} />
      </div>
    </div>
  );
};

export const TableHeaderEmail = (): JSX.Element => {
  return (
    <div className={classes.container}>
      <div className={classes.cellemail}>
        <div className={classes.label}>ID</div>
        <IconTableHeader className={classes.icon} />
      </div>
      <div className={classes.cellemail}>
        <div className={classes.label}>Tipo</div>
        <IconTableHeader className={classes.icon} />
      </div>
      <div className={classes.cellemail}>
        <div className={classes.label}>Objeto</div>
        <IconTableHeader className={classes.icon} />
      </div>
      <div className={classes.cellemail}>
        <div className={classes.label}>Destino</div>
        <IconTableHeader className={classes.icon} />
      </div>
      <div className={classes.cellemail}>
        <div className={classes.label}>Data de Envio</div>
        <IconTableHeader className={classes.icon} />
      </div>
    </div>
  );
};

export const TableHeaderUser = (): JSX.Element => {
  return (
    <div className={classes.container}>
      <div className={classes.celluser}>
        <div className={classes.label}>Nome</div>
        <IconTableHeader className={classes.icon} />
      </div>
      <div className={classes.celluser}>
        <div className={classes.label}>Usuário</div>
        <IconTableHeader className={classes.icon} />
      </div>
      <div className={classes.celluser}>
        <div className={classes.label}>UOR</div>
        <IconTableHeader className={classes.icon} />
      </div>
      <div className={classes.celluser}>
        <div className={classes.label}>Perfil</div>
        <IconTableHeader className={classes.icon} />
      </div>
      <div className={classes.celluser}>
        <div className={classes.label}>Status</div>
        <IconTableHeader className={classes.icon} />
      </div>
      <div className={classes.celluser}>
        <div className={classes.label}>Fim da Vigência</div>
        <IconTableHeader className={classes.icon} />
      </div>
      {/* Coluna de ícones (sem label) */}
      <div className={classes.celluser}>
        <div className={classes.label}></div>
      </div>
    </div>
  );
};