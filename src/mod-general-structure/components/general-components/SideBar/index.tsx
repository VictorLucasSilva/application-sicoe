import PropTypes from "prop-types";
import { type JSX, useEffect, useState } from "react";

import { SidebarAssets } from "../SidebarAssets";
import { IconEstabEstablishment } from "../IconSvg/IconEstabEstablishment";
import { IconDocEstablishment } from "../IconSvg/IconDocEstablishment";
import { IconHomeContract } from "../IconSvg/IconHomeContract";
import { IconHomeEstablishment } from "../IconSvg/IconHomeEstablishment";
import { IconUnitEstablishment } from "../IconSvg/IconUnitsEstablishment";

import classes from "./style.module.css";

interface Props {
  type: "cont" | "estab";
  level: "primary" | "collapsed";
  theme: "dark" | "light";
  selected:
    | "default"
    | "documentos"
    | "home"
    | "unidades"
    | "estabelecimentos";
  className?: React.CSSProperties;
  sidebarAssets?: JSX.Element; 
  override?: JSX.Element; 
}

type MenuKey = Props["selected"];

type MenuItem = {
  id: MenuKey;
  label: string;
  icon: JSX.Element;
};

export const SidebarMenu = ({
  type,
  level,
  theme,
  selected,
  className,
  sidebarAssets = (
    <IconHomeContract
      className={{ height: "27px", position: "relative", width: "27px" }}
      color="#465EFF"
    />
  ),
}: Props): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(level === "primary");

  const [currentSelected, setCurrentSelected] = useState<MenuKey>(selected);

  useEffect(() => {
    setCurrentSelected(selected);
  }, [selected]);

  const contractItems: MenuItem[] = [
    {
      id: "home",
      label: "Home",
      icon: sidebarAssets,
    },
  ];

  const estabItems: MenuItem[] = [
    {
      id: "home",
      label: "Home",
      icon: (
        <IconHomeEstablishment
          className={{
            height: "24px",
            position: "relative",
            width: "24px",
          }}
          color="#465EFF"
        />
      ),
    },
    {
      id: "documentos",
      label: "Documentos",
      icon: (
        <IconDocEstablishment
          className={{
            height: "24px",
            position: "relative",
            width: "24px",
          }}
          color="#465EFF"
        />
      ),
    },
    {
      id: "unidades",
      label: "Unidades",
      icon: (
        <IconUnitEstablishment
          className={{
            height: "24px",
            position: "relative",
            width: "24px",
          }}
          color="#465EFF"
        />
      ),
    },
    {
      id: "estabelecimentos",
      label: "Estabelecimentos",
      icon: (
        <IconEstabEstablishment
          className={{
            height: "24px",
            position: "relative",
            width: "24px",
          }}
          color="#465EFF"
        />
      ),
    },
  ];

  const items = type === "cont" ? contractItems : estabItems;

  const containerClasses = [
    classes.container,
    isExpanded ? classes["level-primary"] : classes["level-collapsed"],
    theme === "dark" ? classes["theme-dark"] : classes["theme-light"],
  ].join(" ");

  return (
    <aside
      className={containerClasses}
      style={className}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <nav className={classes.menu}>
        {items.map((item) => {
          const isSelected = currentSelected === item.id;

          const itemStyle = isExpanded
            ? { width: "100%" }
            : {
                width: "100%",
                justifyContent: "center",
              };

          return (
            <SidebarAssets
              key={item.id}
              showIcon={true}
              showText={isExpanded} 
              text={item.label}
              status={isSelected ? "selected" : "default"}
              theme={theme}
              className={itemStyle}
              override={item.icon}
              onClick={() => {
                setCurrentSelected(item.id);
              }}
            />
          );
        })}
      </nav>
    </aside>
  );
};

SidebarMenu.propTypes = {
  type: PropTypes.oneOf(["cont", "estab"]),
  level: PropTypes.oneOf(["primary", "collapsed"]),
  theme: PropTypes.oneOf(["dark", "light"]),
  selected: PropTypes.oneOf([
    "default",
    "documentos",
    "home",
    "unidades",
    "estabelecimentos",
  ]),
  sidebarAssets: PropTypes.element,
  override: PropTypes.element,
};
