import React, { useState } from "react";
import axios from "axios";
import { PostUrl } from "./URLs";
import Form from "react-bootstrap/Form";

const LoginForm = ({
  settingUserToken,
  settingLoginStatus,
  settingName,
  name,
  userToken,
}) => {
  ///////////
  //defining states for login form
  const [passwordTerm, setPasswordTerm] = useState("cda9fd");
  const [loginError, setLoginError] = useState(false);


  //////////
  ///making login request function
  const LoginRequest = async (userName, password) => {
    await axios
      .post(PostUrl, {
        username: userName,
        password: password,
      })
      .then((response) => {
        settingUserToken(response.data.data.userToken);
        settingLoginStatus(true);
        const body = document.querySelector("body");
        const mapElement = document.createElement("div");
        mapElement.setAttribute("id", "map");
        body.appendChild(mapElement);
        setLoginError(false);
      })
      .catch((err) => {
        console.log(err);
        settingLoginStatus(false);
        setLoginError(true);
      });
  };

  //////////
  ////making on enter click handle 
  const onEnterClickHandle = (e) => {
    e.preventDefault();
    LoginRequest(name, passwordTerm);
  };


  ///////////////////
  ////making appropriate JSX for login page
  let errorContent;
  if (loginError) {
    errorContent = (
      <h5 className="text-danger text-center">
        نام کاربری یا رمز عبور اشتباه است
      </h5>
    );
  }
////////////
////JSX
  return (
    <div className="container d-flex justify-content-center  mt-5 mb-3 loginFormContainer ">
      <div className="border px-5 larger shadow roundingTheInputBox inputBox">
        <Form onSubmit={onEnterClickHandle}>
          <Form.Group className="mb-3 ">
            <h2 className="text-center">ورود</h2>
            <Form.Label className="text-muted">نام کاربری</Form.Label>
            <Form.Control
              onChange={(e) => {
                settingName(e.target.value);
              }}
              value={name}
              className="text-muted roundingTheInput directionLtr"
              type="text"
              // placeholder="نام کاربری خود را وارد کنید"
              autoComplete="off"
            />
          </Form.Group>

          <Form.Group className="mb-3 " controlId="formBasicPassword">
            <Form.Label className="text-muted">کلمه عبور</Form.Label>
            <Form.Control
              onChange={(e) => {
                setPasswordTerm(e.target.value);
              }}
              value={passwordTerm}
              className="roundingTheInput directionLtr"
              type="password"
              // placeholder="کلمه عبور خود را وارد کنید"
              autoComplete="off"
            />
          </Form.Group>
          {errorContent}
          <div className="d-grid gap-2">
            <button
              onClick={onEnterClickHandle}
              className="btn btn-warning mb-4 roundingTheInput"
              type="submit"
            >
              ورود
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default LoginForm;
