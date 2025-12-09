import { useEffect } from 'react';
import { Header } from "../../components/general-components/Header";
import { Screen } from "../../components/components/ScreenLogin";
import { Footer } from "../../components/general-components/Footer";
import classes from "./styles.module.css";

export function Login() {
  useEffect(() => { document.title = 'SICOE - Sistema de Controle de Estabelecimento'; }, []);

  return (
    <div className={classes.page}>
      <Header theme="dark" type="login" className={{}} logotipoVector="vector-4.svg" />
      <main className={classes.main}>
        <Screen />
      </main>
      <Footer />
    </div>
  );
}