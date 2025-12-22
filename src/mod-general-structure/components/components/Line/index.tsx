import { type JSX } from "react";
import blueLineLeft from "../../../assets/icons/icon-contract/contract-home-line-blue-left.svg";
import blueLineRight from "../../../assets/icons/icon-contract/contract-home-line-blue-right.svg";
import grayLineRight from "../../../assets/icons/icon-contract/contract-home-line-gray-left.svg";
import grayLineLeft from "../../../assets/icons/icon-contract/contract-home-line-gray-right.svg";
import classes from "./style.module.css";

export const BlueLineLeft = (): JSX.Element => {
  return (
    <div className={classes.containerBlueLeft}>
      <img className={classes.imageBlueLeft} alt="BlueLineLeft" src={blueLineLeft} />
    </div>
  );
};

export const BlueLineRight = (): JSX.Element => {
  return (
    <div className={classes.containerBlueRight}>
      <img className={classes.imageBlueRight} alt="BlueLineRight" src={blueLineRight} />
    </div>
  );
};

export const GrayLineLeft = (): JSX.Element => {
  return (
    <div className={classes.containerGrayLeft}>
      <img className={classes.imageGrayLeft} alt="GrayLineLeft" src={grayLineLeft} />
    </div>
  );
};

export const GrayLineRight = (): JSX.Element => {
  return (
    <div className={classes.containerGrayRight}>
      <img className={classes.imageGrayRight} alt="GrayLineRight" src={grayLineRight} />
    </div>
  );
};
