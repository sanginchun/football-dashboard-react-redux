import React from "react";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./app/Sidebar";
import AppLogo from "./app/AppLogo";
import MainNav from "./app/MainNav";
import MainDisplay from "./app/MainDisplay";

const style = { position: "relative" };

function App() {
  return (
    <div style={style}>
      <BrowserRouter>
        <Sidebar>
          <AppLogo />
          <MainNav />
        </Sidebar>
        <MainDisplay />
      </BrowserRouter>
    </div>
  );
}

export default App;
