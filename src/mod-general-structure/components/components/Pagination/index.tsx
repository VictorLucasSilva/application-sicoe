// src/mod-general-structure/components/components/Pagination/index.tsx
import { type CSSProperties, type JSX } from "react";
import { ArrowDropDown } from "../ArrowDropdown";
import { PagerAssets } from "../PagerAssets";
import image from "../../../assets/images/Lock.svg";
import linha2 from "../../../assets/images/Lock.svg";
import linha3 from "../../../assets/images/Lock.svg";
import classes from "./style.module.css";

type Props = {
  type?: "desktop" | "mobile";
  theme?: "dark" | "light";
  style?: CSSProperties;
  registrosStyle?: CSSProperties;
  pagesStyle?: CSSProperties;
};

export const Pagination = ({
  type = "desktop",
  theme = "light",
  style,
  registrosStyle,
  pagesStyle,
}: Props): JSX.Element => {
  return (
    <div
      className={`${classes.pager} ${classes[`pager--${type}`]}`}
      style={style}
    >
      {/* DESKTOP – igual ao layout da imagem */}
      {type === "desktop" && (
        <>
          <div className={classes.registros} style={registrosStyle}>
            <div
              className={`${classes.registrosText} ${
                classes[`registrosText--${theme}`]
              }`}
            >
              Registros por página
            </div>

            <div className={classes.dropdown}>
              <div className={classes.dropdownInner}>
                <div className={classes.dropdownContent}>
                  <div
                    className={`${classes.dropdownValue} ${
                      classes[`dropdownValue--${theme}`]
                    }`}
                  >
                    10
                  </div>
                  <div className={classes.dropdownSpacer} />
                  <ArrowDropDown
                    className={{
                      height: "24px",
                      position: "relative",
                      width: "24px",
                    }}
                  />
                </div>
              </div>
              <img
                className={classes.dropdownLine}
                alt="Linha"
                src={theme === "dark" ? linha2 : image}
              />
            </div>

            <p
              className={`${classes.registrosInfo} ${
                classes[`registrosInfo--${theme}`]
              }`}
            >
              Exibindo 10 registros de 140
            </p>
          </div>

          <div className={classes.pages} style={pagesStyle}>
            <PagerAssets type="navigate-left" theme={theme} />
            <PagerAssets type="selected-page" theme={theme} text="1" />
            <PagerAssets type="default-page" theme={theme} text="2" />
            <PagerAssets type="default-page" theme={theme} text="3" />
            <PagerAssets type="default-page" theme={theme} text="4" />
            <PagerAssets type="default-page" theme={theme} text="5" />
            <PagerAssets type="continuation" theme={theme} />
            <PagerAssets type="default-page" theme={theme} text="17" />
            <PagerAssets type="navigate-right" theme={theme} />
          </div>
        </>
      )}

      {/* MOBILE – deixa como estava, só acertando tipos */}
      {type === "mobile" && (
        <>
          <div
            className={`${classes.mobileRegistros} ${
              classes[`mobileRegistros--${theme}`]
            }`}
          >
            17 registros de 30
          </div>

          <div className={classes.mobileDropdown}>
            <div className={classes.mobileDropdownInner}>
              <div className={classes.mobileDropdownContent}>
                <div
                  className={`${classes.mobileDropdownValue} ${
                    classes[`mobileDropdownValue--${theme}`]
                  }`}
                >
                  Página 1
                </div>
                <ArrowDropDown
                  className={{
                    height: "24px",
                    position: "relative",
                    width: "24px",
                  }}
                />
              </div>
            </div>
            <img
              className={classes.mobileDropdownLine}
              alt="Linha"
              src={theme === "dark" ? linha3 : image}
            />
          </div>
        </>
      )}
    </div>
  );
};
