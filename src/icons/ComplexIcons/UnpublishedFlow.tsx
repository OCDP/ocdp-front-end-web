import React from "react";

import ComposedIcon from "icons/ComposedIcon";
import { mdiTransitConnectionVariant, mdiUpload } from "@mdi/js";

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
      secondary={{ path: mdiUpload }}
      frameColor={frameColor}
    />
  );
};

export default PublishingFlow;
