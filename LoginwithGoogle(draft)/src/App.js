import logo from "./logo.svg";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import "./App.css";

function App() {
  //storing info/user
  const [user, setUser] = useState({});

  // function handleCallbackResponse(response) {
  //   console.log("Encoded JWT ID token: " + response.credential);
  //   var userObject = jwtDecode(response.credential);
  //   console.log(userObject);
  //   //storing
  //   setUser(userObject);
  //   //hides that login button after logging in
  //   document.getElementById("signinDiv").hidden = true;
  // }

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);

    // validate email domain
    if (userObject.email.endsWith("@szabist.pk")) {
      // storing user
      setUser(userObject);
      // hides that login button after logging in
      document.getElementById("signinDiv").hidden = true;
    } else {
      // display error message if the email is not from szabist.pk
      alert(
        "Only users with szabist.pk email addresses are allowed to log in."
      );
    }
  }

  function handleSignOut(event) {
    //managing cahe with state
    setUser({});
    document.getElementById("signinDiv").hidden = false;
  }

  useEffect(() => {
    /* global google */

    // client initialised
    google.accounts.id.initialize({
      client_id:
        "996506665388-lclp66pib77i4d39gkefrvu134k6f482.apps.googleusercontent.com",
      //"975799957356-9e6edq6t50tb5gen1a9574teerb6df05.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    //button getting rendored
    google.accounts.id.renderButton(document.getElementById("signinDiv"), {
      theme: "outline",
      size: "large",
    });
    //one tap dialogue??
    //load page first time >> promt user to log in *easily*
    //shows accounts u recently used to log in
    //acc we have in google cache
    google.accounts.id.prompt();
  }, []);

  //if we have no user: signin button
  //if we have a user: show logout button

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
