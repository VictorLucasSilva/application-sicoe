import { type JSX } from "react";
import classes from "./style.module.css";
import vector from "../../../assets/icons/icon-no-mod/no-mod-login-avatar.svg"

type SidebarIconProps = {
  color?: "low";
  size?: "small";
}

export const SidebarIcon = ({}:SidebarIconProps): JSX.Element => {
  return (
    <div className={classes.container}>
      <img className={classes.image} alt="Vector" src={vector} />
    </div>
  );
};
