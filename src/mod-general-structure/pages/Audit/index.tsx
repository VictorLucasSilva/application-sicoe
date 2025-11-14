import { useEffect } from "react";
import { Header } from "../../components/general-components/Header";
import { Footer } from "../../components/general-components/Footer";
import { ScreenAudit } from "../../components/components/ScreenAudit";
import classes from "./styles.module.css";

export function Audit() {
  useEffect(() => {
    document.title = "SICOE - Sistema de Controle de Estabelecimento";
  }, []);

  return (
    <div className={classes.page}>
      <Header theme="dark" type="main" className={{}} logotipoVector="vector-4.svg" />
      <main className={classes.main}>
        <ScreenAudit />
      </main>
      <Footer />
    </div>
  );
}
