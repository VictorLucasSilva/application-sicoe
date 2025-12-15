import type React from "react";
import classes from "./style.module.css"
import type { JSX } from "react";

type RadioProps = {
    className?: React.CSSProperties;
    label: String;
}

export const Radio = ({ label }: RadioProps): JSX.Element => {
    return (
        <div className={classes.statusCell}>
        <input
            type="radio"
            className={classes.statusRadio}
        />
        <span className={classes.statusLabel}>{label}</span>
        </div>
    );
};
