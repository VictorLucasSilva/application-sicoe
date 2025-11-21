import PropTypes from "prop-types";
import { type JSX } from "react";
import { IconLogotipoInternal } from "../IconSvg/IconLogoTipoInternal";
import image from "../../../../../public/images/Down.svg"
import progress2 from "../../../../../public/images/Down.svg"
import progress3 from "../../../../../public/images/Down.svg"
import progress4 from "../../../../../public/images/Down.svg"
import progress5 from "../../../../../public/images/Down.svg"
import progress6 from "../../../../../public/images/Down.svg"
import progress7 from "../../../../../public/images/Down.svg"
import progress9 from "../../../../../public/images/Down.svg"
import progress10 from "../../../../../public/images/Down.svg"
import progress11 from "../../../../../public/images/Down.svg"
import progress12 from "../../../../../public/images/Down.svg"
import progress13 from "../../../../../public/images/Down.svg"
import progress14 from"../../../../../public/images/Down.svg"
import progress15 from "../../../../../public/images/Down.svg"
import progress16 from "../../../../../public/images/Down.svg"
import progress17 from "../../../../../public/images/Down.svg"
import progress18 from "../../../../../public/images/Down.svg"
import progress19 from "../../../../../public/images/Down.svg"
import progress20 from "../../../../../public/images/Down.svg"
import progress21 from "../../../../../public/images/Down.svg"
import progress22 from "../../../../../public/images/Down.svg"
import progress23 from "../../../../../public/images/Down.svg"
import progress24 from "../../../../../public/images/Down.svg"
import progress25 from "../../../../../public/images/Down.svg"
import progress26 from "../../../../../public/images/Down.svg"
import progress27 from "../../../../../public/images/Down.svg"
import progress28 from "../../../../../public/images/Down.svg"
import progress29 from "../../../../../public/images/Down.svg"
import progress30 from "../../../../../public/images/Down.svg"
import progress31 from "../../../../../public/images/Down.svg"
import classes from "./style.module.css";
interface Props {
  type: "spinner" | "spinner-button";
  size: "large" | "medium" | "small";
  theme: "dark" | "light";
  animation: "right" | "left" | "top" | "bottom";
  className: any;
  progress: string;
  progressClassName: any;
  logotipoInternalLogotipoInternalClassName: any;
}
export const SpinnerLoading = ({
  type,
  size,
  theme,
  animation,
  className,
  progress = "progress-8.svg",
  progressClassName,
  logotipoInternalLogotipoInternalClassName,
}: Props): JSX.Element => {
  const containerClass = [
    classes.container,
    classes[`size-${size}`],
    classes[`type-${type}`],
    classes[`theme-${theme}`],
    classes[`animation-${animation}`],
  ].join(" ");
  const innerContainerClass = [
    classes.innerContainer,
    classes[`innerContainer-size-${size}`],
    classes[`innerContainer-animation-${animation}`],
  ].join(" ");
  const progressImageClass = [
    classes.progressImage,
    classes[`progressImage-size-${size}`],
    classes[`progressImage-animation-${animation}`],
  ].join(" ");
  const dotClass = [
    classes.dot,
    classes[`dot-size-${size}`],
    classes[`dot-theme-${theme}`],
    classes[`dot-type-${type}`],
  ].join(" ");
  const largeInnerContainerClass = [
    classes.largeInnerContainer,
    classes[`largeInnerContainer-animation-${animation}`],
  ].join(" ");
  const largeProgressImageClass = [
    classes.largeProgressImage,
    classes[`largeProgressImage-animation-${animation}`],
  ].join(" ");
  const largeProgressClass = [
    classes.largeProgress,
    classes[`largeProgress-theme-${theme}`],
  ].join(" ");
  const darkOverlayClass = [
    classes.darkOverlay,
    classes[`darkOverlay-animation-${animation}`],
  ].join(" ");
  return (
    <div className={containerClass} style={className}>
      {" "}
      {["medium", "small"].includes(size) && (
        <div className={innerContainerClass}>
          {" "}
          <img
            className={progressImageClass}
            alt="Progress"
            src={
              type === "spinner" &&
              theme === "light" &&
              animation === "top" &&
              size === "small"
                ? progress
                : type === "spinner" &&
                  theme === "light" &&
                  size === "small" &&
                  animation === "right"
                ? image
                : type === "spinner" &&
                  theme === "light" &&
                  size === "small" &&
                  animation === "bottom"
                ? progress2
                : type === "spinner" &&
                  animation === "left" &&
                  theme === "light" &&
                  size === "small"
                ? progress3
                : animation === "top" && theme === "light" && size === "medium"
                ? progress4
                : theme === "light" &&
                  size === "medium" &&
                  animation === "right"
                ? progress5
                : theme === "light" &&
                  size === "medium" &&
                  animation === "bottom"
                ? progress6
                : animation === "left" && theme === "light" && size === "medium"
                ? progress7
                : animation === "top" &&
                  theme === "light" &&
                  type === "spinner-button"
                ? progress12
                : animation === "right" &&
                  theme === "light" &&
                  type === "spinner-button"
                ? progress13
                : theme === "light" &&
                  type === "spinner-button" &&
                  animation === "bottom"
                ? progress14
                : animation === "left" &&
                  theme === "light" &&
                  type === "spinner-button"
                ? progress15
                : type === "spinner" &&
                  animation === "top" &&
                  size === "small" &&
                  theme === "dark"
                ? progress16
                : type === "spinner" &&
                  animation === "right" &&
                  size === "small" &&
                  theme === "dark"
                ? progress17
                : type === "spinner" &&
                  size === "small" &&
                  theme === "dark" &&
                  animation === "bottom"
                ? progress18
                : type === "spinner" &&
                  animation === "left" &&
                  size === "small" &&
                  theme === "dark"
                ? progress19
                : animation === "top" && theme === "dark" && size === "medium"
                ? progress20
                : animation === "right" && theme === "dark" && size === "medium"
                ? progress21
                : theme === "dark" &&
                  size === "medium" &&
                  animation === "bottom"
                ? progress22
                : animation === "left" && theme === "dark" && size === "medium"
                ? progress23
                : animation === "top" &&
                  theme === "dark" &&
                  type === "spinner-button"
                ? progress28
                : animation === "right" &&
                  theme === "dark" &&
                  type === "spinner-button"
                ? progress29
                : theme === "dark" &&
                  type === "spinner-button" &&
                  animation === "bottom"
                ? progress30
                : animation === "left" &&
                  theme === "dark" &&
                  type === "spinner-button"
                ? progress31
                : undefined
            }
          />{" "}
          <div className={dotClass} />{" "}
        </div>
      )}{" "}
      {size === "large" && (
        <div className={largeInnerContainerClass}>
          {" "}
          <img
            className={largeProgressImageClass}
            alt="Progress"
            src={
              theme === "light" && animation === "right"
                ? progress9
                : theme === "light" && animation === "bottom"
                ? progress10
                : animation === "left" && theme === "light"
                ? progress11
                : animation === "top" && theme === "dark"
                ? progress24
                : animation === "right" && theme === "dark"
                ? progress25
                : theme === "dark" && animation === "bottom"
                ? progress26
                : animation === "left" && theme === "dark"
                ? progress27
                : progress
            }
          />{" "}
          <div className={largeProgressClass} style={progressClassName} />{" "}
        </div>
      )}{" "}
      {theme === "light" && size === "large" && (
        <IconLogotipoInternal
          className={logotipoInternalLogotipoInternalClassName}
        />
      )}{" "}
      {theme === "dark" && size === "large" && (
        <div className={darkOverlayClass} />
      )}{" "}
    </div>
  );
};
SpinnerLoading.propTypes = {
  type: PropTypes.oneOf(["spinner", "spinner-button"]),
  size: PropTypes.oneOf(["large", "medium", "small"]),
  theme: PropTypes.oneOf(["dark", "light"]),
  animation: PropTypes.oneOf(["right", "left", "top", "bottom"]),
  progress: PropTypes.string,
};
