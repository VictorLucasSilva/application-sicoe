import { useEffect } from "react";
import { Header } from "../../components/components/Header";
import { Footer } from "../../components/components/Footer";
import { Home as HomeScreen } from "../../components/components/Home";
import classes from "./styles.module.css";

export function Home() {
  useEffect(() => {
    document.title = "SICOE - Sistema de Controle de Estabelecimento";
  }, []);

  return (
    <div className={classes.page}>
      <Header theme="dark" type="main" className={{}} logotipoVector="vector-4.svg" />

      <main className={classes.main}>
        <HomeScreen />
      </main>

      <Footer />
    </div>
  );
}
