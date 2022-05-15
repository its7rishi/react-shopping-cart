import React, { useState } from "react";
import "./styles.css";
import { Login } from "./components/Login";
import { Shop } from "./components/Shop";

export default function App() {
  const [user, setUser] = useState("");
  const [login, setLogin] = useState(false);

  const updateUser = (e) => {
    e.preventDefault();
    setLogin(true);
    setUser(e.target[0].value);
  };
  return (
    <div className="App">
      {!login ? <Login updateUser={updateUser} /> : <Shop user={user} />}
    </div>
  );
}
