import React, { useState } from "react";
import "./ProfilePage.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function ProfilePage() {
  const [file, setFile] = useState(null);
  const [image, setimage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [deleteAccount, setDeleteAccount] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [samePass, setSamePass] = useState(false);
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  //   console.log(userId);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    // console.log(params);
    let result = await fetch(`http://localhost:5000/get-user/${userId}`, {
      //we are sending token to productlist api
      //we are authenicating users by their tokens
      headers: {
        //bearer is to make auth more strong.we are checking it in verifyToken middleware in index.js file so that why we have to type it here with token itself
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setName(result[0].name);
    setEmail(result[0].email);
    setPassword(result[0].password);
    setConfirmPassword(result[0].password);
    setFile(result[0].image);
    localStorage.setItem("userImage", result[0].image);
    localStorage.setItem("userName", result[0].name);
    // console.log(result[0]);
  };

  const onChangimage = (events) => {
    setimage(events.target.files[0]);
    // console.log(events.target.files[0]);
    // if (events.target.files.length > 0) {
    //   const file = URL.createObjectURL(events.target.files[0]);
    //   setFile(file);
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setSamePass(true);
    }
    if (password !== confirmPassword) {
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("image", image);

    const result = axios.put(
      `http://localhost:5000/update-user/${userId}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    // let result = await fetch(`http://localhost:5000/update-user/${userId}`, {
    //   method: "Put",
    //     body: JSON.stringify({ name, email, password }), //send updated values
    // //   body: formData, //send updated values
    //   //we are sending token to productlist api
    //   //we are authenicating users by their tokens
    //   headers: {
    //     "Content-Type": "application/json",
    //     //bearer is to make auth more strong.we are checking it in verifyToken middleware in index.js file so that why we have to type it here with token itself
    //     authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
    //   },
    // });
    result = await result.json();
    if (result) {
      alert("Submitted");

      console.log(result);
    }
    setSamePass(false);
    // navigate("/");
  };

  const handleDelete = async () => {
    let result = await fetch(`http://localhost:5000/delete-user/${userId}`, {
      method: "Delete",
      //we are sending token to productlist api
      //we are authenicating users by their tokens
      headers: {
        //bearer is to make auth more strong.we are checking it in verifyToken middleware in index.js file so that why we have to type it here with token itself
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      handleDeleteUserList(userId);
      localStorage.clear();
      alert("Account is deleted and all its data");
    }
  };

  // if user delete then also delete its data
  const handleDeleteUserList = async (_id) => {
    let result = await fetch(
      `http://localhost:5000/delete-movieUserMovieList/${_id}`,
      {
        method: "Delete",
      }
    );
    result = await result.json();
    if (result) {
      // alert("record is deleted");

      console.log(result);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="img-div">
          {file ? (
            <img alt="" src={require(`../../images/${file}`)} />
          ) : (
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEXk5ueutLepsLPo6uursbXJzc/p6+zj5ea2u76orrKvtbi0ubzZ3N3O0dPAxcfg4uPMz9HU19i8wcPDx8qKXtGiAAAFTElEQVR4nO2d3XqzIAyAhUD916L3f6+f1m7tVvtNINFg8x5tZ32fQAIoMcsEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQTghAJD1jWtnXJPP/54IgNzZQulSmxvTH6oYXX4WS+ivhTbqBa1r26cvCdCu6i0YXbdZ0o4A1rzV+5IcE3YE+z58T45lqo7g1Aa/JY5tgoqQF3qb382x7lNzBLcxft+O17QUYfQI4IIeklKsPSN4i6LKj/7Zm8n99RbHJpEw9gEBXNBpKIYLJqKYRwjOikf//r+J8ZsVuacbqCMNleI9TqGLGqMzhnVdBOdd6F/RlrFijiCoVMk320CBIahUxTWI0KKEcJqKbMdpdJb5QvdHq6wCI5qhKlgGMS/RBHkubWDAE+QZxB4xhCyDiDkLZxgGEVdQldzSKbTIhmZkFkSEPcVvmBn2SMuZB9od7fQDsMiDdKJjFUSCQarM5WirZ3C2TT/htYnyPcPfgrFHWz0BI74gr6J/IZiGUxAZGQLqmvQLTrtE/Go4YxhVRIpEw+sww1IIcqr5NKmUUzLF3d4/qPkYIp2T/obPuemlojFUR4t9Q2Vojhb7BmgElWHzLPH8hucfpefPNFTVgs9h1AdU/Pin96vwWbWdf+X9Absn3OdO34aMdsDnP8WgKYisTqI6CkNGqZQo1XA6Ef6AU32SJzOcBukHPF07/xNSgmHKa5BOhtezv6mA/rYJpwXNAnbRZ1XuF3BzDcO3vpA3+ny2909gbqE4hhD3LIPhLLyBNhPZvbZ3B+3tPYa18A7auSlXQayKwTPNLKDcuOB0xPYKDPFTkWsevQPRZ1J8Hji9I1KQ34r7hZhrwNwOZ97QxNx0drwn4QI0wQk1DcEsfKCWKdxVvxPSNUIp/knmAXT+nT+Ko3+0H96rcNb3m1fx7MBTJdeBJ7uFcWsc0wvgAsC4pROW0l2inbAmIBv/7GZmuhQH6API2rr8T0e6yuZJ+80A9LZeG62T3tik31XwxtwZcizKuTHkMjB1WdZde4Kmic/A5ZI3rr1ae21d08PlVHYfAaxw9G9CYRbJ+8ZdbTcMRV1XM3VdF0M32vtoTdZ0+u29s0OttJ5bz64UwinjaFMVY9vkqc3KKSxN21Xl+0L4Q3Vuv1tYl0pqnX6ms4XetFz7gdZVAgUEoJntfOUe4ZwsHd9FzqQ3Vv6xe41l0XJcqcKl6TZvlv7ClAW3BsqQW4X7ypApB8dmTgK4IX5wvqIVj33HtD2qSG4BqznxdIefL27Y4sahi0MdIdvUsDva8agGGbCtITmCY31MHD2O0uIdh/0rJDQ1VX5Zdxz3rR2QDbv6qXl9vudzqQtGm1Jv9LDXOsfvvB7VcZ8PDKD0mQ1VHPYQ9O+Yj4hR1IUD8rBnn3ho2m8oQMxbCFiKlL2ioSW5heeJqegED52CzxCtcGD3Kv8Wms9EYLyUhwaFIhSMBClevWEmiK/Iaogu4H7sg6ppQhQG8RUqivuTGOAJOg6FfgW0q0M0PQMRMEgXaeNf3SYDZ8PIMI0+wHgr/MgN7wYwpiLjCCqM6ydUDZLQiB6nDdNC8SDyig3jPPpFXGcC9O8BUBDVmgBY59E7Md/35Loe/UVEECEJwYggJjELZ4J71SaQSBeC02n4Da29CayJNA28SAhd2CQyC1Xw6pSmGSINQVuMhAZp4DClan9MgmkDDNmezqwS8sgtlXK/EPBhoaSmYVC/F7IO1jQEdHOlabpKh3+jzLQSTUiq4X2I+Ip/zU8rlaqAvkS21ElR+gqu3zbjjL+hIAiCIAiCIAiCIAiCsCf/AKrfVhSbvA+DAAAAAElFTkSuQmCC"
              alt=""
            />
          )}
        </div>
        <div className="main-div">
          <div className="name-div">
            <label htmlFor="">Name</label>{" "}
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Your Name"
            />
          </div>
          <div className="name-div">
            <label htmlFor="">Email</label>{" "}
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
            />
          </div>
          <div className="name-div">
            <label htmlFor="">password</label>{" "}
            <input
              type="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
            />
          </div>
          <div className="name-div">
            <label htmlFor="">Confirm Password</label>{" "}
            <input
              type="Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              placeholder="Confirm Password"
            />
          </div>
          <div>
            {samePass ? (
              <p style={{ color: "red", fontSize: "18px" }}>
                Password must be same
              </p>
            ) : (
              ""
            )}
          </div>

          <div className="">
            <p>Choose your image</p>

            <input
              className=" "
              onChange={onChangimage}
              accept="image/*"
              single
              type="file"
            />
            {file && <p>Selected file: {file}</p>}
          </div>

          <div className="submit-btn">
            <button>
              {/* <Link to="">Submit</Link> */}
              Submit
            </button>
          </div>
        </div>
      </form>
      <div className="Delete-btn">
        <button onClick={handleDelete}>
          <Link style={{ textDecoration: "none", color: "black" }} to="/">
            {" "}
            Delete Account
          </Link>
          {/* Delete Account */}
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
