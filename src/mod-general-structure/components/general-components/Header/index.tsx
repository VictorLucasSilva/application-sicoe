import PropTypes from "prop-types";
import { type JSX, useEffect, useRef, useState } from "react";

import { Divider } from "../Divider";
import { Logo } from "../Logo";
import { Text } from "../Text";

import area2 from "../../../assets/icons/icon-no-mod/no-mod-login-lock.svg";
import area3 from "../../../assets/icons/icon-no-mod/no-mod-login-avatar.svg";
import area4 from "../../../assets/icons/icon-no-mod/no-mod-login-lock.svg";
import area5 from "../../../assets/icons/icon-no-mod/no-mod-login-lock.svg";
import area6 from "../../../assets/icons/icon-no-mod/no-mod-login-avatar.svg";
import area from "../../../assets/icons/icon-no-mod/no-mod-login-avatar.svg";

// ícones do dropdown (lado esquerdo)
import iconUsers from "../../../assets/icons/icon-no-mod/no-mod-title_user.svg";
import iconEmail from "../../../assets/icons/icon-no-mod/no-mod-title-email.svg";
import iconAudit from "../../../assets/icons/icon-no-mod/no-mod-title-audit.svg";

import classes from "./styles.module.css";

interface Props {
  theme: "dark" | "light";
  type: "cont" | "login" | "main" | "estab";
  className: any;
  logotipoVector: string;
}

type AreaMenuKey = "users" | "emails" | "audit";

type AreaGerencialDropdownProps = {
  onSelect: (key: AreaMenuKey) => void;
};

const AreaGerencialDropdown = ({
  onSelect,
}: AreaGerencialDropdownProps): JSX.Element => {
  return (
    <div className={classes.areaDropdown} role="menu" aria-label="Área gerencial">
      <button
        type="button"
        className={classes.areaDropdownItem}
        role="menuitem"
        onClick={() => onSelect("users")}
      >
        <img className={classes.areaDropdownIcon} src={iconUsers} alt="" />
        <span className={classes.areaDropdownText}>Gerenciar Usuários</span>
      </button>

      <button
        type="button"
        className={classes.areaDropdownItem}
        role="menuitem"
        onClick={() => onSelect("emails")}
      >
        <img className={classes.areaDropdownIcon} src={iconEmail} alt="" />
        <span className={classes.areaDropdownText}>Envio de Emails</span>
      </button>

      <button
        type="button"
        className={classes.areaDropdownItem}
        role="menuitem"
        onClick={() => onSelect("audit")}
      >
        <img className={classes.areaDropdownIcon} src={iconAudit} alt="" />
        <span className={classes.areaDropdownText}>Logs para Auditoria</span>
      </button>
    </div>
  );
};

export const Header = ({
  theme,
  type,
  className,
  logotipoVector = "vector.svg",
}: Props): JSX.Element => {
  const [isAreaOpen, setIsAreaOpen] = useState(false);
  const areaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent): void => {
      const target = e.target as Node | null;
      if (!target) return;
      if (areaRef.current && !areaRef.current.contains(target)) {
        setIsAreaOpen(false);
      }
    };

    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "Escape") setIsAreaOpen(false);
    };

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const handleAreaSelect = (key: AreaMenuKey): void => {
    setIsAreaOpen(false);

    // ✅ aqui você liga com sua navegação/rota depois (se quiser)
    // Ex:
    // if (key === "users") window.location.href = "/user";
    // if (key === "emails") window.location.href = "/email";
    // if (key === "audit") window.location.href = "/audit";
    console.log("Área Gerencial:", key);
  };

  return (
    <div
      className={`${classes.header} ${classes[`header-${theme}`]} ${
        classes[`header-${type}`]
      } ${classes[`header-${theme}-${type}`]}`}
      style={className}
    >
      <div
        className={`${classes.headerContent} ${
          classes[`headerContent-${type}`]
        }`}
      >
        {["cont", "estab", "main"].includes(type) && (
          <>
            <div className={classes.leftSection}>
              {theme === "light" && ["cont", "estab"].includes(type) && (
                <Text
                  className={{
                    display: "inline-flex",
                    flex: "0 0 auto",
                    left: "unset",
                    top: "unset",
                    width: "unset",
                  }}
                  color="high-primary"
                  size="XXX-huge"
                  text={
                    type === "cont"
                      ? "Monitoramento de Contratos"
                      : "Controle de Estabelecimentos"
                  }
                  textClassName={{
                    alignSelf: "unset",
                    color: "var(--colors-brand-secondary-pure)",
                    fontFamily: "'BancoDoBrasil Titulos-Medium', Helvetica",
                    fontSize: "24px",
                    fontStyle: "unset",
                    fontWeight: "500",
                    letterSpacing: "0",
                    lineHeight: "29.8px",
                    whiteSpace: "nowrap",
                    width: "fit-content",
                  }}
                  type="title"
                  weight="n-a"
                />
              )}

              {theme === "light" && type === "main" && (
                <>
                  <Logo
                    application="internal"
                    className={{
                      flex: "0 0 auto",
                      left: "unset",
                      top: "unset",
                    }}
                    color="secondary"
                    orientation="vertical"
                    size="smaller"
                    vector="vector-3.svg"
                  />
                  <Text
                    className={{
                      display: "inline-flex",
                      flex: "0 0 auto",
                      left: "unset",
                      top: "unset",
                      width: "unset",
                    }}
                    color="high-primary"
                    size="XXX-huge"
                    text="SICOE"
                    textClassName={{
                      alignSelf: "unset",
                      color: "var(--colors-brand-secondary-pure)",
                      fontFamily: "'BancoDoBrasil Titulos-Medium', Helvetica",
                      fontSize: "24px",
                      fontStyle: "unset",
                      fontWeight: "500",
                      letterSpacing: "0",
                      lineHeight: "29.8px",
                      whiteSpace: "nowrap",
                      width: "fit-content",
                    }}
                    type="title"
                    weight="n-a"
                  />
                </>
              )}

              {theme === "dark" && ["cont", "estab"].includes(type) && (
                <div className={classes.titleContainer}>
                  <div className={classes.titleDark}>
                    {type === "estab" && <>Controle de Estabelecimentos</>}
                    {type === "cont" && <>Monitoramento de Contratos</>}
                  </div>
                </div>
              )}

              {theme === "dark" && type === "main" && (
                <>
                  <div className={classes.logoContainer}>
                    <img
                      className={classes.vectorImage}
                      alt="Vector"
                      src="../../../../../public/icons/logo-yellow.svg"
                    />
                  </div>
                  <div className={classes.titleContainer}>
                    <div className={classes.titleDark}>SICOE</div>
                  </div>
                </>
              )}
            </div>
            <div className={classes.spacer} />
          </>
        )}

        {(type === "cont" ||
          type === "estab" ||
          type === "main" ||
          (theme === "dark" && type === "login")) && (
          <div
            className={`${classes.rightSection} ${
              classes[`rightSection-${type}`]
            }`}
          >
            {["cont", "estab", "main"].includes(type) && (
              <>
                <div className={classes.areaDropdownWrapper} ref={areaRef}>
                  <button
                    type="button"
                    className={classes.areaTrigger}
                    onClick={() => setIsAreaOpen((v) => !v)}
                    aria-haspopup="menu"
                    aria-expanded={isAreaOpen}
                  >
                    <span className={classes.areaText}>Área Gerencial</span>
                  </button>

                  {isAreaOpen && (
                    <AreaGerencialDropdown onSelect={handleAreaSelect} />
                  )}
                </div>

                <div className={classes.divider} />

                <div className={classes.areaImageWrapper}>
                  <img
                    className={classes.areaImage}
                    alt="Area"
                    src={
                      type === "cont" && theme === "light"
                        ? area3
                        : theme === "light" && type === "main"
                        ? area4
                        : type === "estab" && theme === "dark"
                        ? area5
                        : type === "cont" && theme === "dark"
                        ? area6
                        : theme === "dark" && type === "main"
                        ? area
                        : area2
                    }
                  />
                </div>
              </>
            )}

            {type === "login" && (
              <img
                className={classes.loginImage}
                alt="Vector"
                src="../../../../../public/icons/logo-yellow.svg"
              />
            )}
          </div>
        )}

        {theme === "light" && type === "login" && (
          <>
            <Logo
              application="internal"
              className={{ flex: "0 0 auto", left: "unset", top: "unset" }}
              color="secondary"
              orientation="vertical"
              size="smaller"
              vector={logotipoVector}
            />
            <Text
              className={{
                display: "inline-flex",
                flex: "0 0 auto",
                left: "unset",
                top: "unset",
                width: "unset",
              }}
              color="high-primary"
              size="XXX-huge"
              text="SICOE"
              textClassName={{
                alignSelf: "unset",
                color: "var(--colors-brand-secondary-pure)",
                fontFamily: "'BancoDoBrasil Titulos-Medium', Helvetica",
                fontSize: "24px",
                fontStyle: "unset",
                fontWeight: "500",
                letterSpacing: "0",
                lineHeight: "29.8px",
                whiteSpace: "nowrap",
                width: "fit-content",
              }}
              type="title"
              weight="n-a"
            />
          </>
        )}

        {theme === "dark" && type === "login" && (
          <div className={classes.titleContainer}>
            <div className={classes.titleDark}>SICOE</div>
          </div>
        )}
      </div>

      <Divider
        className={{
          alignSelf: "stretch",
          backgroundColor: "var(--colors-brand-primary-light)",
          left: "unset",
          marginTop: "-2px",
          top: "unset",
          width: "100%",
        }}
        style={{ width: "100%" }}
        color="secondary-pure"
        orientation="horizontal"
        size="large"
        theme="light"
      />
      <div className={classes.bbDivider} aria-hidden />
    </div>
  );
};

Header.propTypes = {
  theme: PropTypes.oneOf(["dark", "light"]),
  type: PropTypes.oneOf(["cont", "login", "main", "estab"]),
  logotipoVector: PropTypes.string,
};
