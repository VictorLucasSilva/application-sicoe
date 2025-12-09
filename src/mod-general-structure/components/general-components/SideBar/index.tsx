// src/mod-general-structure/components/general-components/SideBar/index.tsx
import PropTypes from "prop-types";
import { type JSX, useEffect, useState } from "react";

import { SidebarAssets } from "../SidebarAssets";

// Ícones existentes (pode trocar depois se quiser)
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
    | "PCA"
    | "default"
    | "documentos"
    | "home"
    | "unidades"
    | "estabelecimentos";
  className?: React.CSSProperties;
  sidebarAssets?: JSX.Element; // ícone da Home (contratos)
  override?: JSX.Element; // ícone da PCA (contratos)
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
      className={{ height: "24px", position: "relative", width: "24px" }}
      color="#465EFF"
    />
  ),
  override,
}: Props): JSX.Element => {
  // expandido ou colapsado (começa no level recebido por props)
  const [isExpanded, setIsExpanded] = useState(level === "primary");

  // item selecionado visualmente
  const [currentSelected, setCurrentSelected] = useState<MenuKey>(selected);

  // se o pai mudar a prop selected, sincroniza
  useEffect(() => {
    setCurrentSelected(selected);
  }, [selected]);

  // itens para contratos (Home / PCA)
  const contractItems: MenuItem[] = [
    {
      id: "home",
      label: "Home",
      icon: sidebarAssets,
    },
    {
      id: "PCA",
      label: "PCA",
      icon:
        override ??
        sidebarAssets, // pode passar outro ícone por props depois, se quiser
    },
  ];

  // itens para estabelecimento (Home / Documentos / Unidades / Estabelecimentos)
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

          // quando colapsado, centraliza só o ícone
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
              showText={isExpanded} // só mostra o texto quando expandido
              text={item.label}
              status={isSelected ? "selected" : "default"}
              theme={theme}
              className={itemStyle}
              override={item.icon}
              onClick={() => {
                setCurrentSelected(item.id);
                // aqui no futuro você pode disparar navegação/rota se quiser
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
    "PCA",
    "default",
    "documentos",
    "home",
    "unidades",
    "estabelecimentos",
  ]),
  sidebarAssets: PropTypes.element,
  override: PropTypes.element,
};
