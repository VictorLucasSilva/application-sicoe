import { type JSX } from "react";
import classes from "./style.module.css";

type IconCardContractProps = {
  src?: string;
  alt?: string;
};

import fallback from "../../../../../../public/icons/filter.svg";

export const IconCardContract = ({
  src = fallback,
  alt = "Ícone",
}: IconCardContractProps): JSX.Element => {
  return (
    <div className={classes.container}>
      <img className={classes.vector} alt={alt} src={src} />
    </div>
  );
};
