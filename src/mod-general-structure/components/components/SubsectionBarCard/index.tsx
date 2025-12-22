import { type JSX } from "react";
import { ContBarCard } from "../ContBar";

type SubsectionBarCardProps = {
  onInfoContractClick: () => void;
} 

export const SubsectionBarCard = ({ onInfoContractClick }: SubsectionBarCardProps): JSX.Element => {
  return (
    <div
      style={{
        alignItems: "flex-start",
        alignSelf: "start",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        gridColumn: "4 / 31",
        gridRow: "11 / 24",
        height: "100%",
        justifySelf: "start",
        padding: "8px",
        position: "relative",
        width: "100%",
      }}
      onClick={onInfoContractClick}
    >
      <ContBarCard
        className={{
          alignSelf: "stretch",
          left: "unset",
          marginLeft: "-2.00px",
          marginRight: "-2.00px",
          marginTop: "-2.00px",
          minWidth: "160px",
          top: "unset",
          width: "100%",
          
        }}
        elevation="off"
        progress="zero"
        status="active"
        theme="light"
      />
    </div>
  );
};
