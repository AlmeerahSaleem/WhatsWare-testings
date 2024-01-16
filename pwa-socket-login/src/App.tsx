//simple login + web scoket, but all in one page, no routing

import { useState, useEffect } from "react";
import whatswareLogo from "./assets/whatsware.svg";
import "./App.css";
import "./webSocket";
import { socket } from "./socket";

function App() {
  //pwa part
  useEffect(() => {
    setInterval(() => {
      socket.emit("client", { n: Date() });
    }, 2000);

    socket.on("reply", (data) => {
      console.log(`client receives ${JSON.stringify(data)} - ${socket.id}`);
    });
  }, []);

  const handleClickLogin = () => {
    // Navigate to the login page
    window.location.href = "./login";
  };
  const handleClickSocket = () => {
    // Navigate to the login page
    window.location.href = "./webSocket";
  };

  return (
    <>
      <div>
        <a href="#">
          <img src={whatswareLogo} className="logo" alt="WhatsWare logo" />
        </a>
      </div>
      <h1>WhatsWare</h1>
      <div className="card">
        <p>
          <button onClick={handleClickLogin}>Login With WhatsWare</button>
        </p>
        <p>
          <button onClick={handleClickSocket}>socket.io connection</button>
        </p>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p>FYP 1</p>
    </>
  );
}

export default App;
