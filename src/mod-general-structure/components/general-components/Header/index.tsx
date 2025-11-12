import PropTypes from "prop-types";
import { type JSX } from "react";
import { Divider } from "../Divider";
import { Logo } from "../Logo";
import { Text } from "../Text";
import area2 from "../../../assets/images/Lock.svg";
import area3 from "../../../assets/images/Lock.svg";
import area4 from "../../../assets/images/Lock.svg";
import area5 from "../../../assets/images/Lock.svg";
import area6 from "../../../assets/images/Lock.svg";
import area from "../../../assets/images/Avatar.svg";
import image from "../../../../../public/images/Logotipo.svg";
import classes from "./styles.module.css";
import vector5 from "../../../../../public/images/Logotipo.svg";
interface Props {
  theme: "dark" | "light";
  type: "cont" | "login" | "main" | "estab";
  className: any;
  logotipoVector: string;
}
export const Header = ({
  theme,
  type,
  className,
  logotipoVector = "vector.svg",
}: Props): JSX.Element => {
  return (
    <div
      className={`${classes.header} ${classes[`header-${theme}`]} ${
        classes[`header-${type}`]
      } ${classes[`header-${theme}-${type}`]}`}
      style={className}
    >
      {" "}
      <div
        className={`${classes.headerContent} ${
          classes[`headerContent-${type}`]
        }`}
      >
        {" "}
        {["cont", "estab", "main"].includes(type) && (
          <>
            {" "}
            <div className={classes.leftSection}>
              {" "}
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
              )}{" "}
              {theme === "light" && type === "main" && (
                <>
                  {" "}
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
                  />{" "}
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
                  />{" "}
                </>
              )}{" "}
              {theme === "dark" && ["cont", "estab"].includes(type) && (
                <div className={classes.titleContainer}>
                  {" "}
                  <div className={classes.titleDark}>
                    {" "}
                    {type === "estab" && <>Controle de Estabelecimentos</>}{" "}
                    {type === "cont" && <>Monitoramento de Contratos</>}{" "}
                  </div>{" "}
                </div>
              )}{" "}
              {theme === "dark" && type === "main" && (
                <>
                  {" "}
                  <div className={classes.logoContainer}>
                    {" "}
                    <img
                      className={classes.vectorImage}
                      alt="Vector"
                      src={vector5}
                    />{" "}
                  </div>{" "}
                  <div className={classes.titleContainer}>
                    {" "}
                    <div className={classes.titleDark}>SICOE</div>{" "}
                  </div>{" "}
                </>
              )}{" "}
            </div>{" "}
            <div className={classes.spacer} />{" "}
          </>
        )}{" "}
        {(type === "cont" ||
          type === "estab" ||
          type === "main" ||
          (theme === "dark" && type === "login")) && (
          <div
            className={`${classes.rightSection} ${
              classes[`rightSection-${type}`]
            }`}
          >
            {" "}
            {["cont", "estab", "main"].includes(type) && (
              <>
                {" "}
                <div className={classes.areaContainer}>
                  {" "}
                  <div className={classes.areaTextWrapper}>
                    {" "}
                    <div className={classes.areaText}>Área Gerencial</div>{" "}
                    <div
                      className={`${classes.areaIcon} ${
                        classes[`areaIcon-${theme}-${type}`]
                      }`}
                    />{" "}
                  </div>{" "}
                </div>{" "}
                <div className={classes.divider} />{" "}
                <div className={classes.areaImageWrapper}>
                  {" "}
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
                  />{" "}
                </div>{" "}
              </>
            )}{" "}
            {type === "login" && (
              <img className={classes.loginImage} alt="Vector" src={image} />
            )}{" "}
          </div>
        )}{" "}
        {theme === "light" && type === "login" && (
          <>
            {" "}
            <Logo
              application="internal"
              className={{ flex: "0 0 auto", left: "unset", top: "unset" }}
              color="secondary"
              orientation="vertical"
              size="smaller"
              vector={logotipoVector}
            />{" "}
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
            />{" "}
          </>
        )}{" "}
        {theme === "dark" && type === "login" && (
          <div className={classes.titleContainer}>
            {" "}
            <div className={classes.titleDark}>SICOE</div>{" "}
          </div>
        )}{" "}
      </div>{" "}
      <Divider
        className={
          theme === "dark" && type === "login"
            ? {
                alignSelf: "stretch",
                backgroundColor: "var(--colors-brand-primary-light)",
                left: "unset",
                marginTop: "-2px",
                top: "unset",
                width: "100%",
              }
            : {
                alignSelf: "stretch",
                backgroundColor: "var(--colors-brand-primary-light)",
                left: "unset",
                marginTop: "-2px",
                top: "unset",
                width: "100%",
              }
        }
        style={{ width: "100%" }}
        color="secondary-pure"
        orientation="horizontal"
        size="large"
        theme="light"
      />{" "}
      <div className={classes.bbDivider} aria-hidden />
    </div>
  );
};
Header.propTypes = {
  theme: PropTypes.oneOf(["dark", "light"]),
  type: PropTypes.oneOf(["cont", "login", "main", "estab"]),
  logotipoVector: PropTypes.string,
};
