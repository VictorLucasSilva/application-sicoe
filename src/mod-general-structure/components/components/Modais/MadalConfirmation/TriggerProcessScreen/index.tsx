import { type JSX } from "react";
import { Divider } from "../../../../general-components/Divider";
import { Steps } from "../../../Step";
import { Text } from "../../../Text";
import classes from "./style.module.css";
export const TriggerProcessScreen = (): JSX.Element => {
  return (
    <div className={classes.container}>
      {" "}
      <div className={classes.content}>
        {" "}
        <Text
          className={{
            alignSelf: "stretch",
            flex: "0 0 auto",
            left: "unset",
            top: "unset",
            width: "100%",
          }}
          color="low-primary"
          size="x-large"
          text="Informações do Contrato"
          type="subtitle"
          weight="semibold"
        />{" "}
        <div className={classes.infoSection}>
          {" "}
          <div className={classes.infoBlock}>
            {" "}
            <div className={classes.infoItem}>
              {" "}
              <div className={classes.infoItemContent}>
                {" "}
                <div className={classes.infoRow}>
                  {" "}
                  <div className={classes.infoColumn}>
                    {" "}
                    <Text
                      className={{
                        alignSelf: "stretch",
                        flex: "0 0 auto",
                        left: "unset",
                        top: "unset",
                        width: "100%",
                      }}
                      color="low-primary"
                      size="medium"
                      text1="Texto primário"
                      type="text"
                      weight="semibold"
                    />{" "}
                  </div>{" "}
                  <div className={classes.infoValueEnd}>
                    {" "}
                    <Text
                      className={{
                        alignItems: "flex-end",
                        display: "inline-flex",
                        flex: "0 0 auto",
                        left: "unset",
                        top: "unset",
                        width: "unset",
                      }}
                      color="low-primary"
                      size="medium"
                      text1="Valor"
                      textClassName={{
                        alignSelf: "unset",
                        textAlign: "right",
                        whiteSpace: "nowrap",
                        width: "fit-content",
                      }}
                      type="text"
                      weight="regular"
                    />{" "}
                  </div>{" "}
                </div>{" "}
                <div className={classes.infoRow}>
                  {" "}
                  <div className={classes.infoColumn}>
                    {" "}
                    <Text
                      className={{
                        alignSelf: "stretch",
                        height: "24px",
                        left: "unset",
                        top: "unset",
                        width: "100%",
                      }}
                      color="low-secondary"
                      size="small"
                      text1="Texto secundário"
                      type="text"
                      weight="regular"
                    />{" "}
                  </div>{" "}
                  <div className={classes.infoValueStart}>
                    {" "}
                    <Text
                      className={{
                        alignItems: "flex-end",
                        display: "inline-flex",
                        flex: "0 0 auto",
                        left: "unset",
                        top: "unset",
                        width: "unset",
                      }}
                      color="low-secondary"
                      size="small"
                      text1="Valor"
                      textClassName={{
                        alignSelf: "unset",
                        textAlign: "right",
                        whiteSpace: "nowrap",
                        width: "fit-content",
                      }}
                      type="text"
                      weight="regular"
                    />{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <Divider
              className={{
                alignSelf: "stretch",
                left: "unset",
                marginBottom: "-0.50px",
                top: "unset",
                width: "100%",
              }}
              color="low-lighter"
              orientation="horizontal"
              size="extra-small"
              theme="light"
            />{" "}
          </div>{" "}
          <div className={classes.infoBlock}>
            {" "}
            <div className={classes.infoItem}>
              {" "}
              <div className={classes.infoItemContent}>
                {" "}
                <div className={classes.infoRow}>
                  {" "}
                  <div className={classes.infoColumn}>
                    {" "}
                    <Text
                      className={{
                        alignSelf: "stretch",
                        flex: "0 0 auto",
                        left: "unset",
                        top: "unset",
                        width: "100%",
                      }}
                      color="low-primary"
                      size="medium"
                      text1="Texto primário"
                      type="text"
                      weight="semibold"
                    />{" "}
                  </div>{" "}
                  <div className={classes.infoValueEnd}>
                    {" "}
                    <Text
                      className={{
                        alignItems: "flex-end",
                        display: "inline-flex",
                        flex: "0 0 auto",
                        left: "unset",
                        top: "unset",
                        width: "unset",
                      }}
                      color="low-primary"
                      size="medium"
                      text1="Valor"
                      textClassName={{
                        alignSelf: "unset",
                        textAlign: "right",
                        whiteSpace: "nowrap",
                        width: "fit-content",
                      }}
                      type="text"
                      weight="regular"
                    />{" "}
                  </div>{" "}
                </div>{" "}
                <div className={classes.infoRow}>
                  {" "}
                  <div className={classes.infoColumn}>
                    {" "}
                    <Text
                      className={{
                        alignSelf: "stretch",
                        height: "24px",
                        left: "unset",
                        top: "unset",
                        width: "100%",
                      }}
                      color="low-secondary"
                      size="small"
                      text1="Texto secundário"
                      type="text"
                      weight="regular"
                    />{" "}
                  </div>{" "}
                  <div className={classes.infoValueStart}>
                    {" "}
                    <Text
                      className={{
                        alignItems: "flex-end",
                        display: "inline-flex",
                        flex: "0 0 auto",
                        left: "unset",
                        top: "unset",
                        width: "unset",
                      }}
                      color="low-secondary"
                      size="small"
                      text1="Valor"
                      textClassName={{
                        alignSelf: "unset",
                        textAlign: "right",
                        whiteSpace: "nowrap",
                        width: "fit-content",
                      }}
                      type="text"
                      weight="regular"
                    />{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <Divider
              className={{
                alignSelf: "stretch",
                left: "unset",
                marginBottom: "-0.50px",
                top: "unset",
                width: "100%",
              }}
              color="low-lighter"
              orientation="horizontal"
              size="extra-small"
              theme="light"
            />{" "}
          </div>{" "}
          <div className={classes.infoBlock}>
            {" "}
            <div className={classes.infoItem}>
              {" "}
              <div className={classes.infoItemContent}>
                {" "}
                <div className={classes.infoRow}>
                  {" "}
                  <div className={classes.infoColumn}>
                    {" "}
                    <Text
                      className={{
                        alignSelf: "stretch",
                        flex: "0 0 auto",
                        left: "unset",
                        top: "unset",
                        width: "100%",
                      }}
                      color="low-primary"
                      size="medium"
                      text1="Texto primário"
                      type="text"
                      weight="semibold"
                    />{" "}
                  </div>{" "}
                  <div className={classes.infoValueEnd}>
                    {" "}
                    <Text
                      className={{
                        alignItems: "flex-end",
                        display: "inline-flex",
                        flex: "0 0 auto",
                        left: "unset",
                        top: "unset",
                        width: "unset",
                      }}
                      color="low-primary"
                      size="medium"
                      text1="Valor"
                      textClassName={{
                        alignSelf: "unset",
                        textAlign: "right",
                        whiteSpace: "nowrap",
                        width: "fit-content",
                      }}
                      type="text"
                      weight="regular"
                    />{" "}
                  </div>{" "}
                </div>{" "}
                <div className={classes.infoRow}>
                  {" "}
                  <div className={classes.infoColumn}>
                    {" "}
                    <Text
                      className={{
                        alignSelf: "stretch",
                        height: "24px",
                        left: "unset",
                        top: "unset",
                        width: "100%",
                      }}
                      color="low-secondary"
                      size="small"
                      text1="Texto secundário"
                      type="text"
                      weight="regular"
                    />{" "}
                  </div>{" "}
                  <div className={classes.infoValueStart}>
                    {" "}
                    <Text
                      className={{
                        alignItems: "flex-end",
                        display: "inline-flex",
                        flex: "0 0 auto",
                        left: "unset",
                        top: "unset",
                        width: "unset",
                      }}
                      color="low-secondary"
                      size="small"
                      text1="Valor"
                      textClassName={{
                        alignSelf: "unset",
                        textAlign: "right",
                        whiteSpace: "nowrap",
                        width: "fit-content",
                      }}
                      type="text"
                      weight="regular"
                    />{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <Divider
              className={{
                alignSelf: "stretch",
                left: "unset",
                marginBottom: "-0.50px",
                top: "unset",
                width: "100%",
              }}
              color="low-lighter"
              orientation="horizontal"
              size="extra-small"
              theme="light"
            />{" "}
          </div>{" "}
        </div>{" "}
        <Text
          className={{
            alignSelf: "stretch",
            flex: "0 0 auto",
            left: "unset",
            top: "unset",
            width: "100%",
          }}
          color="low-primary"
          size="x-large"
          text="Etapas de Renovação"
          type="subtitle"
          weight="semibold"
        />{" "}
        <div className={classes.stepsContainer}>
          {" "}
          <Steps
            application="web"
            className={{
              flex: "1",
              flexGrow: "1",
              left: "unset",
              top: "unset",
              width: "unset",
            }}
            nodes="five"
            status="inactive"
            theme="light"
          />{" "}
        </div>{" "}
      </div>{" "}
      <div className={classes.scrollbar}>
        {" "}
        <div className={classes.scrollbarThumb} />{" "}
      </div>{" "}
    </div>
  );
};
