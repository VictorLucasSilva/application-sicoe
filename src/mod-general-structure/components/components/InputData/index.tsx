import { type JSX } from "react";
import { IconCalendar } from "../../general-components/IconSvg/IconCalendar"
import classes from "./style.module.css";
import { Divider } from "../../general-components/Divider";

type InputDataProps = {
    title: String;
}

export const InputData = ({ title }: InputDataProps): JSX.Element => {
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.title}>{title}</div>
        <div className={classes.textFieldLabel}>Digite ou selecione uma data</div>
        <div className={classes.dateWrapper}>
          <div className={classes.dateText}>DD / MM / AAAA</div>
          <div className={classes.spacer} />
          <IconCalendar
            className={{ height: "24px", position: "relative", width: "24px" }}
            opacity="0.1"
          />
        </div>
      </div>
        <Divider
        className={{
            alignSelf: "stretch",
            left: "unset",
            top: "unset",
            width: "100%",
        }}
        color="low-lighter"
        orientation="horizontal"
        size="small"
        theme="light"
        />
    </div>
  );
};
