import { type JSX } from "react";
import { ModalHeader } from "../../components/components/Modais/MadalConfirmation/ModalHeader";
import { ModalScreen } from "../../components/components/Modais/MadalConfirmation/ModalScreen";
import { ModalFooter } from "../../components/components/Modais/MadalConfirmation/ModalFooter";
import { IconClose } from "../../components/general-components/IconSvg/IconClose";
import { Divider } from "../../components/general-components/Divider";
import { Button } from "../../components/general-components/Button";
import classes from "./style.module.css"


export const ModalUserRelation = (): JSX.Element => {
  return (
    <>
      <ModalHeader>
        <>
          <span>Confirmar Ação</span>
          <IconClose className={{ height: 24, width: 24 }} />
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
      <ModalFooter>
        <Button
          className={classes.button}
          hierarchy="primary"
          icon="off"
          size="small"
          status="default"
          text="on"
          text1="CONFIRMAR"
          theme="light" />
      </ModalFooter>
    </>
  );
};
