import { type JSX} from "react";
import type { ReactNode } from "react";
import { IconClose } from "../../../../general-components/IconSvg/IconClose";
import { Divider } from "../../../../general-components/Divider";
import classes from "./style.module.css";

type ModalHeaderProps = {
  className?: string;
  children?: ReactNode;
};

export const ModalHeader = ({ className, children }: ModalHeaderProps): JSX.Element => {
  return (
    <div className={`${classes.header} ${className ?? ""}`}>
      <div className={classes.headerContent}>
        <div className={classes.title}>{children}</div>
        <IconClose
          className={{ height: "24px", position: "relative", width: "24px" }}
          opacity="0.65"
        />
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
