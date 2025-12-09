import PropTypes from "prop-types";
import { type JSX } from "react";
import { ChipOld } from "../ChipOld";
import { Search } from "./Search";
import classes from "./style.module.css";
import linha2 from "./linha-2.svg";
interface Props {
  filter: "off" | "on";
  filterArea: "select-and-date-pickers" | "closed" | "chips" | "opened";
  size: "large" | "small";
  className: any;
  textInputClassName: any;
  linha: string;
  chipOldTypeTableStatusClassName: any;
}
export const TableFilterBar = ({
  filter,
  filterArea,
  size,
  className,
  textInputClassName,
  linha = "image.svg",
  chipOldTypeTableStatusClassName,
}: Props): JSX.Element => {
  return (
    <div
      className={`${classes.container} ${
        filterArea === "opened" ? classes.containerOpened : ""
      } ${
        ["chips", "closed", "select-and-date-pickers"].includes(filterArea)
          ? classes.containerWithGap
          : ""
      } ${
        filter === "off" && filterArea === "closed"
          ? classes.containerOffClosed
          : ""
      } ${
        filterArea === "select-and-date-pickers"
          ? classes.containerSelectAndDatePickers
          : ""
      } ${
        filter === "on" && filterArea === "closed" && size === "large"
          ? classes.containerOnClosedLarge
          : ""
      } ${filterArea === "chips" ? classes.containerChips : ""} ${
        filterArea === "opened" ? classes.containerOpenedTop : ""
      } ${size === "small" ? classes.containerSmall : ""} ${
        filterArea === "chips" ||
        filterArea === "select-and-date-pickers" ||
        (filterArea === "closed" && size === "large")
          ? classes.containerLargeWidth
          : ""
      } ${size === "small" ? classes.containerSmallWidth : ""}`}
      style={className}
    >
      {" "}
      {filter === "off" && <div className={classes.filterOffBox} />}{" "}
      {filterArea === "select-and-date-pickers" && (
        <>
          {" "}
          <div className={classes.selectDatePickerBox} />{" "}
          <div className={classes.selectDatePickerBox} />{" "}
        </>
      )}{" "}
      {filter === "on" && filterArea === "closed" && size === "large" && (
        <>
          {" "}
          <div className={classes.textInputWrapper} style={textInputClassName}>
            {" "}
            <div className={classes.textInputInner}>
              {" "}
              <div className={classes.searchRow}>
                {" "}
                <Search
                  className={{
                    height: "24px",
                    position: "relative",
                    width: "24px",
                  }}
                  opacity="0.25"
                />{" "}
                <div className={classes.searchPlaceholder}>Buscar...</div>{" "}
                <div className={classes.searchSpacer} />{" "}
              </div>{" "}
            </div>{" "}
            <img className={classes.linha} alt="Linha" src={linha} />{" "}
          </div>{" "}
          <ChipOld
            avatar="off"
            className={chipOldTypeTableStatusClassName}
            icon="on"
            status="active"
            theme="light"
            type="table"
          />{" "}
        </>
      )}{" "}
      {filterArea === "chips" && (
        <>
          {" "}
          <div className={classes.textInputWrapper}>
            {" "}
            <div className={classes.textInputInner}>
              {" "}
              <div className={classes.searchRow}>
                {" "}
                <Search
                  className={{
                    height: "24px",
                    position: "relative",
                    width: "24px",
                  }}
                  opacity="0.25"
                />{" "}
                <div className={classes.searchPlaceholder}>Buscar...</div>{" "}
                <div className={classes.searchSpacer} />{" "}
              </div>{" "}
            </div>{" "}
            <img className={classes.linha} alt="Linha" src={linha2} />{" "}
          </div>{" "}
          <div className={classes.chipPlaceholder} />{" "}
          <div className={classes.chipPlaceholder} />{" "}
          <div className={classes.chipPlaceholder} />{" "}
          <div className={classes.chipPlaceholder} />{" "}
          <div className={classes.chipPlaceholder} />{" "}
        </>
      )}{" "}
      {(filterArea === "opened" || size === "small") && (
        <>
          {" "}
          <div
            className={`${classes.openedSmallWrapper} ${
              filterArea === "opened" ? classes.openedWrapper : ""
            } ${size === "small" ? classes.smallWrapper : ""}`}
            style={textInputClassName}
          >
            {" "}
            {filterArea === "opened" && (
              <>
                {" "}
                <div className={classes.openedFilterBox} />{" "}
                <div className={classes.openedButton} />{" "}
              </>
            )}{" "}
          </div>{" "}
          <div
            className={`${classes.openedSmallBottom} ${
              filterArea === "opened" ? classes.openedBottom : ""
            } ${size === "small" ? classes.smallBottom : ""}`}
          >
            {" "}
            {filterArea === "opened" && (
              <>
                {" "}
                <div className={classes.openedBottomInner}>
                  {" "}
                  <div className={classes.openedBottomRow}>
                    {" "}
                    <div className={classes.openedBottomBox1} />{" "}
                    <div className={classes.openedBottomBox2} />{" "}
                  </div>{" "}
                </div>{" "}
                <div className={classes.openedBottomAction} />{" "}
              </>
            )}{" "}
          </div>{" "}
        </>
      )}{" "}
    </div>
  );
};
TableFilterBar.propTypes = {
  filter: PropTypes.oneOf(["off", "on"]),
  filterArea: PropTypes.oneOf([
    "select-and-date-pickers",
    "closed",
    "chips",
    "opened",
  ]),
  size: PropTypes.oneOf(["large", "small"]),
  linha: PropTypes.string,
};
