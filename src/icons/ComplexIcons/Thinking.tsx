import React from "react";

import ComposedIcon from "icons/ComposedIcon";
import { mdiBrain, mdiCog } from "@mdi/js";

interface Props {
  size?: string;
  frameColor?: string;
}
const Thinking: React.FC<Props> = ({ size = "32px", frameColor = "#141414" }) => {
  return (
    <ComposedIcon
      size={size}
      primary={{ path: mdiBrain }}
      secondary={{ path: mdiCog, spin: true }}
      frameColor={frameColor}
    />
  );
};

export default Thinking;
