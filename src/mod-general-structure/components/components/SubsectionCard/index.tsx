import { type JSX } from "react";
import classes from "./style.module.css";

import { MicroCard } from "../Card";
import { IconCardContract } from "../../general-components/IconSvg/IconCardContract";

type SubsectionCardItem = {
  label: string;
  value: string | number;
  iconSrc: string;
  className?: object;
};

type Props = {
  items: SubsectionCardItem[];
};

export const SubsectionCard = ({ items }: Props): JSX.Element => {
  return (
    <div className={classes.container}>
      {items.map((item) => (
        <MicroCard
          key={item.label}
          elevation="off"
          theme="light"
          titleLabel={String(item.value)}
          complementaryContent={item.label}
          override={<IconCardContract src={item.iconSrc} alt={item.label} />}
          className={{
            flex: "1",
            minWidth: "160px",
            width: "100%",
            height: "76px",
          }}
          textClassName={{ color: "var(--neutrallowdarkest)" }}
          textClassNameOverride={{ color: "var(--colors-neutral-low-medium)" }}
        />
      ))}
    </div>
  );
};
