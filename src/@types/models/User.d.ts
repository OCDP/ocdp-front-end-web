/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="react-scripts" />

namespace Models {
  interface User {
    id: string;
    email: string;
    roles: string[];
    username: string;
    first_name?: string;
    last_name?: string;
    password?: string;
    token?: string;
  }

  type Login = Required<Pick<User, "username" | "password">>;
}
