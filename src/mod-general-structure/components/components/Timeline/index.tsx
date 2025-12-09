import PropTypes from "prop-types";
import { type JSX } from "react";
import { Check } from "../Check";
import { Hyperlink } from "../Hyperlink";
import { IconComponentNode } from "./IconComponentNode";
import classes from "./Timeline.module.css";
interface Props {
  side: "alternated" | "right" | "left";
  icon: "off" | "on";
  theme: "dark" | "light";
  className: any;
  override: JSX.Element;
}
export const Timeline = ({
  side,
  icon,
  theme,
  className,
  override = (
    <IconComponentNode
      className={{
        height: "24px",
        left: "calc(50.00% - 12px)",
        position: "absolute",
        top: "calc(50.00% - 12px)",
        width: "24px",
      }}
    />
  ),
}: Props): JSX.Element => {
  return (
    <div
      className={`${classes.timeline} ${classes[`timeline--${side}`]} ${
        classes[`timeline--${theme}`]
      } ${classes[`timeline--icon-${icon}`]}`}
      style={className}
    >
      {" "}
      <div
        className={`${classes.timelineItem} ${
          classes[`timelineItem--${side}`]
        } ${classes[`timelineItem--${theme}`]} ${
          classes[`timelineItem--icon-${icon}`]
        }`}
      >
        {" "}
        {(side === "alternated" ||
          (icon === "on" && side === "right" && theme === "light")) && (
          <>
            {" "}
            <div
              className={`${classes.timelineContent} ${
                classes[`timelineContent--${side}`]
              } ${classes[`timelineContent--${theme}`]} ${
                classes[`timelineContent--icon-${icon}`]
              }`}
            >
              {" "}
              {theme === "light" && icon === "on" && (
                <>
                  {" "}
                  <div
                    className={`${classes.timelineNode} ${
                      classes[`timelineNode--${side}`]
                    } ${classes[`timelineNode--${theme}`]} ${
                      classes[`timelineNode--icon-${icon}`]
                    } ${classes["timelineNode--darker"]}`}
                  >
                    {" "}
                    {side === "alternated" && (
                      <>
                        {" "}
                        <div className={classes.timelineBadge}>
                          {" "}
                          <div className={classes.timelineBadgeText}>
                            {" "}
                            13/06/2022 às 11h00{" "}
                          </div>{" "}
                        </div>{" "}
                        <div className={classes.timelineDetails}>
                          {" "}
                          <div className={classes.timelineHeader}>
                            {" "}
                            Header do item{" "}
                          </div>{" "}
                          <p
                            className={`${classes.timelineDescription} ${classes["timelineDescription--right"]}`}
                          >
                            {" "}
                            Exemplo de etapa com nó concluído e com ícone.{" "}
                            <br /> Exemplo de&nbsp;&nbsp;conteúdo detalhado. Com
                            exceção do nó e da barra, nenhum dos outros
                            elementos são obrigatórios. Também é possível
                            utilizar elementos como avatar, imagem e vídeo.{" "}
                          </p>{" "}
                          <Hyperlink
                            className={{
                              flex: "0 0 auto",
                              left: "unset",
                              top: "unset",
                            }}
                            status="default"
                            theme="light"
                            type="inline"
                          />{" "}
                        </div>{" "}
                      </>
                    )}{" "}
                    {side === "right" && (
                      <Check
                        className={{
                          height: "24px",
                          left: "calc(50.00% - 12px)",
                          position: "absolute",
                          top: "calc(50.00% - 12px)",
                          width: "24px",
                        }}
                        color="white"
                        opacity="0.85"
                      />
                    )}{" "}
                  </div>{" "}
                  <div
                    className={`${classes.timelineBar} ${
                      classes[`timelineBar--${side}`]
                    } ${classes[`timelineBar--${theme}`]} ${
                      classes["timelineBar--darker"]
                    }`}
                  >
                    {" "}
                    {side === "alternated" && (
                      <>
                        {" "}
                        <div
                          className={`${classes.timelineCircle} ${classes["timelineCircle--darker"]}`}
                        >
                          {" "}
                          <Check
                            className={{
                              height: "24px",
                              left: "calc(50.00% - 12px)",
                              position: "absolute",
                              top: "calc(50.00% - 12px)",
                              width: "24px",
                            }}
                            color="white"
                            opacity="0.85"
                          />{" "}
                        </div>{" "}
                        <div
                          className={`${classes.timelineLine} ${classes["timelineLine--darker"]}`}
                        />{" "}
                      </>
                    )}{" "}
                  </div>{" "}
                </>
              )}{" "}
            </div>{" "}
            <div
              className={`${classes.timelineContentRight} ${
                classes[`timelineContentRight--${side}`]
              }`}
            >
              {" "}
              {side === "right" && (
                <>
                  {" "}
                  <div
                    className={`${classes.timelineBadge} ${classes["timelineBadge--medium"]}`}
                  >
                    {" "}
                    <div className={classes.timelineBadgeText}>
                      {" "}
                      13/06/2022 às 11h00{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className={classes.timelineDetailsRight}>
                    {" "}
                    <div className={classes.timelineHeader}>
                      Header do item
                    </div>{" "}
                    <p className={classes.timelineDescription}>
                      {" "}
                      Exemplo de etapa com nó concluído e com ícone. <br />{" "}
                      Exemplo de&nbsp;&nbsp;conteúdo detalhado. Com exceção do
                      nó e da barra, nenhum dos outros elementos são
                      obrigatórios. Também é possível utilizar elementos como
                      avatar, imagem e vídeo.{" "}
                    </p>{" "}
                    <Hyperlink
                      className={{
                        flex: "0 0 auto",
                        left: "unset",
                        top: "unset",
                      }}
                      status="default"
                      theme="light"
                      type="inline"
                    />{" "}
                  </div>{" "}
                </>
              )}{" "}
            </div>{" "}
          </>
        )}{" "}
      </div>{" "}
      <div
        className={`${classes.timelineItem} ${
          classes[`timelineItem--${side}`]
        } ${classes[`timelineItem--${theme}`]} ${
          classes[`timelineItem--icon-${icon}`]
        }`}
      >
        {" "}
        {(side === "alternated" ||
          (icon === "on" && side === "right" && theme === "light")) && (
          <>
            {" "}
            <div
              className={`${classes.timelineContentLeft} ${
                classes[`timelineContentLeft--${side}`]
              }`}
            >
              {" "}
              {side === "right" && (
                <>
                  {" "}
                  <div
                    className={`${classes.timelineCircle} ${classes["timelineCircle--pure"]}`}
                  >
                    {" "}
                    <Check
                      className={{
                        height: "24px",
                        left: "calc(50.00% - 12px)",
                        position: "absolute",
                        top: "calc(50.00% - 12px)",
                        width: "24px",
                      }}
                      color="white"
                      opacity="0.85"
                    />{" "}
                  </div>{" "}
                  <div
                    className={`${classes.timelineLine} ${classes["timelineLine--pure"]}`}
                  />{" "}
                </>
              )}{" "}
            </div>{" "}
            <div
              className={`${classes.timelineContent} ${
                classes[`timelineContent--${side}`]
              } ${classes[`timelineContent--${theme}`]} ${
                classes[`timelineContent--icon-${icon}`]
              } ${classes["timelineContent--second"]}`}
            >
              {" "}
              {theme === "light" && icon === "on" && (
                <>
                  {" "}
                  <div
                    className={`${classes.timelineNode} ${
                      classes[`timelineNode--${side}`]
                    } ${classes[`timelineNode--${theme}`]} ${
                      classes[`timelineNode--icon-${icon}`]
                    } ${classes["timelineNode--lighter"]}`}
                  >
                    {" "}
                    {side === "alternated" && (
                      <>
                        {" "}
                        <div
                          className={`${classes.timelineCircle} ${classes["timelineCircle--lighter"]}`}
                        >
                          {" "}
                          <Check
                            className={{
                              height: "24px",
                              left: "calc(50.00% - 12px)",
                              position: "absolute",
                              top: "calc(50.00% - 12px)",
                              width: "24px",
                            }}
                            color="black"
                            opacity="0.75"
                          />{" "}
                        </div>{" "}
                        <div
                          className={`${classes.timelineLine} ${classes["timelineLine--lighter"]}`}
                        />{" "}
                      </>
                    )}{" "}
                    {side === "right" && (
                      <div
                        className={`${classes.timelineBadgeText} ${classes["timelineBadgeText--dark"]}`}
                      >
                        {" "}
                        13/06/2022 às 11h00{" "}
                      </div>
                    )}{" "}
                  </div>{" "}
                  <div
                    className={`${classes.timelineDetails} ${
                      classes[`timelineDetails--${side}`]
                    } ${classes["timelineDetails--second"]}`}
                  >
                    {" "}
                    {side === "alternated" && (
                      <>
                        {" "}
                        <div
                          className={`${classes.timelineBadge} ${classes["timelineBadge--lighter"]}`}
                        >
                          {" "}
                          <div
                            className={`${classes.timelineBadgeText} ${classes["timelineBadgeText--dark"]}`}
                          >
                            {" "}
                            13/06/2022 às 11h00{" "}
                          </div>{" "}
                        </div>{" "}
                        <div className={classes.timelineDetailsInner}>
                          {" "}
                          <div className={classes.timelineHeader}>
                            {" "}
                            Header do item{" "}
                          </div>{" "}
                          <p className={classes.timelineDescription}>
                            {" "}
                            Exemplo de etapa com nó concluído e com ícone.{" "}
                            <br /> Exemplo de&nbsp;&nbsp;conteúdo detalhado. Com
                            exceção do nó e da barra, nenhum dos outros
                            elementos são obrigatórios. Também é possível
                            utilizar elementos como avatar, imagem e vídeo.{" "}
                          </p>{" "}
                          <Hyperlink
                            className={{
                              flex: "0 0 auto",
                              left: "unset",
                              top: "unset",
                            }}
                            status="default"
                            theme="light"
                            type="inline"
                          />{" "}
                        </div>{" "}
                      </>
                    )}{" "}
                    {side === "right" && (
                      <>
                        {" "}
                        <div className={classes.timelineHeader}>
                          {" "}
                          Header do item{" "}
                        </div>{" "}
                        <p className={classes.timelineDescription}>
                          {" "}
                          Exemplo de etapa com nó concluído e com ícone. <br />{" "}
                          Exemplo de&nbsp;&nbsp;conteúdo detalhado. Com exceção
                          do nó e da barra, nenhum dos outros elementos são
                          obrigatórios. Também é possível utilizar elementos
                          como avatar, imagem e vídeo.{" "}
                        </p>{" "}
                        <Hyperlink
                          className={{
                            flex: "0 0 auto",
                            left: "unset",
                            top: "unset",
                          }}
                          status="default"
                          theme="light"
                          type="inline"
                        />{" "}
                      </>
                    )}{" "}
                  </div>{" "}
                </>
              )}{" "}
            </div>{" "}
          </>
        )}{" "}
      </div>{" "}
      <div
        className={`${classes.timelineItem} ${
          classes[`timelineItem--${side}`]
        } ${classes[`timelineItem--${theme}`]} ${
          classes[`timelineItem--icon-${icon}`]
        }`}
      >
        {" "}
        {(side === "alternated" ||
          (icon === "on" && side === "right" && theme === "light")) && (
          <>
            {" "}
            <div
              className={`${classes.timelineContent} ${
                classes[`timelineContent--${side}`]
              } ${classes[`timelineContent--${theme}`]} ${
                classes[`timelineContent--icon-${icon}`]
              } ${classes["timelineContent--third"]}`}
            >
              {" "}
              {theme === "light" && icon === "on" && (
                <>
                  {" "}
                  <div
                    className={`${classes.timelineNode} ${
                      classes[`timelineNode--${side}`]
                    } ${classes[`timelineNode--${theme}`]} ${
                      classes[`timelineNode--icon-${icon}`]
                    } ${classes["timelineNode--pure"]}`}
                  >
                    {" "}
                    {side === "alternated" && (
                      <>
                        {" "}
                        <div
                          className={`${classes.timelineBadge} ${classes["timelineBadge--pure"]}`}
                        >
                          {" "}
                          <div className={classes.timelineBadgeText}>
                            {" "}
                            13/06/2022 às 11h00{" "}
                          </div>{" "}
                        </div>{" "}
                        <div
                          className={`${classes.timelineDetails} ${classes["timelineDetails--end"]}`}
                        >
                          {" "}
                          <div className={classes.timelineHeader}>
                            {" "}
                            Header do item{" "}
                          </div>{" "}
                          <p
                            className={`${classes.timelineDescription} ${classes["timelineDescription--right"]}`}
                          >
                            {" "}
                            Exemplo de etapa com nó concluído e com ícone.{" "}
                            <br /> Exemplo de&nbsp;&nbsp;conteúdo detalhado. Com
                            exceção do nó e da barra, nenhum dos outros
                            elementos são obrigatórios. Também é possível
                            utilizar elementos como avatar, imagem e vídeo.{" "}
                          </p>{" "}
                          <Hyperlink
                            className={{
                              flex: "0 0 auto",
                              left: "unset",
                              top: "unset",
                            }}
                            status="default"
                            theme="light"
                            type="inline"
                          />{" "}
                        </div>{" "}
                      </>
                    )}{" "}
                    {side === "right" && (
                      <Check
                        className={{
                          height: "24px",
                          left: "calc(50.00% - 12px)",
                          position: "absolute",
                          top: "calc(50.00% - 12px)",
                          width: "24px",
                        }}
                        color="white"
                        opacity="0.85"
                      />
                    )}{" "}
                  </div>{" "}
                  <div
                    className={`${classes.timelineBar} ${
                      classes[`timelineBar--${side}`]
                    } ${classes[`timelineBar--${theme}`]} ${
                      classes["timelineBar--pure"]
                    }`}
                  >
                    {" "}
                    {side === "alternated" && (
                      <>
                        {" "}
                        <div
                          className={`${classes.timelineCircle} ${classes["timelineCircle--pure"]}`}
                        >
                          {" "}
                          <Check
                            className={{
                              height: "24px",
                              left: "calc(50.00% - 12px)",
                              position: "absolute",
                              top: "calc(50.00% - 12px)",
                              width: "24px",
                            }}
                            color="white"
                            opacity="0.85"
                          />{" "}
                        </div>{" "}
                        <div
                          className={`${classes.timelineLine} ${classes["timelineLine--pure"]}`}
                        />{" "}
                      </>
                    )}{" "}
                  </div>{" "}
                </>
              )}{" "}
            </div>{" "}
            <div
              className={`${classes.timelineContentRight} ${
                classes[`timelineContentRight--${side}`]
              }`}
            >
              {" "}
              {side === "right" && (
                <>
                  {" "}
                  <div
                    className={`${classes.timelineBadge} ${classes["timelineBadge--pure"]}`}
                  >
                    {" "}
                    <div className={classes.timelineBadgeText}>
                      {" "}
                      13/06/2022 às 11h00{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className={classes.timelineDetailsRight}>
                    {" "}
                    <div className={classes.timelineHeader}>
                      Header do item
                    </div>{" "}
                    <p className={classes.timelineDescription}>
                      {" "}
                      Exemplo de etapa com nó concluído e com ícone. <br />{" "}
                      Exemplo de&nbsp;&nbsp;conteúdo detalhado. Com exceção do
                      nó e da barra, nenhum dos outros elementos são
                      obrigatórios. Também é possível utilizar elementos como
                      avatar, imagem e vídeo.{" "}
                    </p>{" "}
                    <Hyperlink
                      className={{
                        flex: "0 0 auto",
                        left: "unset",
                        top: "unset",
                      }}
                      status="default"
                      theme="light"
                      type="inline"
                    />{" "}
                  </div>{" "}
                </>
              )}{" "}
            </div>{" "}
          </>
        )}{" "}
      </div>{" "}
      <div
        className={`${classes.timelineItem} ${
          classes[`timelineItem--${side}`]
        } ${classes[`timelineItem--${theme}`]} ${
          classes[`timelineItem--icon-${icon}`]
        }`}
      >
        {" "}
        {(side === "alternated" ||
          (icon === "on" && side === "right" && theme === "light")) && (
          <>
            {" "}
            <div
              className={`${classes.timelineContentLeft} ${
                classes[`timelineContentLeft--${side}`]
              }`}
            >
              {" "}
              {side === "right" && (
                <>
                  {" "}
                  <div
                    className={`${classes.timelineCircle} ${classes["timelineCircle--lighter"]}`}
                  >
                    {" "}
                    {override}{" "}
                  </div>{" "}
                  <div
                    className={`${classes.timelineLine} ${classes["timelineLine--lighter"]}`}
                  />{" "}
                </>
              )}{" "}
            </div>{" "}
            <div
              className={`${classes.timelineContent} ${
                classes[`timelineContent--${side}`]
              } ${classes[`timelineContent--${theme}`]} ${
                classes[`timelineContent--icon-${icon}`]
              } ${classes["timelineContent--fourth"]}`}
            >
              {" "}
              {theme === "light" && icon === "on" && (
                <>
                  {" "}
                  <div
                    className={`${classes.timelineNode} ${
                      classes[`timelineNode--${side}`]
                    } ${classes[`timelineNode--${theme}`]} ${
                      classes[`timelineNode--icon-${icon}`]
                    } ${classes["timelineNode--lightest"]}`}
                  >
                    {" "}
                    {side === "alternated" && (
                      <>
                        {" "}
                        <div
                          className={`${classes.timelineCircle} ${classes["timelineCircle--pure"]}`}
                        >
                          {" "}
                          <Check
                            className={{
                              height: "24px",
                              left: "calc(50.00% - 12px)",
                              position: "absolute",
                              top: "calc(50.00% - 12px)",
                              width: "24px",
                            }}
                            color="white"
                            opacity="0.85"
                          />{" "}
                        </div>{" "}
                        <div
                          className={`${classes.timelineLine} ${classes["timelineLine--pure"]}`}
                        />{" "}
                      </>
                    )}{" "}
                    {side === "right" && (
                      <div
                        className={`${classes.timelineBadgeText} ${classes["timelineBadgeText--dark"]}`}
                      >
                        {" "}
                        13/06/2022 às 11h00{" "}
                      </div>
                    )}{" "}
                  </div>{" "}
                  <div
                    className={`${classes.timelineDetails} ${
                      classes[`timelineDetails--${side}`]
                    } ${classes["timelineDetails--fourth"]}`}
                  >
                    {" "}
                    {side === "alternated" && (
                      <>
                        {" "}
                        <div
                          className={`${classes.timelineBadge} ${classes["timelineBadge--pure"]}`}
                        >
                          {" "}
                          <div className={classes.timelineBadgeText}>
                            {" "}
                            13/06/2022 às 11h00{" "}
                          </div>{" "}
                        </div>{" "}
                        <div className={classes.timelineDetailsInner}>
                          {" "}
                          <div className={classes.timelineHeader}>
                            {" "}
                            Header do item{" "}
                          </div>{" "}
                          <p className={classes.timelineDescription}>
                            {" "}
                            Exemplo de etapa com nó concluído e com ícone.{" "}
                            <br /> Exemplo de&nbsp;&nbsp;conteúdo detalhado. Com
                            exceção do nó e da barra, nenhum dos outros
                            elementos são obrigatórios. Também é possível
                            utilizar elementos como avatar, imagem e vídeo.{" "}
                          </p>{" "}
                          <Hyperlink
                            className={{
                              flex: "0 0 auto",
                              left: "unset",
                              top: "unset",
                            }}
                            status="default"
                            theme="light"
                            type="inline"
                          />{" "}
                        </div>{" "}
                      </>
                    )}{" "}
                    {side === "right" && (
                      <>
                        {" "}
                        <div className={classes.timelineHeader}>
                          {" "}
                          Header do item{" "}
                        </div>{" "}
                        <p className={classes.timelineDescription}>
                          {" "}
                          Exemplo de etapa com nó concluído e com ícone. <br />{" "}
                          Exemplo de&nbsp;&nbsp;conteúdo detalhado. Com exceção
                          do nó e da barra, nenhum dos outros elementos são
                          obrigatórios. Também é possível utilizar elementos
                          como avatar, imagem e vídeo.{" "}
                        </p>{" "}
                        <Hyperlink
                          className={{
                            flex: "0 0 auto",
                            left: "unset",
                            top: "unset",
                          }}
                          status="default"
                          theme="light"
                          type="inline"
                        />{" "}
                      </>
                    )}{" "}
                  </div>{" "}
                </>
              )}{" "}
            </div>{" "}
          </>
        )}{" "}
      </div>{" "}
    </div>
  );
};
Timeline.propTypes = {
  side: PropTypes.oneOf(["alternated", "right", "left"]),
  icon: PropTypes.oneOf(["off", "on"]),
  theme: PropTypes.oneOf(["dark", "light"]),
};
