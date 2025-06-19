import { Route, Routes } from "react-router";
import "./App.css";
import SideBar from "./components/Side-bar/Side-bar";
import TopNavbar from "./components/Top-navbar/Top-navbar";
import AuthProvider from "./context/Auth-context";
import HomePage from "./pages/Home/Home-page";
import { useState } from "react";
import CatalogPage from "./pages/Catalog/Catalog-page";
import ProductPage from "./pages/Product/Product";
import RegisterPage from "./pages/Register/Register";
import LoginPage from "./pages/Login/Login";
import ProfilePage from "./pages/Profile/Profile";
import PanelPage from "./pages/Panel/Panel";
import CartPage from "./pages/Cart/Cart";

function App() {
  const [showSideBar, setSideBar] = useState(true)
  const [showPop, setShowPop] = useState(false);
  return (
    <>
      <AuthProvider>
        <TopNavbar setShowSideBar={setSideBar} setShowPop={setShowPop} showPop={showPop} />
        <Routes>
          <Route path="home" element={<HomePage />} />
          <Route path="man" element={<CatalogPage category="man" showSideBar={showSideBar} />} />
          <Route path="woman" element={<CatalogPage category="woman" showSideBar={showSideBar} />} />
          <Route path="register" element={<RegisterPage showSideBar={showSideBar}/>} />
          <Route path="login" element={<LoginPage showSideBar={showSideBar}/>} />
          <Route path="profile" element={<ProfilePage showSideBar={showSideBar}/>} />
          <Route path="product/:id" element={ <ProductPage setShowPop={setShowPop} showSideBar={showSideBar}/> } />
          <Route path="panel" element={<PanelPage showSideBar={showSideBar} />} />
          <Route path="cart" element={<CartPage />}/>
        </Routes>
        <SideBar showSideBar={showSideBar} />
      </AuthProvider>
    </>
  );
}

export default App;
