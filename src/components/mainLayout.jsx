import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";

export default function MainLayout() {
  return (
    <div>
      <Header />

      <div className="strip"></div>

      <main>
        <Outlet />
      </main>

      <footer>
        <div>&copy; 2022 Amit Hagbi</div>
      </footer>
    </div>
  );
}
