import { type JSX } from "react";
import { IconCardContract } from "../../general-components/IconSvg/IconCardContract";
import { MicroCard } from "../Card";
export const SubsectionCard = (): JSX.Element => {
  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        gap: "16px",
        gridColumn: "4 / 31",
        gridRow: "4 / 7",
        height: "100%",
        justifySelf: "start",
        position: "relative",
        width: "100%",
      }}
    >
      {" "}
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flex: "1",
          flexGrow: "1",
          gap: "16px",
          height: "101.25px",
          padding: "8px 0px",
          position: "relative",
        }}
      >
        {" "}
        <MicroCard
          className={{
            flex: "1",
            flexGrow: "1",
            height: "105.25px",
            left: "unset",
            marginBottom: "-10.00px",
            marginLeft: "-2.00px",
            marginTop: "-10.00px",
            minWidth: "160px",
            top: "unset",
            width: "unset",
          }}
          complementaryContent="Ativos"
          elevation="off"
          override={
            <IconCardContract
              className={{
                backgroundImage: "url(checklist-rtl.svg)",
                backgroundSize: "100% 100%",
                left: "unset",
                top: "unset",
              }}
              color="low"
              size="small"
            />
          }
          textClassName={{ color: "var(--colors-neutral-low-dark)" }}
          textClassNameOverride={{ color: "var(--colors-neutral-low-light)" }}
          theme="light"
          titleLabel="99"
        />{" "}
        <MicroCard
          className={{
            flex: "1",
            flexGrow: "1",
            height: "105.25px",
            left: "unset",
            marginBottom: "-10.00px",
            marginTop: "-10.00px",
            minWidth: "160px",
            top: "unset",
            width: "unset",
          }}
          complementaryContent="Com saldo"
          elevation="off"
          override={
            <IconCardContract
              className={{
                backgroundImage: "url(attach-money.svg)",
                backgroundSize: "100% 100%",
                left: "unset",
                top: "unset",
              }}
              color="low"
              size="small"
            />
          }
          textClassName={{ color: "var(--colors-neutral-low-dark)" }}
          textClassNameOverride={{ color: "var(--colors-neutral-low-light)" }}
          theme="light"
          titleLabel="99"
        />{" "}
        <MicroCard
          className={{
            flex: "1",
            flexGrow: "1",
            height: "105.25px",
            left: "unset",
            marginBottom: "-10.00px",
            marginRight: "-2.00px",
            marginTop: "-10.00px",
            minWidth: "160px",
            top: "unset",
            width: "unset",
          }}
          complementaryContent="Sem Saldo"
          elevation="off"
          override={
            <IconCardContract
              className={{
                backgroundImage: "url(money-off-csred.svg)",
                backgroundSize: "100% 100%",
                left: "unset",
                top: "unset",
              }}
              color="low"
              size="small"
            />
          }
          textClassName={{ color: "var(--colors-neutral-low-dark)" }}
          textClassNameOverride={{ color: "var(--colors-neutral-low-light)" }}
          theme="light"
          titleLabel="99"
        />{" "}
      </div>{" "}
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flex: "1",
          flexGrow: "1",
          gap: "16px",
          height: "101.25px",
          padding: "8px 0px",
          position: "relative",
        }}
      >
        {" "}
        <MicroCard
          className={{
            flex: "1",
            flexGrow: "1",
            height: "105.25px",
            left: "unset",
            marginBottom: "-10.00px",
            marginLeft: "-2.00px",
            marginTop: "-10.00px",
            minWidth: "160px",
            top: "unset",
            width: "unset",
          }}
          complementaryContent="A Vencer"
          elevation="off"
          override={
            <IconCardContract
              className={{
                backgroundImage: "url(running-with-errors.svg)",
                backgroundSize: "100% 100%",
                left: "unset",
                top: "unset",
              }}
              color="low"
              size="small"
            />
          }
          textClassName={{ color: "var(--colors-neutral-low-dark)" }}
          textClassNameOverride={{ color: "var(--colors-neutral-low-light)" }}
          theme="light"
          titleLabel="99"
        />{" "}
        <MicroCard
          className={{
            flex: "1",
            flexGrow: "1",
            height: "105.25px",
            left: "unset",
            marginBottom: "-10.00px",
            marginRight: "-2.00px",
            marginTop: "-10.00px",
            minWidth: "160px",
            top: "unset",
            width: "unset",
          }}
          complementaryContent="Vencido"
          elevation="off"
          override={
            <IconCardContract
              className={{
                backgroundImage: "url(timer-off.svg)",
                backgroundSize: "100% 100%",
                left: "unset",
                top: "unset",
              }}
              color="low"
              size="small"
            />
          }
          textClassName={{ color: "var(--colors-neutral-low-dark)" }}
          textClassNameOverride={{ color: "var(--colors-neutral-low-light)" }}
          theme="light"
          titleLabel="99"
        />{" "}
      </div>{" "}
    </div>
  );
};
