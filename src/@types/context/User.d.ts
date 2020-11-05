/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="react-scripts" />

namespace Contexts {
  interface User {
    user: Models.User;
    login: (data: Models.Login) => Promise<void>;
    isAuthenticated: boolean;
    verifyToken: () => Promise<boolean>;
  }
}
