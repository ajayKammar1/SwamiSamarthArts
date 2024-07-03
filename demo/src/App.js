import React from "react";
import NavBAr from "./Components/NavBAr";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Customers from "./Components/Customers";
import Gallery from "./Components/Gallery";
import VIewDetails from "./Components/VIewDetails";
import EntryForm from "./Components/EntryForm";
import LoginPage from "./Components/Login";

const App = () => {
  const PrivateRoutes = () => {
    const User = localStorage.getItem("role");
    console.log(User);

    return (
      <>
        {(User && User === "Admin") || User === "User" ? (
          <Outlet />
        ) : (
          <Navigate to="/" />
        )}
      </>
    );
  };

  return (
    <div>
      <BrowserRouter>
        <NavBAr />
        <Routes>
          <Route path="/" element={<Gallery />} />
          {/* <Route path="/Photos" element={<Gallery />} /> */}
          <Route element={<PrivateRoutes />}>
            <Route path="/Order" element={<Customers />} />
            <Route path="/OrderForm/:state" element={<EntryForm />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/Order/:id/:bill" element={<VIewDetails />} />

          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
