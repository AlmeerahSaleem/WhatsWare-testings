//to be deleted, routhing error probably

import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import whatswareLogo from "./assets/whatsware.svg";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Handle login logic here
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}
      {/* <h1>Vite + React</h1> */}

      {/* 
      
      */}
      {/* <h1>WhatsWare</h1> */}

      <div
        className="card"
        style={{
          border: "20px #1B4332",
          borderRadius: "10px",
          backgroundColor: "#333333",
        }}
      >
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}

        <a href="#" target="_blank">
          <img
            src={whatswareLogo}
            className="logo whatsware"
            alt="WhatsWare logo"
            style={{ width: "70%", height: "70%" }}
          />
        </a>

        <div className="login">
          {/* <h3>Login</h3> */}

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <input
              type="text"
              placeholder="SZABIST Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: 10,
                border: "1px solid #d9d9d9",
                borderRadius: 5,
                boxSizing: "border-box",
                fontSize: 16,
                color: "#212121",
                backgroundColor: "#fff",
                marginBottom: -7 /* Add spacing between fields */,
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: 10,
                border: "1px solid #d9d9d9",
                borderRadius: 5,
                boxSizing: "border-box",
                fontSize: 16,
                color: "#212121",
                backgroundColor: "#fff",
              }}
            />
            <button onClick={handleLogin}>Login</button>
          </div>
        </div>

        <p>
          <button>Login with Google</button>
        </p>
      </div>
    </>
  );
}

export default App;
