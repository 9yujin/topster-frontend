import React, { useState } from "react";

const LoginForm = ({ Login, Join, error, setError }) => {
  const [details, setDetails] = useState({ name: "", email: "", password: "" });
  const [isjoin, setIsjoin] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!isjoin) {
      Login(details);
    } else {
      Join(details);
    }
  };

  const onJoin = () => {
    setIsjoin((prev) => !prev);
    setError("&nbsp");
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
                  <label htmlFor="email">Email:</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    onChange={(e) => setDetails({ ...details, email: e.target.value })}
                    value={details.email}
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
