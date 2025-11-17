import { useEffect } from "react";
import { Header } from "../../components/general-components/Header";
import { Footer } from "../../components/general-components/Footer";
import { ScreenEmail } from "../../components/components/ScreenEmail";
import classes from "./styles.module.css";

export function Email() {
  useEffect(() => {
    document.title = "SICOE - Sistema de Controle de Estabelecimento";
  }, []);

  return (
    <div className={classes.page}>
      <Header theme="dark" type="main" className={{}} logotipoVector="vector-4.svg" />
      <main className={classes.main}>
        <ScreenEmail />
      </main>
      <Footer />
    </div>
  );
}
