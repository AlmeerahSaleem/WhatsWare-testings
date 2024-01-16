import React, { useRef } from "react";
// import { GoogleAuth } from "google-auth-library-browser";
import { GoogleAuth } from "google-auth-library";
import whatswareLogo from "./assets/whatsware.svg";
import jwtDecode from "jwt-decode";
import jwtVerify from "jsonwebtoken";
import { useEffect, useState } from "react";

interface User {
  email: string;
  name: string;
  picture: string;
  sub: string;
  iss: string;
  azp: string;
  aud: string;
  iat: number;
  exp: number;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signInDivRef = useRef<HTMLDivElement>(null);

  const handleLogin = () => {
    // Handle login logic here
    console.log(`Email: ${email}, Password: ${password}`);
  };

  function handleCallbackResponse(response: any) {
    console.log("Encoded JWT ID token: " + response.credential);
    const decodedToken = jwtDecode(response.credential) as User;
    console.log(decodedToken);

    // validate email domain
    if (decodedToken.email.endsWith("@szabist.pk")) {
      try {
        // verify token
        const secret =
          "996506665388-lclp66pib77i4d39gkefrvu134k6f482.apps.googleusercontent.com"; // replace with your own secret key
        jwtVerify(response.credential, secret);

        // storing user
        setUser(decodedToken);
        // hides that login button after logging in
        signInDivRef.current!.hidden = true;
      } catch (error) {
        console.error(error);
        alert("Invalid ID token.");
      }
    } else {
      // display error message if the email is not from szabist.pk
      alert(
        "Only users with szabist.pk email addresses are allowed to log in."
      );
    }
  }

  function handleSignOut(event: React.MouseEvent<HTMLButtonElement>) {
    // managing cahe with state
    setUser(null);
    signInDivRef.current!.hidden = false;
  }

  useEffect(() => {
    const googleAuth = new GoogleAuth();

    googleAuth.initialize({
      client_id:
        "996506665388-lclp66pib77i4d39gkefrvu134k6f482.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    googleAuth.renderButton(signInDivRef.current!, {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <>
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
          <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
          {/* ------login with google------- */}
          <div ref={signInDivRef}></div>
          {user && (
            <div>
              <img src={user.picture}></img>
              <h3>{user.name}</h3>
            </div>
          )}
        </p>
      </div>
    </>
  );
}

export default App;
