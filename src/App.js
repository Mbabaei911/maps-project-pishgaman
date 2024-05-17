import React, { useState } from "react";
import "./app.css";
import Header from "./header";
import CreateMap from "./createMap";
import CreatingCard from "./card";
import LoginForm from "./LoginForm";

const App = () => {
  ///////////
  ///defining states
  const [LoginStatus, setLoginStatus] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [name, setName] = useState("turboslayer");
  const [userId, setUserId] = useState(null);
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);
  const [requestNumber, setRequestNumber] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  
  ///////////////
  ////making function for updating states
  const settingUserToken = (x) => {
    setUserToken(x);
  };
  const settingLoginStatus = (x) => {
    setLoginStatus(x);
  };

  const settingName = (x) => {
    setName(x);
  };
  const settingUserId = (x) => {
    setUserId(x);
  };
  const settingRequestNumber = (x) => {
    setRequestNumber(x);
  };
  const settingModalShow = (x) => {
    setModalShow(x);
  };

////////////
////making function for updating lat , lng source as X
  const settingX = (x) => {
    setX(x);
  };
  ////////////
////making function for updating lat , lng destination as y
  const settingY = (x) => {
    setY(x);
  };
 

  ///////////
  ///JSX to show appropriate content
  let content;
  if (LoginStatus) {
    return (
      <div>
        <Header
          userToken={userToken}
          settingLoginStatus={settingLoginStatus}
          settingUserToken={settingUserToken}
          name={name}
          settingY={settingY}
          settingX={settingX}
          settingUserId={settingUserId}
        />
        <CreateMap settingX={settingX} settingY={settingY} />
        <CreatingCard
          userToken={userToken}
          settingUserId={settingUserId}
          userId={userId}
          x={x}
          y={y}
          settingRequestNumber={settingRequestNumber}
          requestNumber={requestNumber}
          settingModalShow={settingModalShow}
          modalShow={modalShow}
        />
      </div>
    );
  } else if (LoginStatus === false) {
    return (
      <LoginForm
        settingUserToken={settingUserToken}
        settingLoginStatus={settingLoginStatus}
        settingName={settingName}
        name={name}
        userToken={userToken}
      />
    );
  }
  return <>{content}</>;
};
export default App;
