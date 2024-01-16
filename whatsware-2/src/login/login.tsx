import { useState, useEffect } from "react";
import whatswareLogo from "../assets/whatsware.svg";
import { jwtDecode } from "jwt-decode";
import "./login.css";

interface User {
  email: string;
  name: string;
  picture: string;
  sub: string;
}

interface Response {
  credential: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  function handleCallbackResponse(response: Response) {
    console.log("Encoded JWT ID token: " + response.credential);
    const userObject = jwtDecode(response.credential) as User;
    console.log(userObject);

    if (userObject.email.endsWith("@szabist.pk")) {
      setUser(userObject);
      document.getElementById("signinDiv")?.hidden = true;
    } else {
      alert(
        "Only users with szabist.pk email addresses are allowed to log in."
      );
    }
  }

  function handleSignOut(event: React.MouseEvent<HTMLButtonElement>) {
    setUser(null);
    document.getElementById("signinDiv")?.hidden = false;
  }

  useEffect(() => {
    /* global google */

    google.accounts.id.initialize({
      client_id:
        "996506665388-lclp66pib77i4d39gkefrvu134k6f482.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signinDiv"), {
      theme: "outline",
      size: "large",
    });

    google.accounts.id.prompt();
  }, []);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
  }

  return (
    <div
      className="card"
      style={{
        border: "20px #1B4332",
        borderRadius: "10px",
        backgroundColor: "#333333",
      }}
    >
      <a href="#" target="_blank">
        <img
          src={whatswareLogo}
          className="logo whatsware"
          alt="WhatsWare logo"
          style={{ width: "70%", height: "70%" }}
        />
      </a>

      <div className="login">
        <h3>Login</h3>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="SZABIST Email"
            value={email}
            required
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
            required
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
          <button type="submit">Login</button>
        </form>
      </div>

      <div id="signinDiv"></div>

      {user && (
        <div>
          <img src={user.picture}></img>
          <h3>{user.name}</h3>
        </div>
      )}

      <p>
        <button onClick={handleSignOut}>Sign Out</button>
      </p>
    </div>
  );
}

export default App;
