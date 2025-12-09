import { type JSX } from "react";
import { Button } from "../../general-components/Button";
import { Divider } from "../../general-components/Divider";
import image from "../../../assets/icons/icon-no-mod/no-mod-login-person.svg";
import classes from "./styles.module.css";
import vector2 from "../../../assets/icons/icon-no-mod/no-mod-login-lock.svg";
import vector3 from "../../../assets/icons/icon-no-mod/no-mod-login-eye.svg";
import vector4 from "../../../assets/icons/icon-no-mod/no-mod-login-eye.svg";
import vector from "../../../assets/icons/icon-no-mod/no-mod-login-person.svg";

export const Screen = (): JSX.Element => {
  return (
    <div className={classes.screenWrapper}>
      <div className={classes.screenContainer}>
        <div className={classes.card}>
          <header className={classes.header}>
            <div className={classes.headerTitle}>Log In</div>
          </header>

          <div className={classes.dividerWrapper}>
            <Divider
              style={{ width: "99%" }}
              color="low-lighter"        
              orientation="horizontal"
              size="small"
              theme="light"
            />
          </div>

          <div className={classes.contentWrapper}>
            <div className={classes.inputContainer}>
              <div className={`${classes.inputContent} ${classes.inputActive}`}>
                <div className={classes.iconWrapper}>
                  <img className={classes.vectorIcon} alt="Vector" src={vector} />
                  <img className={classes.imageIcon}  alt="Vector" src={image} />
                </div>
                <p className={classes.inputText}>
                  <span className={classes.inputCursor}>|</span>
                  <span className={classes.inputPlaceholder}> Placeholder </span>
                </p>
                <div className={classes.inputSpacer} />
              </div>
            </div>

            <div className={classes.passwordContainer}>
              <div className={classes.passwordContent}>
                <div className={classes.passwordIconWrapper}>
                  <img className={classes.passwordIcon} alt="Vector" src={vector2} />
                </div>
                <div className={classes.passwordLabel}>Senha</div>
                <div className={classes.passwordSpacer} />
                <div className={classes.passwordVisibilityWrapper}>
                  <img className={classes.passwordVisibilityIcon1} alt="Vector" src={vector3} />
                  <img className={classes.passwordVisibilityIcon2} alt="Vector" src={vector4} />
                </div>
              </div>
              <div className={classes.passwordHint}>
                <p className={classes.passwordHintText}>
                  Senha de 8 caracteres, com números e letras.
                </p>
              </div>
            </div>
          </div>

          <div className={classes.footer}>
            <Button
              className={{
                alignItems: "center",
                flex: "0 0 auto",
                justifyContent: "center",
                left: "unset",
                top: "unset",
              }}
              hierarchy="secondary"
              icon="off"
              size="default"
              status="default"
              text="on"
              text1="ENTRAR"
              theme="light"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
