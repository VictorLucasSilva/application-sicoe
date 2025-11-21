import { type JSX, type ReactNode } from "react";
import { Button } from "../../../../general-components/Button";
import { Divider } from "../../../../general-components/Divider";
import classes from "./style.module.css";

type ModalFooterProps = {
  className?: string;   // use lowercase `string` instead of `String`
  children?: ReactNode; // ✅ allow children
};

export const ModalFooter = ({ className, children }: ModalFooterProps): JSX.Element => {
  return (
    <div className={classes.footer}>
      <Divider
        className={classes.divider}
        color="low-lighter"
        orientation="horizontal"
        size="small"
        theme="light"
      />
      <div className={`${classes.buttonContainer} ${className}`}>
        <Button
          className={classes.button}
          hierarchy="primary"
          icon="off"
          size="small"
          status="default"
          text="on"
          text1="CONFIRMAR"
          theme="light"
        />
        {children}
      </div>
    </div>
  );
};
