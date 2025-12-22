import PropTypes from "prop-types";
import { type JSX } from "react";
import classes from "./style.module.css";
interface Props {
  application: "web" | "mobile";
  nodes: "two" | "three" | "four" | "one" | "five" | "six";
  theme: "dark" | "light";
  status: "finished" | "inactive" | "active";
  process: "Aditivo" | "Contratação" | "Convocação de Remanescente" | "Acionamentos de Ata de Registro de Preço";
  detailProcess: "Renovação" | "Acréscimo" | "supressão" | "reequilíbrio" | "Alteração Redacional" | "Novo Contrato";
  className: any;
}
export const Steps = ({
  application,
  nodes,
  theme,
  status,
  className,
}: Props): JSX.Element => {
  return (
    <div
      className={`${classes.steps} ${classes[`application-${application}`]} ${
        classes[`nodes-${nodes}`]
      } ${classes[`theme-${theme}`]} ${classes[`status-${status}`]} ${
        className || ""
      }`}
    >
      {["one", "two"].includes(nodes) && (
        <>
          <div
            className={`${classes.stepNode} ${
              classes[`stepNode-application-${application}`]
            } ${classes[`stepNode-status-${status}`]} ${
              classes[`stepNode-theme-${theme}`]
            } ${classes[`stepNode-nodes-${nodes}`]}`}
          >
            {application === "mobile" && (
              <div
                className={`${classes.stepNumber} ${
                  classes[`stepNumber-status-${status}`]
                } ${classes[`stepNumber-theme-${theme}`]}`}
              >
                {["active", "inactive"].includes(status) && <>1</>}
              </div>
            )}
          </div>
          <div
            className={`${classes.stepContent} ${
              classes[`stepContent-application-${application}`]
            } ${classes[`stepContent-status-${status}`]} ${
              classes[`stepContent-theme-${theme}`]
            } ${classes[`stepContent-nodes-${nodes}`]}`}
          >
            {application === "mobile" && (
              <>
                <div
                  className={`${classes.stepTitle} ${
                    classes[`stepTitle-status-${status}`]
                  } ${classes[`stepTitle-theme-${theme}`]}`}
                >
                  Nome do Step
                </div>
                <div
                  className={`${classes.stepCaption} ${
                    classes[`stepCaption-status-${status}`]
                  } ${classes[`stepCaption-theme-${theme}`]}`}
                >
                  {["active", "inactive"].includes(status) && (
                    <>Etapa 1 de 6</>
                  )}
                  {status === "finished" && <>Etapa 6 de 6</>}
                </div>
              </>
            )}
          </div>
        </>
      )}
      {["five", "four", "six", "three"].includes(nodes) && (
        <>
          <div
            className={`${classes.emptyNode} ${
              classes[`emptyNode-nodes-${nodes}`]
            }`}
          />
          <div
            className={`${classes.emptyNode} ${
              classes[`emptyNode-nodes-${nodes}`]
            } ${classes.emptyNode2}`}
          />
          <div
            className={`${classes.emptyNode} ${
              classes[`emptyNode-nodes-${nodes}`]
            } ${classes.emptyNode3}`}
          />
        </>
      )}{" "}
      {["five", "four", "six"].includes(nodes) && (
        <div
          className={`${classes.emptyNode} ${
            classes[`emptyNode-nodes-${nodes}`]
          } ${classes.emptyNode4}`}
        />
      )}{" "}
      {["five", "six"].includes(nodes) && (
        <div
          className={`${classes.emptyNode} ${
            classes[`emptyNode-nodes-${nodes}`]
          } ${classes.emptyNode5}`}
        />
      )}{" "}
      {nodes === "six" && (
        <div
          className={`${classes.emptyNode} ${
            classes[`emptyNode-nodes-${nodes}`]
          } ${classes.emptyNode6}`}
        />
      )}{" "}
    </div>
  );
};
Steps.propTypes = {
  application: PropTypes.oneOf(["web", "mobile"]),
  nodes: PropTypes.oneOf(["two", "three", "four", "one", "five", "six"]),
  theme: PropTypes.oneOf(["dark", "light"]),
  status: PropTypes.oneOf(["finished", "inactive", "active"]),
};
