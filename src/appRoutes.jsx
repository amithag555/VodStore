import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DisplayItemInfo from "./components/displayItemInfo";
import DisplaySearchResult from "./components/displaySearchResult";
import InfoLayout from "./components/infoLayout";
import MainLayout from "./components/mainLayout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<DisplaySearchResult />} />
          <Route path="/search/:searchQ" element={<DisplaySearchResult />} />
          <Route path="/year/:YYYY/search/:searchQ" element={<DisplaySearchResult />} />
          <Route path="/search/" element={<DisplaySearchResult />} />
        </Route>

        <Route path="/infoLayout" element={<InfoLayout />}>
          <Route path="video/:id" element={<DisplayItemInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
