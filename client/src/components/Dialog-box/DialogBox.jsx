import React, { useState } from "react";
import "./DialogBox.css";

function DialogBox({ isPopupVisible, setPopupVisible }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [conformPassword, setConformPassword] = useState();

  const closePopup = () => {
    setPopupVisible(false);
  };

  const handleOutsideClick = (event) => {
    if (event.target.id === "myPopup") {
      closePopup();
    }
  };

  const auth = localStorage.getItem("email");
  //   useEffect(() => {
  //     if (auth) {
  //       //   window.location = "/";
  //     }
  //   }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password, conformPassword);
    localStorage.setItem("email", email);
  };

  return (
    <div>
      {isPopupVisible && (
        <div id="myPopup" className="popup" onClick={handleOutsideClick}>
          <div className="popup-content">
            <h1 style={{ color: "black" }}>{auth ? "Login" : "Register"}</h1>
            <form onSubmit={handleSubmit}>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
                className="dialog-con"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Email"
                />
                <input
                  type="text"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Password"
                />
                {!auth ? (
                  <input
                    type="text"
                    value={conformPassword}
                    onChange={(e) => {
                      setConformPassword(e.target.value);
                    }}
                    placeholder="Conform Password"
                  />
                ) : (
                  ""
                )}
                <button>{auth ? "Login" : "Register"}</button>
              </div>
              <button id="closePopup" onClick={closePopup}>
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DialogBox;
