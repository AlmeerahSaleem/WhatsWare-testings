import { useState, useEffect } from "react";
import whatswareLogo from "./assets/whatsware.svg";
import "./App.css";
import { socket } from "./socket";

function App() {
  useEffect(() => {
    setInterval(() => {
      socket.emit("client", { n: Date() });
    }, 2000);

    socket.on("reply", (data) => {
      //console.log("Client disconnected");

      console.log(`client receives ${JSON.stringify(data)} - ${socket.id}`);
      //io.to(socket.id).emit('reply', data);
    });
  }, []);

  const handleClick = () => {
    // Navigate to the login page
    window.location.href = "./login/login.tsx";
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
        <button onClick={handleClick}>Login With WhatsWare</button>

        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">FYP 1</p>
    </>
  );
}

export default App;
