import { type JSX } from "react";
import { ArrowDropDown } from "../../../ArrowDropdown";
import { Button } from "../../../../general-components/Button";
import { Divider } from "../../../../general-components/Divider";
import { IconClear } from "../../../../general-components/IconSvg/IconClear";
import { IconCheck } from "../../../../general-components/IconSvg/IconCheck";
import { ChipOld } from "./ChipOld";
import linha from "./linha.svg";
import classes from "./style.module.css";

export const ModalWriteUserRelation = (): JSX.Element => {
  return (
    <div className={classes.modal}>
      <header className={classes.header}>        
        <div className={classes.headerTop}>
          <div className={classes.title}>Acesso aos Estabelecimentos</div>
        </div>
        <Divider
          className={{
            alignSelf: "stretch",
            left: "unset",
            top: "unset",
            width: "100%",
          }}
          color="low-lighter"
          orientation="horizontal"
          size="small"
          theme="light"
        />
      </header>
      <div className={classes.content}>
        <div className={classes.userLabel}>Usuário</div>
        <div className={classes.dropdownWrapper}>
          <div className={classes.dropdownInput}>
            <div className={classes.dropdownLabel}>
              Dropdown com múltipla seleção
            </div>
            <div className={classes.dropdownChips}>
              
              <ChipOld
                avatar="off"
                className={{ flex: "0 0 auto", left: "unset", top: "unset" }}
                icon="off"
                status="active"
                text="Opção 2"
                theme="light"
                type="input"
              />
              <div className={classes.spacer} />
              <IconClear
                className={{
                  height: "24px",
                  position: "relative",
                  width: "24px",
                }}
                opacity="0.65"
              />
              <ArrowDropDown
                className={{
                  height: "24px",
                  position: "relative",
                  width: "24px",
                }}
              />
            </div>
          </div>
          <img className={classes.linha} alt="Linha" src={linha} />
          <div className={classes.dropdownMenu}>
            
            <div className={classes.dropdownMenuInner}>
              
              <div className={classes.dropdownOption}>
                
                <div className={classes.optionText}>Opção 1</div>
              </div>
              <div className={classes.dropdownOptionSelected}>
                
                <div className={classes.optionText}>
                  Opção 2 já selecionada
                </div>
                <IconCheck
                  className={{
                    height: "24px",
                    position: "relative",
                    width: "24px",
                  }}
                  color="#7B8CFF"
                />
              </div>
              <div className={classes.dropdownOption}>
                
                <div className={classes.optionText}>Opção 3</div>
              </div>
              <div className={classes.dropdownOption}>
                
                <div className={classes.optionText}>Opção 4</div>
              </div>
              <div className={classes.dropdownOption}>
                
                <div className={classes.optionText}>Opção 5</div>
              </div>
              <div className={classes.dropdownOption}>
                
                <div className={classes.optionText}>Opção 6</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className={classes.footer}>
        
        <Divider
          className={{
            alignSelf: "stretch",
            left: "unset",
            top: "unset",
            width: "100%",
          }}
          color="low-lighter"
          orientation="horizontal"
          size="small"
          theme="light"
        />
        <div className={classes.footerButtons}>
          
          <Button
            className={{ flex: "0 0 auto", left: "unset", top: "unset" }}
            hierarchy="primary"
            icon="off"
            size="small"
            status="default"
            text="on"
            text1="SALVAR"
            theme="light"
          />
        </div>
      </footer>
    </div>
  );
};
