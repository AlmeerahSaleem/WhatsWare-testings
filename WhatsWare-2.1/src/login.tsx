import whatswareLogo from "./assets/whatsware.svg";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { GoogleAuth } from "google-auth-library";
import "./App.css";

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
  const [user, setUser] = useState<User>({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Handle login logic here
    console.log(`Email: ${email}, Password: ${password}`);
  };

  // ----------------------------------------------------------

  function handleCallbackResponse(response: any) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwtDecode(response.credential) as User;
    console.log(userObject);

    // validate email domain
    if (userObject.email.endsWith("@szabist.pk")) {
      // storing user
      setUser(userObject);
      // hides that login button after logging in
      document.getElementById("signinDiv")!.hidden = true;
    } else {
      // display error message if the email is not from szabist.pk
      alert(
        "Only users with szabist.pk email addresses are allowed to log in."
      );
    }
  }

  function handleSignOut(event: React.MouseEvent<HTMLButtonElement>) {
    //managing cahe with state
    setUser({});
    document.getElementById("signinDiv")!.hidden = false;
  }

  //   useEffect(() => {
  //     /* global google */

  //     // client initialised
  //     google.accounts.id.initialize({
  //       client_id:
  //         "996506665388-lclp66pib77i4d39gkefrvu134k6f482.apps.googleusercontent.com",
  //       //"975799957356-9e6edq6t50tb5gen1a9574teerb6df05.apps.googleusercontent.com",
  //       callback: handleCallbackResponse,
  //     });
  //     //button getting rendored
  //     google.accounts.id.renderButton(document.getElementById("signinDiv"), {
  //       theme: "outline",
  //       size: "large",
  //     });
  //     //one tap dialogue??
  //     //load page first time >> promt user to log in *easily*
  //     //shows accounts u recently used to log in
  //     //acc we have in google cache
  //     google.accounts.id.prompt();
  //   }, []);

  useEffect(() => {
    // const googleAuth = google.accounts.id();
    const googleAuth = new GoogleAuth();

    googleAuth.initialize({
      client_id:
        "996506665388-lclp66pib77i4d39gkefrvu134k6f482.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    googleAuth.renderButton(document.getElementById("signinDiv")!, {
      theme: "outline",
      size: "large",
    });

    googleAuth.prompt();
  }, []);

  //if we have no user: signin button
  //if we have a user: show logout button

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
          <button>Login with Google</button>
          {/* ------login with google------- */}
          <div id="signinDiv"></div>
          {
            //user actually has full user attributes
            //which means our user is logged in
            Object.keys(user).length != 0 && (
              <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
            )
          }

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
