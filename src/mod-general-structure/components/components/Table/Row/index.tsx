import { type JSX } from "react";
import { TableCell } from "../../TableCell";
export const RowTableAudit = (): JSX.Element => {
  return (
    <div
      style={{
        alignItems: "flex-start",
        alignSelf: "end",
        display: "flex",
        flexDirection: "column",
        gridColumn: "4 / 30",
        gridRow: "5 / 20",
        height: "100%",
        justifySelf: "end",
        position: "relative",
        width: "100%",
      }}
    >
      {" "}
      <div
        style={{
          alignItems: "flex-start",
          alignSelf: "stretch",
          borderBottomStyle: "solid",
          borderBottomWidth: "0.5px",
          borderColor: "var(--neutrallowlighter)",
          display: "flex",
          height: "48px",
          position: "relative",
          width: "100%",
        }}
      >
        {" "}
        <TableCell
          className={{
            alignSelf: "stretch",
            flex: "1",
            flexGrow: "1",
            left: "unset",
            top: "unset",
          }}
          spacing="default"
          text="Texto"
          type="text-1-line"
        />{" "}
        <TableCell
          className={{
            alignSelf: "stretch",
            flex: "1",
            flexGrow: "1",
            left: "unset",
            top: "unset",
          }}
          spacing="default"
          text="Texto"
          type="text-1-line"
        />{" "}
        <TableCell
          className={{
            alignSelf: "stretch",
            flex: "1",
            flexGrow: "1",
            left: "unset",
            top: "unset",
            width: "unset",
          }}
          prop="primary-lighter"
          spacing="default"
          type="tag-label"
        />{" "}
        <TableCell
          className={{
            alignItems: "center",
            alignSelf: "stretch",
            flex: "1",
            flexGrow: "1",
            left: "unset",
            top: "unset",
          }}
          spacing="default"
          text="Texto"
          type="text-1-line"
        />{" "}
        <TableCell
          className={{
            alignSelf: "stretch",
            flex: "1",
            flexGrow: "1",
            left: "unset",
            top: "unset",
          }}
          spacing="default"
          text="Texto"
          type="text-1-line"
        />{" "}
        <TableCell
          className={{
            alignSelf: "stretch",
            flex: "1",
            flexGrow: "1",
            left: "unset",
            top: "unset",
          }}
          spacing="default"
          text="dd/mm/aaaa"
          text1="mm:ss"
          type="text-2-lines"
        />{" "}
      </div>{" "}
      <div
        style={{
          alignItems: "flex-start",
          alignSelf: "stretch",
          borderBottomStyle: "solid",
          borderBottomWidth: "0.5px",
          borderColor: "var(--neutrallowlighter)",
          display: "flex",
          height: "48px",
          position: "relative",
          width: "100%",
        }}
      >
        {" "}
        <TableCell
          className={{
            alignSelf: "stretch",
            flex: "1",
            flexGrow: "1",
            left: "unset",
            top: "unset",
          }}
          spacing="default"
          text="Texto"
          type="text-1-line"
        />{" "}
        <TableCell
          className={{
            alignSelf: "stretch",
            flex: "1",
            flexGrow: "1",
            left: "unset",
            top: "unset",
          }}
          spacing="default"
          text="Texto"
          type="text-1-line"
        />{" "}
        <TableCell
          className={{
            alignSelf: "stretch",
            flex: "1",
            flexGrow: "1",
            left: "unset",
            top: "unset",
            width: "unset",
          }}
          prop="primary-lighter"
          spacing="default"
          type="tag-label"
        />{" "}
        <TableCell
          className={{
            alignItems: "center",
            alignSelf: "stretch",
            flex: "1",
            flexGrow: "1",
            left: "unset",
            top: "unset",
          }}
          spacing="default"
          text="Texto"
          type="text-1-line"
        />{" "}
        <TableCell
          className={{
            alignSelf: "stretch",
            flex: "1",
            flexGrow: "1",
            left: "unset",
            top: "unset",
          }}
          spacing="default"
          text="Texto"
          type="text-1-line"
        />{" "}
        <TableCell
          className={{
            alignSelf: "stretch",
            flex: "1",
            flexGrow: "1",
            left: "unset",
            top: "unset",
          }}
          spacing="default"
          text="dd/mm/aaaa"
          text1="mm:ss"
          type="text-2-lines"
        />{" "}
      </div>{" "}
    </div>
  );
};
