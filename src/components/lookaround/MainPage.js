import React, { useState } from "react";
import Gallery from "./Gallery";
import LoginForm from "./LoginForm";
import axios from "axios";

const MainPage = () => {
  const adminUser = {
    email: "sample@sample.com",
    password: "1234",
  };

  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("");

  const Login = (details) => {
    if (details.email == adminUser.email && details.password == adminUser.password) {
      console.log("logged in");
      setUser({
        name: details.name,
        email: details.email,
      });
    } else {
      console.log("not matched");
      setError("Email 또는 비밀번호가 일치하지 않습니다");
    }
  };

  const Join = async (details) => {
    const joinForm = {
      join_name: details.name,
      join_email: details.email,
      join_password: details.password,
    };
    const response = await axios({
      method: "POST",
      url: `http://localhost:5000/api/join`,
      data: JSON.stringify(joinForm),
      contentType: "application/json",
      dataType: "json",
    });
    console.log(response.data.msg);
  };

  const Logout = () => {
    setUser({ name: "", email: "" });
  };
  return (
    <>
      {user.email != "" ? (
        <Gallery Logout={Logout} />
      ) : (
        <LoginForm Login={Login} Join={Join} error={error} setError={setError} />
      )}
    </>
  );
};

export default MainPage;
