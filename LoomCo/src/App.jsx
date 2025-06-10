import { Route, Routes } from "react-router";
import "./App.css";
import SideBar from "./components/Side-bar/Side-bar";
import TopNavbar from "./components/Top-navbar/Top-navbar";
import AuthProvider from "./context/Auth-context";
import HomePage from "./pages/Home/Home-page";
import { useState } from "react";
import CatalogPage from "./pages/Catalog/Catalog-page";

function App() {
  const [showSideBar, setSideBar] = useState(true)
  return (
    <>
      <AuthProvider>
        <TopNavbar setShowSideBar={setSideBar} />
        <Routes>
          <Route path="home" element={<HomePage />} />
          <Route path="man" element={<CatalogPage category="man" showSideBar={showSideBar} />} />
          <Route path="woman" element={<CatalogPage category="woman" showSideBar={showSideBar} />} />
        </Routes>
        <SideBar showSideBar={showSideBar} />
      </AuthProvider>
    </>
  );
}

export default App;
