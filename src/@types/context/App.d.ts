/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="react-scripts" />

namespace Contexts {
  interface App {
    openDrawer: (configs: Models.AppDrawer) => () => void;
    closeDrawer: () => void;
    drawerVisible: boolean;
  }
}
