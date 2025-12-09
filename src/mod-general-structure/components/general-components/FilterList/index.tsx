import { type JSX } from "react";
import image from "../../../assets/icons/icon-contract/contract-sidebar-home.svg";
import classes from "./style.module.css";

type FilterListProps = {
  className?: string;
} 

export const FilterList = ({ className }: FilterListProps): JSX.Element => {
  return (
    <div className={`${classes.container} ${className}`}>
      {" "}
      <img className={classes.image} alt="Vector" src={image} />{" "}
    </div>
  );
};
