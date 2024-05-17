import Card from "react-bootstrap/Card";
import React, { useState } from "react";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { getVehicleListUrl, registerRequestUrl } from "./URLs";
import axios from "axios";
import ModalComponent from "./modalShow";
function CreatingCard({
  userToken,
  settingUserId,
  userId,
  x,
  y,
  settingRequestNumber,
  requestNumber,
  modalShow,
  settingModalShow,
}) {
  /////////////////
  ////state for search term
  const [searchTerm, setSearchTerm] = useState("");

  ///////////
  ///on search click handle function
  const onSearchClick = async () => {
    await axios
      .get(getVehicleListUrl, {
        params: {
          SearchTerm: searchTerm,
          UserToken: userToken,
        },
      })
      .then((response) => {
        // handle success
        console.log(
          response.data,
          "as it shows in response.data.data there is no any car id and it is empty sent form server"
        );
        //////due to not responding of server for getting user id I decided to set it to zero and continue the process
        settingUserId(0);
      })
      .catch((error) => {
        // handle error
        console.log(error);
        settingUserId(100);
      });
  };

  //////////////
  /// making request for on register click
  const onRegisterClick = async () => {
    await axios
      .post(registerRequestUrl, {
        UserToken: userToken,
        VehicleUserTypeId: userId,
        Source: `${(x.lat, x.lng)}`,
        Destination: `${(y.lat, y.lng)}`,
      })
      .then(function (response) {
        settingRequestNumber(response.data.data.requestNo);
        console.log(response.data.data.requestNo);
        settingModalShow(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  ///////////////
  ///making text info and error for clicking on search button

  let searchInfoText;
  if (userId !== 0) {
    searchInfoText = (
      <p className="text-center text-danger" style={{ display: "block" }}>
        جستجو باید حداقل شامل ۲ حرف باشد
      </p>
    );
  } else if (userId === 0) {
    searchInfoText = (
      <p className="text-center text-danger" style={{ display: "block" }}>
        ماشین آلات مورد نظر دریافت شد.
        <br /> جهت ثبت نهایی بروی ثبت درخواست کلیک کنید.
      </p>
    );
  }

  //////////////////
  ////making register button for different situation
  let registerButton;
  if (!x && !y && userId !== 0) {
    registerButton = (
      <button
        className="btn btn-secondary mt-3  btn-block disabled"
        id="registerButton"
        disabled
      >
        ثبت درخواست
      </button>
    );
  } else if (x && y && userId === 0) {
    registerButton = (
      <button
        className="btn btn-warning mt-3 btn-block "
        id="registerButton"
        onClick={onRegisterClick}
      >
        ثبت درخواست
      </button>
    );
  } else if (x && !y && userId !== 0) {
    registerButton = (
      <button
        className="btn btn-secondary mt-3  btn-block disabled"
        id="registerButton"
        disabled
      >
        ثبت درخواست
      </button>
    );
  } else if (!x && y && userId !== 0) {
    registerButton = (
      <button
        className="btn btn-secondary mt-3  btn-block disabled"
        id="registerButton"
        disabled
      >
        ثبت درخواست
      </button>
    );
  } else if (x && y && userId !== 0) {
    registerButton = (
      <button
        className="btn btn-secondary mt-3  btn-block disabled"
        id="registerButton"
        disabled
      >
        ثبت درخواست
      </button>
    );
  } else if (!x && !y && userId === 0) {
    registerButton = (
      <button
        className="btn btn-secondary mt-3  btn-block disabled"
        id="registerButton"
        disabled
      >
        ثبت درخواست
      </button>
    );
  } else if (x && !y && userId === 0) {
    registerButton = (
      <button
        className="btn btn-secondary mt-3  btn-block disabled"
        id="registerButton"
        disabled
      >
        ثبت درخواست
      </button>
    );
  }

  ///////////////
  //making JSX for component

  let cardContent;
  if (modalShow) {
    return (cardContent = (
      <ModalComponent show={modalShow} onHide={() => settingModalShow(false)} requestNumber={requestNumber}/>
    ));
  } else {
    cardContent = (
      <Card
        className="cardSummary  shadow-lg text-bg-light 
      "
      >
        <Card.Body className="d-flex flex-column justify-content-start directionRtl">
          <div className="d-flex  p-3 border ">
            <FaMapMarkerAlt
              className=" "
              style={{ color: "red", fontSize: "25px" }}
            />
            <Card.Subtitle className="pt-2 text-danger mx-2 " id="initial">
              مبدا را انتخاب کنید
            </Card.Subtitle>
          </div>

          <div className="d-flex   p-3 border">
            <FaMapMarkerAlt
              className=" "
              style={{ color: "green", fontSize: "25px" }}
            />
            <Card.Subtitle className="pt-2 text-success mx-2" id="destination">
              مقصد را انتخاب کنید
            </Card.Subtitle>
          </div>

          <div className="input-group mb-3 mt-2 ">
            <input
              type="text"
              className="form-control rounded"
              placeholder="نوع ماشین آلات"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            <div className="input-group-append">
              <button
                className="searchButton btn "
                type="button"
                onClick={onSearchClick}
              >
                <FaSearch />
              </button>
            </div>
          </div>
          {searchInfoText}
          {registerButton}
        </Card.Body>
      </Card>
    );
  }

  return <>{cardContent}</>;
}
export default CreatingCard;
