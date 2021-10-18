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

  const Login = async (details) => {
    /*  if (details.email == adminUser.email && details.password == adminUser.password) {
      console.log("logged in");
      setUser({
        name: details.name,
        email: details.email,
      });
    } else {
      console.log("not matched");
      setError("Email 또는 비밀번호가 일치하지 않습니다");
    } */
    const joinForm = {
      login_email: details.email,
      login_password: details.password,
    };
    console.log(typeof details.email);
    if (details.password.length < 1 || details.email.lenth < 1) {
      setError("email과 비밀번호를 정확히 입력해 주세요.");
    } else if (!(details.email.includes("@") && details.email.includes("."))) {
      setError("잘못된 email 형식입니다.");
    } else {
      const response = await axios({
        method: "POST",
        url: `http://localhost:5000/api/login`,
        data: JSON.stringify(joinForm),
        headers: {
          "Content-Type": `application/json`,
        },
      });
      const msg = response.data.msg;
      if (msg == "allowed") {
        setUser({
          name: details.name,
          email: details.email,
        });
      } else if (msg == "tryagain") {
        setError("email과 비밀번호를 정확히 입력해 주세요. ");
      }
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
      headers: {
        "Content-Type": `application/json`,
      },
    });
    const msg = response.data.msg;
    if (msg == "invalid") {
      setError("사용할 수 없는 email 입니다.");
    }
    if (details.password.length < 8) {
      setError("비밀번호는 최소 8자 이상이어야 합니다.");
    }
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
