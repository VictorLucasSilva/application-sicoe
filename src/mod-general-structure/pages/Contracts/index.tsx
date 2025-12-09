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
      {/* HEADER AZUL IGUAL À MAQUETE */}
      <Header
        theme="dark"
        type="cont"
        className={{}}
        logotipoVector="vector-4.svg"
      />

      {/* ÁREA ABAIXO DO HEADER = SIDEBAR + CONTEÚDO */}
      <div className={classes.content}>
        {/* 
          Sidebar:
          - começa COLAPSADA (só ícones, como na 3ª imagem)
          - fica fixa na lateral esquerda
          - expande no hover (comportamento já implementado no componente)
        */}
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

        {/* CONTEÚDO CENTRAL (cards + lista de contratos) */}
        <main className={classes.main}>
          <ScreenContractsHome />
        </main>
      </div>

      {/* FOOTER AZUL NO RODAPÉ, COMO NA 3ª IMAGEM */}
      <Footer />
    </div>
  );
}
