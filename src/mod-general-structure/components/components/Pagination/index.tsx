// src/mod-general-structure/components/components/Pagination/index.tsx
import { type CSSProperties, type JSX } from "react";
import { ArrowDropDown } from "../ArrowDropdown";
import { PagerAssets } from "../PagerAssets";
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
            <span
              className={`${classes.registrosText} ${
                classes[`registrosText--${theme}`]
              }`}
            >
              Registros por página
            </span>

            {/* seletor "10" com linha embaixo */}
            <div className={classes.dropdown}>
              <div className={classes.dropdownInner}>
                <span
                  className={`${classes.dropdownValue} ${
                    classes[`dropdownValue--${theme}`]
                  }`}
                >
                  10
                </span>

                <ArrowDropDown
                  className={{
                    height: "16px",
                    width: "16px",
                    position: "relative",
                  }}
                />
              </div>
            </div>

            <p
              className={`${classes.registrosInfo} ${
                classes[`registrosInfo--${theme}`]
              }`}
            >
              Exibindo 10 registros de 140
            </p>
          </div>

          {/* bolinhas da paginação à direita */}
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

      {/* MOBILE – mantido, só tipagem/código limpo */}
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
                <span
                  className={`${classes.mobileDropdownValue} ${
                    classes[`mobileDropdownValue--${theme}`]
                  }`}
                >
                  Página 1
                </span>
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
              src={linha3}
            />
          </div>
        </>
      )}
    </div>
  );
};
