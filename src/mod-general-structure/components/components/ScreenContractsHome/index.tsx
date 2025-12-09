import { type JSX } from "react";
import { HubContractHome } from "../HubContractHome"
import { SidebarMenu } from "../../general-components/SideBar";
import classes from "./style.module.css";
export const ScreenContractsHome = (): JSX.Element => {
  return (
    <div className={classes.screen}>
      <SidebarMenu 
        type = "cont"
        level = "primary"
        theme = "dark"
        selected = "documentos"
      /> 
      <HubContractHome />
    </div>
  );
};
