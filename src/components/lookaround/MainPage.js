import React, { useState, useContext } from "react";
import Gallery from "./Gallery";
import LoginForm from "./LoginForm";
import axios from "axios";
import LoginContext from "../../context/LoginContext";
import Cookies from "universal-cookie/es6";

const MainPage = () => {
  const context = useContext(LoginContext);
  const [error, setError] = useState("");
  const cookies = new Cookies();

  const Login = async (details) => {
    const joinForm = {
      login_id: details.id,
      login_password: details.password,
    };
    console.log(typeof details.id);
    if (details.password.length < 1 || details.id.lenth < 1) {
      setError("ID와 비밀번호를 정확히 입력해 주세요.");
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
        context.setUser({
          name: response.data.name,
          id: details.id,
        });
        const access_token = response.data.access_token;
        //cookie_string = `jwt=${access_token}; max-age=${60 * 60 * 24 * 30}; Path=/; httpOnly;`;
        cookies.set("jwt", access_token, {
          path: "/",
          maxAge: 60 * 60 * 24 * 30, //httponly 옵션을 없애니까 된다,,
        });
      } else if (msg == "tryagain") {
        setError("ID와 비밀번호를 정확히 입력해 주세요. ");
      }
    }
  };

  const Join = async (details, onJoin) => {
    const joinForm = {
      join_name: details.name,
      join_id: details.id,
      join_password: details.password,
    };
    if (details.password.length < 8) {
      setError("비밀번호는 최소 8자 이상이어야 합니다.");
      return;
    } else if (details.name.length < 2) {
      setError("이름은 최소 2자 이상이어야 합니다.");
      return;
    }
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
      setError("사용할 수 없는 ID 입니다.");
    } else if (msg == "registered") {
      onJoin(false);
    }
  };

  const Logout = async () => {
    context.setUser({ name: "", id: "" });

    const jwt_token = cookies.get("jwt");
    const response = await axios({
      method: "get",
      url: `http://localhost:5000/api/logout`,
      headers: {
        Authorization: jwt_token,
      },
    });
    if (response.data.msg == "succeeded") {
      cookies.remove("jwt");
    }
  };
  return (
    <>
      {context.user.id != "" ? (
        <Gallery Logout={Logout} />
      ) : (
        <LoginForm Login={Login} Join={Join} error={error} setError={setError} />
      )}
    </>
  );
};

export default MainPage;
