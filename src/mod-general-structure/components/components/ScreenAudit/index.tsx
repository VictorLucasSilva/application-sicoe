import { type JSX } from "react";
import { IconB } from "../ButtonIcon/IconB";
import { ButtonIcon } from "../ButtonIcon";
import { Divider } from "../../general-components/Divider";
import { RowTableAudit } from "../Table/Row"
import { Pagination } from "../Pagination";
import { PageTitle } from "../PageTitle";
import { HeaderTableAudit } from "../Table/Header";
import classes from "./index.module.css";
export const Screen = (): JSX.Element => {
  return (
    <div className={classes.screenContainer}>
      {" "}
      <div className={classes.mainGrid}>
        {" "}
        <PageTitle
          className={{
            alignSelf: "end",
            gridColumn: "3 / 10",
            gridRow: "2 / 3",
            height: "100%",
            justifySelf: "start",
            left: "unset",
            top: "unset",
            width: "100%",
          }}
          divClassName={{ marginBottom: "-5.40px", marginTop: "-7.40px" }}
          groupClassName={{ marginBottom: "-2.40px", marginTop: "-2.40px" }}
          iconerSizeMediumColorClassName={{
            backgroundImage: "url(assured-workload.svg)",
            left: "20px",
            position: "absolute",
            top: "0",
          }}
          polygon="image.svg"
          text="Auditoria"
          theme="light"
        />{" "}
        <HeaderTableAudit /> <RowTableAudit />{" "}
        <div className={classes.dividerContainer}>
          {" "}
          <Divider
            className={{
              alignSelf: "stretch",
              backgroundColor: "var(--colors-brand-primary-pure)",
              left: "unset",
              top: "unset",
              width: "100%",
            }}
            color="secondary-pure"
            orientation="horizontal"
            size="medium"
            theme="light"
          />{" "}
        </div>{" "}
        <ButtonIcon
          buttonDefaultIcon={
            <IconB
              className={{
                height: "24px",
                position: "relative",
                width: "24px",
              }}
              color="white"
            />
          }
          buttonDefaultText="VOLTAR"
          className={{
            alignItems: "center",
            alignSelf: "end",
            display: "flex",
            gridColumn: "4 / 7",
            gridRow: "22 / 24",
            height: "100%",
            justifySelf: "start",
            left: "unset",
            top: "unset",
            width: "100%",
          }}
          hierarchy="primary"
          icon="on"
          size="small"
          status="default"
          text="on"
          theme="light"
        />{" "}
        <Pagination />{" "}
      </div>{" "}
    </div>
  );
};
