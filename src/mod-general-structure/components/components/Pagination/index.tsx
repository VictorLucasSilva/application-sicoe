import PropTypes from "prop-types";
import { type JSX } from "react";
import { ArrowDropDown } from "../ArrowDropdown";
import { ChevronLeft } from "../ChevronLeft";
import { ChevronRight } from "../ChevronRight";
import { PagerAssets } from "../PagerAssets";
import image from "../../../assets/images/Avatar.svg"
import linha2 from "../../../assets/images/Lock.svg"
import linha3 from "../../../assets/images/Person.svg"
import classes from "./style.module.css";
interface Props {
  type: "desktop" | "mobile";
  theme: "dark" | "light";
  className: any;
  registrosClassName: any;
  linha: string;
  pagesClassName: any;
  pagerAssetsTypeNavigateLeftClassName: any;
  pagerAssetsTypeNavigateLeftClassNameOverride: any;
  pagerAssetsTypeNavigateRightClassName: any;
}
export const Pagination = ({
  type,
  theme,
  className,
  registrosClassName,
  linha = "linha.svg",
  pagesClassName,
  pagerAssetsTypeNavigateLeftClassName,
  pagerAssetsTypeNavigateLeftClassNameOverride,
  pagerAssetsTypeNavigateRightClassName,
}: Props): JSX.Element => {
  return (
    <div
      className={`${classes.pager} ${classes[`pager--${type}`]} ${
        classes[`pager--${theme}`]
      } ${classes[`pager--${type}--${theme}`]}`}
      style={className}
    >
      {" "}
      {type === "desktop" && (
        <>
          {" "}
          <div className={classes.registros} style={registrosClassName}>
            {" "}
            <div
              className={`${classes.registrosText} ${
                classes[`registrosText--${theme}`]
              }`}
            >
              {" "}
              Registros por página{" "}
            </div>{" "}
            <div className={classes.dropdown}>
              {" "}
              <div className={classes.dropdownInner}>
                {" "}
                <div className={classes.dropdownContent}>
                  {" "}
                  <div
                    className={`${classes.dropdownValue} ${
                      classes[`dropdownValue--${theme}`]
                    }`}
                  >
                    {" "}
                    10{" "}
                  </div>{" "}
                  <div className={classes.dropdownSpacer} />{" "}
                  <ArrowDropDown
                    className={{
                      height: "24px",
                      position: "relative",
                      width: "24px",
                    }}
                    color={theme === "dark" ? "white" : "black"}
                    opacity="0.25"
                  />{" "}
                </div>{" "}
              </div>{" "}
              <img
                className={classes.dropdownLine}
                alt="Linha"
                src={theme === "dark" ? linha2 : linha}
              />{" "}
            </div>{" "}
            <p
              className={`${classes.registrosInfo} ${
                classes[`registrosInfo--${theme}`]
              }`}
            >
              {" "}
              Exibindo 10 registros de 140{" "}
            </p>{" "}
          </div>{" "}
          <div className={classes.pages} style={pagesClassName}>
            {" "}
            {theme === "light" && (
              <>
                {" "}
                <PagerAssets
                  chevronLeftStyleOverrideClassName={{
                    height: "24px",
                    left: "8px",
                    position: "absolute",
                    top: "8px",
                    width: "24px",
                  }}
                  className={pagerAssetsTypeNavigateLeftClassName}
                  theme="light"
                  type="navigate-left"
                />{" "}
                <PagerAssets
                  className={{ display: "unset", left: "unset", top: "unset" }}
                  dayClassName={{
                    height: "unset",
                    left: "8px",
                    marginLeft: "unset",
                    marginTop: "unset",
                    position: "absolute",
                    top: "8px",
                  }}
                  theme="light"
                  type="selected-page"
                />{" "}
                <PagerAssets
                  className={{ display: "unset", left: "unset", top: "unset" }}
                  dayClassName={{
                    height: "unset",
                    left: "8px",
                    marginLeft: "unset",
                    marginTop: "unset",
                    position: "absolute",
                    top: "8px",
                  }}
                  text="2"
                  theme="light"
                  type="default-page"
                />{" "}
                <PagerAssets
                  className={{ display: "unset", left: "unset", top: "unset" }}
                  dayClassName={{
                    height: "unset",
                    left: "8px",
                    marginLeft: "unset",
                    marginTop: "unset",
                    position: "absolute",
                    top: "8px",
                  }}
                  text="3"
                  theme="light"
                  type="default-page"
                />{" "}
                <PagerAssets
                  className={{ display: "unset", left: "unset", top: "unset" }}
                  dayClassName={{
                    height: "unset",
                    left: "8px",
                    marginLeft: "unset",
                    marginTop: "unset",
                    position: "absolute",
                    top: "8px",
                  }}
                  text="4"
                  theme="light"
                  type="default-page"
                />{" "}
                <PagerAssets
                  className={{ display: "unset", left: "unset", top: "unset" }}
                  dayClassName={{
                    height: "unset",
                    left: "8px",
                    marginLeft: "unset",
                    marginTop: "unset",
                    position: "absolute",
                    top: "8px",
                  }}
                  text="5"
                  theme="light"
                  type="default-page"
                />{" "}
                <PagerAssets
                  className={pagerAssetsTypeNavigateLeftClassNameOverride}
                  dayClassName={{
                    height: "unset",
                    left: "8px",
                    marginLeft: "unset",
                    marginTop: "unset",
                    position: "absolute",
                    top: "8px",
                  }}
                  theme="light"
                  type="continuation"
                />{" "}
                <PagerAssets
                  className={{ display: "unset", left: "unset", top: "unset" }}
                  dayClassName={{
                    height: "unset",
                    left: "8px",
                    marginLeft: "unset",
                    marginTop: "unset",
                    position: "absolute",
                    top: "8px",
                  }}
                  text="17"
                  theme="light"
                  type="default-page"
                />{" "}
                <PagerAssets
                  chevronRightStyleOverrideClassName={{
                    height: "24px",
                    position: "absolute",
                    right: "8px",
                    top: "8px",
                    width: "24px",
                  }}
                  className={pagerAssetsTypeNavigateRightClassName}
                  theme="light"
                  type="navigate-right"
                />{" "}
              </>
            )}{" "}
            {theme === "dark" && (
              <>
                {" "}
                <div className={classes.pageButton}>
                  {" "}
                  <ChevronLeft
                    className={{
                      height: "24px",
                      left: "8px",
                      position: "absolute",
                      top: "8px",
                      width: "24px",
                    }}
                    color="white"
                  />{" "}
                </div>{" "}
                <div
                  className={`${classes.pageButton} ${classes.pageButtonSelected}`}
                >
                  {" "}
                  <div className={classes.pageButtonTextSelected}>1</div>{" "}
                </div>{" "}
                <div
                  className={`${classes.pageButton} ${classes.pageButtonDefault}`}
                >
                  {" "}
                  <div className={classes.pageButtonTextDefault}>2</div>{" "}
                </div>{" "}
                <div
                  className={`${classes.pageButton} ${classes.pageButtonDefault}`}
                >
                  {" "}
                  <div className={classes.pageButtonTextDefault}>3</div>{" "}
                </div>{" "}
                <div
                  className={`${classes.pageButton} ${classes.pageButtonDefault}`}
                >
                  {" "}
                  <div className={classes.pageButtonTextDefault}>4</div>{" "}
                </div>{" "}
                <div
                  className={`${classes.pageButton} ${classes.pageButtonDefault}`}
                >
                  {" "}
                  <div className={classes.pageButtonTextDefault}>5</div>{" "}
                </div>{" "}
                <div className={classes.pageButton}>
                  {" "}
                  <div className={classes.pageContinuation}>...</div>{" "}
                </div>{" "}
                <div
                  className={`${classes.pageButton} ${classes.pageButtonDefault}`}
                >
                  {" "}
                  <div className={classes.pageButtonTextDefault}>17</div>{" "}
                </div>{" "}
                <div className={classes.pageButton}>
                  {" "}
                  <ChevronRight
                    className={{
                      height: "24px",
                      position: "absolute",
                      right: "8px",
                      top: "8px",
                      width: "24px",
                    }}
                    color="white"
                  />{" "}
                </div>{" "}
              </>
            )}{" "}
          </div>{" "}
        </>
      )}{" "}
      {type === "mobile" && (
        <>
          {" "}
          <div
            className={`${classes.mobileRegistros} ${
              classes[`mobileRegistros--${theme}`]
            }`}
          >
            {" "}
            17 registros de 30{" "}
          </div>{" "}
          <div className={classes.mobileDropdown}>
            {" "}
            <div className={classes.mobileDropdownInner}>
              {" "}
              <div className={classes.mobileDropdownContent}>
                {" "}
                <div
                  className={`${classes.mobileDropdownValue} ${
                    classes[`mobileDropdownValue--${theme}`]
                  }`}
                >
                  {" "}
                  Página 1{" "}
                </div>{" "}
                <ArrowDropDown
                  className={{
                    height: "24px",
                    position: "relative",
                    width: "24px",
                  }}
                  color={theme === "dark" ? "white" : "black"}
                  opacity="0.25"
                />{" "}
              </div>{" "}
            </div>{" "}
            <img
              className={classes.mobileDropdownLine}
              alt="Linha"
              src={theme === "dark" ? linha3 : image}
            />{" "}
          </div>{" "}
        </>
      )}{" "}
      {type === "mobile" && theme === "light" && (
        <>
          {" "}
          <PagerAssets
            chevronLeftStyleOverrideClassName={{
              height: "24px",
              left: "8px",
              position: "absolute",
              top: "8px",
              width: "24px",
            }}
            className={{ display: "unset", left: "unset", top: "unset" }}
            theme="light"
            type="navigate-left"
          />{" "}
          <PagerAssets
            chevronRightStyleOverrideClassName={{
              height: "24px",
              position: "absolute",
              right: "8px",
              top: "8px",
              width: "24px",
            }}
            className={{
              display: "unset",
              justifyContent: "unset",
              left: "unset",
              top: "unset",
            }}
            theme="light"
            type="navigate-right"
          />{" "}
        </>
      )}{" "}
      {type === "mobile" && theme === "dark" && (
        <>
          {" "}
          <div className={classes.mobilePageButton}>
            {" "}
            <ChevronLeft
              className={{
                height: "24px",
                left: "8px",
                position: "absolute",
                top: "8px",
                width: "24px",
              }}
              color="white"
            />{" "}
          </div>{" "}
          <div className={classes.mobilePageButton}>
            {" "}
            <ChevronRight
              className={{
                height: "24px",
                position: "absolute",
                right: "8px",
                top: "8px",
                width: "24px",
              }}
              color="white"
            />{" "}
          </div>{" "}
        </>
      )}{" "}
    </div>
  );
};
Pager.propTypes = {
  type: PropTypes.oneOf(["desktop", "mobile"]),
  theme: PropTypes.oneOf(["dark", "light"]),
  linha: PropTypes.string,
};
