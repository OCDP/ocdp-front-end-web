/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="react-scripts" />

namespace Models {
  type Overflow = "scroll" | "hidden" | "auto";
  interface AppDrawer {
    content: React.ReactNode;
    onOk?: () => void;
    onCancel?: () => void;
    title?: string;
    size?: DrawerSize;
    overflow?: Overflow | [Overflow, Overflow];
  }

  type DrawerSize = "sm" | "md" | "lg";
}
