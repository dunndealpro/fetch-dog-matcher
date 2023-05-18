import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import AuthPage from "../AuthPage/AuthPage";
import Footer from "../../Components/Footer/Footer";
import NavBar from "../../Components/NavBar/NavBar";
import SearchPage from "../SearchPage/SearchPage";

import "./App.css";

function App() {

  const [user, setUser] = useState(false);

  return (
    <main>
      {user ? (
        <>
          <NavBar />
          <SearchPage />
          <Footer />
        </>
      ) : (
        <>
          <AuthPage setUser={setUser}/>
        </>
      )}
    </main>
  );
}

export default App;
