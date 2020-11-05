import React from "react";
import { AppProvider } from "contexts/AppContext";
import MainRouter from "routes/MainRouter";
import { UserProvider } from "contexts/UserContext";

function App() {
  return (
    <AppProvider>
      <UserProvider>
        <MainRouter />
      </UserProvider>
    </AppProvider>
  );
}

export default App;
