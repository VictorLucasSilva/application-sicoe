import { type JSX } from "react";
import { UserTitleIcon } from "../../general-components/IconPage";
import { AuditTitleIcon } from "../../general-components/IconPage";
import { EmailTitleIcon } from "../../general-components/IconPage";
import { Text } from "../Text";
import polygon1 from "./polygon-1.svg";
import classes from "./style.module.css";
export const MenuGerencial = (): JSX.Element => {
  return (
    <div className={classes.container}>
      {" "}
      <div className={classes.polygonWrapper}>
        {" "}
        <img className={classes.polygon} alt="Polygon" src={polygon1} />{" "}
      </div>{" "}
      <div className={classes.menu}>
        {" "}
        <div className={classes.topBorder} />{" "}
        <div className={classes.menuItem}>
          {" "}
          <AuditTitleIcon
            className={{ height: "24px", position: "relative", width: "24px" }}
            color="white"
            opacity="0.85"
          />{" "}
          <Text
            className={{
              flex: "1",
              flexGrow: "1",
              left: "unset",
              top: "unset",
              width: "unset",
            }}
            color="high-primary"
            size="medium"
            text="Gerenciar Usuários"
            textClassName={{
              alignSelf: "unset",
              whiteSpace: "nowrap",
              width: "fit-content",
            }}
            type="text"
            weight="semibold"
          />{" "}
        </div>{" "}
        <div className={classes.menuItem}>
          {" "}
          <EmailTitleIcon
            className={{ height: "24px", position: "relative", width: "24px" }}
            color="white"
            opacity="0.85"
          />{" "}
          <Text
            className={{
              flex: "1",
              flexGrow: "1",
              left: "unset",
              top: "unset",
              width: "unset",
            }}
            color="high-primary"
            size="medium"
            text="Envio de Emails"
            textClassName={{
              alignSelf: "unset",
              whiteSpace: "nowrap",
              width: "fit-content",
            }}
            type="text"
            weight="semibold"
          />{" "}
        </div>{" "}
        <div className={classes.menuItem}>
          {" "}
          <UserTitleIcon
            className={{ height: "24px", position: "relative", width: "24px" }}
            color="white"
            opacity="0.85"
          />{" "}
          <Text
            className={{
              flex: "1",
              flexGrow: "1",
              left: "unset",
              top: "unset",
              width: "unset",
            }}
            color="high-primary"
            size="medium"
            text="Logs para Auditoria"
            textClassName={{
              alignSelf: "unset",
              whiteSpace: "nowrap",
              width: "fit-content",
            }}
            type="text"
            weight="semibold"
          />{" "}
        </div>{" "}
        <div className={classes.bottomBorder} />{" "}
      </div>{" "}
    </div>
  );
};
