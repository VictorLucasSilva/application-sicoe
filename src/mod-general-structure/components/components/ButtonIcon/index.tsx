import PropTypes from "prop-types";
import { type JSX } from "react";
import { IconB } from "../ButtonIcon/IconB";
import classes from "./style.module.css";
interface Props {
  text: string;
  className: any;
  icon: JSX.Element;
  textClassName: any;
}
export const ButtonIcon = ({
  text = "button",
  className,
  icon = (
    <IconB
      className={{ height: "24px", position: "relative", width: "24px" }}
    />
  ),
  textClassName,
}: Props): JSX.Element => {
  return (
    <button className={classes.button} style={className}>
      {" "}
      {icon}{" "}
      <div className={classes.text} style={textClassName}>
        {" "}
        {text}{" "}
      </div>{" "}
    </button>
  );
};
ButtonDefault.propTypes = { text: PropTypes.string };
