import searchIcon from "../../../../../public/icons/search.svg"
import filterIcon from "../../../../../public/icons/filter.svg"

import { type JSX } from "react";
import classes from "./style.module.css";

type FilterProps = {
    className?: string;
    onFilterClick?: () => void;
}

export const Filter = ({ onFilterClick, className }: FilterProps): JSX.Element => {
    return (
        <div className={`${classes.searchRow} ${className}`}>
          <div className={classes.searchInput}>
            <img src={searchIcon} alt="" className={classes.searchIcon} />
            <input placeholder="Buscar..." />
          </div>

          <button type="button" className={classes.filterButton} onClick={onFilterClick}>
            <img src={filterIcon} alt="" className={classes.filterIcon} />
            <span>Exibir filtros</span>
            <span className={classes.filterBadge}>1</span>
          </button>
        </div>
    );
};
