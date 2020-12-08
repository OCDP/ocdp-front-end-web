import React from "react";

import ComposedIcon from "icons/ComposedIcon";
import { mdiTransitConnectionVariant, mdiProgressUpload } from "@mdi/js";

interface Props {
  size?: string;
  frameColor?: string;
}
const PublishingFlow: React.FC<Props> = ({
  size = "32px",
  frameColor = "#141414",
}) => {
  return (
    <ComposedIcon
      size={size}
      primary={{ path: mdiTransitConnectionVariant }}
      secondary={{ path: mdiProgressUpload, position: "bottomRight" }}
      frameColor={frameColor}
    />
  );
};

export default PublishingFlow;
