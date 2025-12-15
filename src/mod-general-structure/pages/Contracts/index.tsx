import { useEffect } from "react";
import { Header } from "../../components/general-components/Header";
import { Footer } from "../../components/general-components/Footer";
import { ScreenContractsHome } from "../../components/components/ScreenContractsHome";
import { SidebarMenu } from "../../components/general-components/SideBar";
import classes from "./style.module.css";

export function ContratosHome() {
  useEffect(() => {
    document.title = "SICOE - Sistema de Controle de Estabelecimento";
  }, []);

  return (
    <div className={classes.page}>

      <Header
        theme="dark"
        type="cont"
        className={{}}
        logotipoVector="vector-4.svg"
      />

      <div className={classes.content}>

        <SidebarMenu
          type="cont"
          level="collapsed"
          theme="light"
          selected="home"
          className={{
            position: "relative",
            top: 0,
            left: 0,
            height: "100%",
          }}
        />

        <main className={classes.main}>
          <ScreenContractsHome />
        </main>
      </div>

      <Footer />
    </div>
  );
}
