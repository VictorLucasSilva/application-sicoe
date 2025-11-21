import { type JSX } from "react";
import { ModalHeader } from "../../components/components/Modais/MadalConfirmation/ModalHeader";
import { ModalScreen } from "../../components/components/Modais/MadalConfirmation/ModalScreen";
import { Divider } from "../../components/general-components/Divider";
import classes from "./style.module.css"


export const ModalUserRelation = (): JSX.Element => {
  return (
    <>
      <ModalHeader>
        <>
          <span>Salvando</span>
          <Divider
            size={"small"}
            color="secondary-pure"
            orientation="horizontal"
            theme="light"
          />
        </>
      </ModalHeader>
      <ModalScreen>
        <span>Conteúdo da modal com exemplo de duas linhas de texto em uma modal de seis colunas. Botão crítico como alternativa.</span>
          <Divider
            size={"small"}
            color="secondary-pure"
            orientation="horizontal"
            theme="light"
          />
      </ModalScreen>
    </>
  );
};
