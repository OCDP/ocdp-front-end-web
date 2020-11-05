import React from "react";

export default (...components: React.FC<any>[]) => {
  return (props: any) => {
    return components.reduce(
      (children, Current) => <Current>{children}</Current>,
      props.children
    );
  };
};
