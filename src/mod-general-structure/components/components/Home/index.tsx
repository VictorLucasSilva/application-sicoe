import { type JSX } from "react";
import { CardHome } from "../CardHome";
import { LogoContracts } from "../LogoContracts";
import { LogoEstablishment } from "../LogoEstablishment";
import classes from "./styles.module.css";
import { useNavigate } from "react-router-dom";

export const ScreenHome = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <section className={classes.wrapper}>
      <header className={classes.hero}>
        <h1 className={classes.title}>
          <span className={classes.light}>Bem Vindo </span>
          <span className={classes.name}>nome completo</span>
          <span className={classes.light}>!</span>
        </h1>
        <p className={classes.subtitle}>Selecione o módulo:</p>
      </header>

      <div className={classes.grid}>
        <CardHome
          theme="light"
          status="active"
          icon={<LogoContracts className={{ height: 90, width: 90 }} color="#465EFF" />}
          titleLabel="Monitoramento de Contratos"
          secondaryContent="Monitor de Notas Fiscais, Contratos com Fornecedores e PCA"
          textClassName={{ marginBottom: 0 }}
          textClassNameOverride={{ marginTop: 8 }}
          onClick={() => navigate("/contratos/home")}
        />
        <CardHome
          theme="light"
          status="active"
          icon={<LogoEstablishment className={{ height: 90, width: 90 }} color="#465EFF" />}
          titleLabel="Controle de Estabelecimentos"
          secondaryContent="Gestão de Documentos, Unidades e Localidades Físicas da Empresa"
          textClassName={{ marginBottom: 0 }}
          textClassNameOverride={{ marginTop: 8 }}
        />
      </div>
    </section>
  );
};
