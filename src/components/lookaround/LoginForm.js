import React, { useState, useContext } from "react";
import LoginContext from "../../context/LoginContext";
import axios from "axios";
import Cookies from "universal-cookie/es6";

const LoginForm = ({ error, setError }) => {
  const [details, setDetails] = useState({ name: "", id: "", password: "" });
  const [isjoin, setIsjoin] = useState(false);
  const context = useContext(LoginContext);
  const cookies = new Cookies();

  const onJoin = () => {
    setIsjoin((prev) => !prev);
    setError("&nbsp");
  };

  const Login = async (details) => {
    const joinForm = {
      login_id: details.id,
      login_password: details.password,
    };
    if (details.password.length < 1 || details.id.lenth < 1) {
      setError("ID와 비밀번호를 정확히 입력해 주세요.");
    } else {
      const response = await axios({
        method: "POST",
        url: `http://localhost:5000/api/login`,
        //url: `http://9yujin.shop:5000/api/login`,
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
        cookies.set("jwt", access_token, {
          path: "/",
          maxAge: 60 * 60 * 24 * 30,
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
      //url: `http://9yujin.shop:5000/api/join`,
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

  const submitHandler = (e) => {
    e.preventDefault();

    if (!isjoin) {
      Login(details);
    } else {
      Join(details, onJoin);
    }
  };

  return (
    <>
      <main>
        <div className="container">
          <div className="form-wrapper">
            <form onSubmit={submitHandler}>
              <div className="form-inner">
                {isjoin && (
                  <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      onChange={(e) => setDetails({ ...details, name: e.target.value })}
                      value={details.name}
                    />
                  </div>
                )}
                <div className="form-group">
                  <label htmlFor="id">ID:</label>
                  <input
                    type="text"
                    name="id"
                    id="id"
                    onChange={(e) => setDetails({ ...details, id: e.target.value })}
                    value={details.id}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setDetails({ ...details, password: e.target.value })}
                    value={details.password}
                  />
                </div>
                {error != "&nbsp" ? <div className="error">{error}</div> : ""}
                <input type="submit" value={isjoin ? "회원가입" : "로그인"} />
                <span onClick={onJoin} className="joinToggle">
                  <a>{isjoin ? "로그인" : "회원가입"}</a>
                </span>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default LoginForm;
