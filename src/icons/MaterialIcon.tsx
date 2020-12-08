import React from "react";
import Icon from "@mdi/react";
import { IconProps } from "@mdi/react/dist/IconProps";

const MaterialIcon: React.FC<IconProps> = ({
  className,
  ...materialIconProps
}) => {
  return (
    <Icon
      size="1em"
      className={`anticon ${className}`}
      {...materialIconProps}
    />
  );
};

export default MaterialIcon;
