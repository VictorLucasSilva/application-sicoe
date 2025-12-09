import { type JSX } from "react";
import { SubsectionBarCard } from "../SubsectionBarCard";
import { SubsectionCard } from "../SubsectionCard";
import { ScrollbarVertical } from "../../general-components/ScrollbarVertical";
import { SectionTitle } from "../SectionTitle";
import { TableFilterBarSubsection } from "../TableFilterBarSubsection"
import classes from "./style.module.css";

export const HubContractHome = (): JSX.Element => {
  return (
    <div className={classes.hub}>
      <ScrollbarVertical
        className={{
          alignSelf: "end",
          display: "unset",
          gridColumn: "31 / 32",
          gridRow: "11 / 24",
          height: "100%",
          justifyContent: "unset",
          justifySelf: "start",
          left: "unset",
          top: "unset",
          width: "100%",
        }}
        frameClassName={{
          height: "calc(100% - 6px)",
          left: "calc(50.00% - 3px)",
          marginBottom: "unset",
          marginTop: "unset",
          position: "relative",
          top: "3px",
        }}
        pageHeight="x-2"
        position="top"
      />
      <SectionTitle
        className={{
          alignSelf: "end",
          gridColumn: "3 / 16",
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
          backgroundImage: "url(manage-search.svg)",
          backgroundSize: "100% 100%",
          left: "20px",
          position: "absolute",
          top: "0",
        }}
        polygon="image.svg"
        text="Situação dos Contratos"
        theme="light"
      />
      <SectionTitle
        className={{
          alignSelf: "end",
          gridColumn: "3 / 16",
          gridRow: "8 / 9",
          height: "100%",
          justifySelf: "start",
          left: "unset",
          top: "unset",
          width: "100%",
        }}
        divClassName={{ marginBottom: "-5.40px", marginTop: "-7.40px" }}
        groupClassName={{ marginBottom: "-2.40px", marginTop: "-2.40px" }}
        iconerSizeMediumColorClassName={{
          backgroundImage: "url(factory.svg)",
          backgroundSize: "100% 100%",
          left: "20px",
          position: "absolute",
          top: "0",
        }}
        polygon="polygon-11-2.svg"
        text="Contratos com Fornecedores"
        theme="light"
      />{" "}
      <SubsectionCard /> 
      <TableFilterBarSubsection 
        filter="on"  
        filterArea="chips"
        size="large"
        linha="Buscar..."
      />{" "}
      <SubsectionBarCard />{" "}
    </div>
  );
};
