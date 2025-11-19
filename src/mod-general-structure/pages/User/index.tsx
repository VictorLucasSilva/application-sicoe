import { useEffect } from "react";
import { Header } from "../../components/general-components/Header";
import { Footer } from "../../components/general-components/Footer";
import { Screen } from "../../components/components/ScreenUser";
import classes from "./styles.module.css";

export function ScreenUser() {
  useEffect(() => {
    document.title = "SICOE - Sistema de Controle de Estabelecimento";
  }, []);

  return (
    <div className={classes.page}>
      <Header theme="dark" type="main" className={{}} logotipoVector="vector-4.svg" />
      <main className={classes.main}>
        <Screen />
      </main>
      <Footer />
    </div>
  );
}
