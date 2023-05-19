import { useEffect, useState } from "react";
import { Routes, Route, redirect } from "react-router-dom";
import Cookies from "js-cookie";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

import AuthPage from "../AuthPage/AuthPage";
import Footer from "../../Components/Footer/Footer";
import NavBar from "../../Components/NavBar/NavBar";
import SearchPage from "../SearchPage/SearchPage";

import "./App.css";

function App() {
  const [user, setUser] = useState(checkForCookies);

 
  function checkForCookies() {
    const cookieVal = Cookies.get("hasCookies");
    console.log(cookieVal);
    if (cookieVal) {
      console.log(cookieVal);
      return true;
    } else {
      return false;
    }
  }


  return (
    <main className="App">
      {user ? (
        <>
          <NavBar setUser={setUser} />
          <div className="flex-grow-1 overflow-auto">
            <Routes>
              <Route path="/" element={<SearchPage />} />
            </Routes>
          </div>
          <Footer />
        </>
      ) : (
        <>
          <div className="flex-grow-1 overflow-auto">
            <AuthPage setUser={setUser} />
          </div>
        </>
      )}
    </main>
  );
}

export default App;
