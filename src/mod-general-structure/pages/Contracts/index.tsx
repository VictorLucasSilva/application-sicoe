import { useEffect } from "react";
import { Header } from "../../components/general-components/Header";
import { Footer } from "../../components/general-components/Footer";
import { HubContractHome } from "../../components/components/HubContractHome";
import classes from "./style.module.css";

export function ContratosHome() {
  useEffect(() => {
    document.title = "SICOE - Sistema de Controle de Estabelecimento";
  }, []);

  return (
    <div className={classes.page}>
      <Header theme="dark" type="cont" className={{}} logotipoVector="vector-4.svg" />
      <main className={classes.main}>
        <HubContractHome />
      </main>
      <Footer />
    </div>
  );
}
