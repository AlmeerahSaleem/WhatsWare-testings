import { useState, useEffect } from "react";
import whatswareLogo from "./assets/whatsware.svg";
import "./App.css";
import "./WebSocket.css";
import { socket } from "./socket";
import { io } from "socket.io-client";

function App() {
  //web socket part ------------------------------
  const [connectedClients, setConnectedClients] = useState([]);
  const [socketClient, setSocketClient] = useState(null);

  useEffect(() => {
    // Connect to the WebSocket server
    const socket = io("ws://localhost:8000");

    // Listen for successful connection
    socket.on("connect", () => {
      console.log("Connected to server");

      // Update the list of connected clients
      setConnectedClients((prevClients) => [
        ...prevClients,
        { id: socket.id, messages: [] },
      ]);
    });

    // Listen for disconnections
    socket.on("disconnect", (reason) => {
      console.log("Client disconnected: " + reason);

      // Update the list of connected clients
      setConnectedClients((prevClients) =>
        prevClients.filter((client) => client.id !== socket.id)
      );
    });

    // Save the socket instance to state
    setSocketClient(socket);

    // Clear the interval when the component is unmounted
    return () => {
      socket.disconnect();
    };
  }, []);

  // Function to send a message to the server
  const sendMessageToServer = (message) => {
    if (socketClient) {
      socketClient.emit("message", message);
    } else {
      console.error("Socket connection not established");
    }
  };

  //pwa part ------------------------------------------------
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
          <div className="App">
            <p>WebSocket app</p>

            <div>
              <p>Connected Clients:</p>
              <ul>
                {connectedClients.map((client) => (
                  <li key={client.id}>
                    {client.id} - Messages: {client.messages.join(", ")}
                  </li>
                ))}
              </ul>
            </div>

            <button onClick={() => sendMessageToServer("Hello from React!")}>
              Send Message to Server
            </button>
          </div>
        </p>
      </div>
      <p>FYP 1</p>
    </>
  );
}

export default App;
