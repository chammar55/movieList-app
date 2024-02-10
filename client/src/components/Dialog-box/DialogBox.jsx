import React, { useState } from "react";
import "./DialogBox.css";

function DialogBox({ isPopupVisible, setPopupVisible, pageType }) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const closePopup = () => {
    setPopupVisible(false);

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleOutsideClick = (event) => {
    if (event.target.id === "myPopup") {
      closePopup();
    }
  };

  // const auth = localStorage.getItem("user");
  // useEffect(() => {
  //   if (auth) {
  //     //   window.location = "/";
  //   }
  // }, []);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // console.log(email, password, confirmPassword);
  //   // localStorage.setItem("email", email);
  // };

  // console.log("auth");

  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log(email, password);
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    // now we are login using token
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      // navigate("/");
      closePopup();
    } else {
      alert("Please enter correct details");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Add a check for password confirmation
    if (password !== confirmPassword) {
      console.error("Password and confirmation do not match");
      // You may want to handle this case (e.g., display an error message)
      return;
    }

    // If password and confirmation match, proceed with the registration
    try {
      let result = await fetch("http://localhost:5000/register", {
        method: "post",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      result = await result.json();
      console.log(result);
      closePopup();

      // Store user in local storage so that the browser can keep the user logged in
      // localStorage.setItem("user", JSON.stringify(result));

      // Optionally, you might want to redirect the user to another page after successful registration
      // history.push("/home");
    } catch (error) {
      console.error("Error registering user:", error);
      // Handle the error appropriately (e.g., display an error message to the user)
    }
  };

  return (
    <div className="">
      {isPopupVisible && (
        <div id="myPopup" className="popup " onClick={handleOutsideClick}>
          <div className="popup-content">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h1 style={{ color: "black" }}>
                {pageType === "login" ? "Login" : "Register"}
              </h1>
              <button
                className="close-btn"
                id="closePopup"
                onClick={closePopup}
              >
                X
              </button>
            </div>
            <form className="form-form">
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
                className="dialog-con"
              >
                {pageType === "register" ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    placeholder="Your Name"
                  />
                ) : (
                  " "
                )}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Email"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Password"
                />
                {pageType === "register" ? (
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                    placeholder="Confirm Password"
                  />
                ) : (
                  ""
                )}
                {pageType === "login" ? (
                  <button onClick={handleLogin}>Login</button>
                ) : (
                  <button onClick={handleRegister}>Register</button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DialogBox;
