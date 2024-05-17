import React from "react";
const Header = ({
  userToken,
  settingLoginStatus,
  settingUserToken,
  name,
  settingY,
  settingX,
  settingUserId
}) => {

  /////////////
  ///handling exit button function 
  const exitButtonClickHandle = () => {
    const mapElement = document.getElementById("map");
    mapElement.remove();
    settingLoginStatus(false);
    settingUserToken(null);
    settingY(null);
    settingX(null);
    settingUserId(null)
  };



  ////////////
  ///making JSX
  return (
    <div className="p-0 d-flex justify-content-between align-items-center">
      <h4 className="p-2 text-muted" id="name">
        {name} خوش آمدید.
      </h4>
      <h4 className="p-2 text-muted"> کد اعتبار شما:{userToken}</h4>

      <button
        type="button"
        className="btn btn-danger m-2 px-4"
        onClick={exitButtonClickHandle}
      >
        خروج
      </button>
    </div>
  );
};
export default Header;
