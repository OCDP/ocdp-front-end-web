import React, { useMemo } from "react";
import "./ComposedIcon.less";

import { IconProps } from "@mdi/react/dist/IconProps";
import Icon from "@mdi/react";

type Position = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
type CustomPosition = Pick<
  React.CSSProperties,
  "top" | "left" | "bottom" | "right" | "transform"
>;

type SecondaryIconPosition = Position | CustomPosition;

const positions: Record<Position, CustomPosition> = {
  bottomLeft: { bottom: 0, left: 0 },
  bottomRight: { bottom: 0, right: 0 },
  topLeft: { top: 0, left: 0 },
  topRight: { top: 0, right: 0 },
};

type SubIconProps = Pick<
  IconProps,
  "path" | "spin" | "ref" | "horizontal" | "vertical" | "inStack"
> & { position?: SecondaryIconPosition };

type Props = Omit<IconProps, "size" | "path" | "spin" | "vertical" | ""> & {
  size?: string;
  primary: SubIconProps;
  secondary: SubIconProps & { size?: string };
  frameColor?: string;
};
const ComposedIcon: React.FC<Props> = ({
  className = "",
  size = "1em",
  style,
  primary,
  secondary,
  frameColor = "var(--background-color)",
  ...materialIconProps
}) => {
  const secondaryIconPosition = useMemo(() => {
    const position =
      positions[(secondary.position as Position) || "bottomLeft"];
    return position || secondary.position;
  }, [secondary]);

  return (
    <article
      className={`anticon composed-icon-wrapper ${className}`}
      style={{
        ...style,
        minHeight: size,
        minWidth: size,
        maxHeight: size,
        maxWidth: size,
        lineHeight: size,
      }}
    >
      <Icon
        className="composed-icon primary"
        {...{ ...materialIconProps, ...primary }}
        size={size}
      />
      <Icon
        className="composed-icon secondary"
        {...{ ...materialIconProps, ...secondary }}
        style={{
          backgroundColor: frameColor,
          ...secondaryIconPosition,
          height: secondary.size || "55%",
          width: secondary.size || "55%",
        }}
      />
    </article>
  );
};

export default ComposedIcon;
