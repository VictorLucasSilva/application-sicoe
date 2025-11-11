import { type JSX }from "react";
import { CardHome } from "../CardHome";
import { SizeXxLargeColorBrandPrimary } from "./SizeXxLargeColorBrandPrimary";
import { SizeXxLargeColorPrimary } from "./SizeXxLargeColorPrimary";
import classes from "./style.module.css";
export const Screen = (): JSX.Element => {
  return (
    <div className={classes.container}>
      {" "}
      <div className={classes.background}>
        {" "}
        <CardHome
          className={{
            alignSelf: "start",
            gap: "8px",
            gridColumn: "8 / 16",
            gridRow: "8 / 22",
            height: "100%",
            justifySelf: "start",
            left: "unset",
            minHeight: "400px",
            top: "unset",
            width: "100%",
          }}
          icon={
            <SizeXxLargeColorPrimary
              className={{
                height: "128px",
                marginTop: "-8.38px",
                position: "relative",
                width: "128px",
              }}
            />
          }
          secondaryContent="Monitor de Notas Fiscais, Contratos com Fornecedores e PCA"
          status="active"
          textClassName={{ marginBottom: "unset" }}
          textClassNameOverride={{ marginBottom: "-5.38px" }}
          theme="light"
          titleLabel="Monitoramento de Contratos"
        />{" "}
        <CardHome
          className={{
            alignSelf: "start",
            gap: "8px",
            gridColumn: "18 / 26",
            gridRow: "8 / 22",
            height: "100%",
            justifySelf: "start",
            left: "unset",
            minHeight: "400px",
            top: "unset",
            width: "100%",
          }}
          icon={
            <SizeXxLargeColorBrandPrimary
              className={{
                height: "128px",
                marginTop: "-8.38px",
                position: "relative",
                width: "128px",
              }}
            />
          }
          secondaryContent="Gestão de Documentos, Unidades e Localidades Físicas da Empresa"
          status="active"
          textClassName={{ marginBottom: "unset" }}
          textClassNameOverride={{ marginBottom: "-5.38px" }}
          theme="light"
          titleLabel="Controle de Estabelecimentos"
        />{" "}
        <div className={classes.headerContainer}>
          {" "}
          <p className={classes.headerText}>
            {" "}
            <span className={classes.welcomeText}>Bem Vindo </span>{" "}
            <span className={classes.nameText}>nome completo</span>{" "}
            <span className={classes.welcomeText}>!</span>{" "}
            <span className={classes.breakText}>
              {" "}
              <br />{" "}
            </span>{" "}
            <span className={classes.selectText}>Selecione o módulo:</span>{" "}
          </p>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
