import React from "react";
import stylejob from "./JobIntroduction.module.css";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
import img1 from "../images/company.png";
import img2 from "../images/employee.png";
import { useNavigate } from "react-router-dom";

const JobIntroduction = () => {
  const navigate = useNavigate();
  const GoToCompany = () => {
    navigate("/compny?pages_number=1");
  };

  const GoToEmployee = () => {
    navigate("/introemployee?pages_number=1");
  };
  return (
    <div
      className={stylejob.container1}
      style={{ minHeight: "calc(100vh - 135px)" }}
    >
      <div className={stylejob.title}>
        <h2>Jobs</h2>
      </div>
      <div className={stylejob.container2}>
        <div className="row d-flex justify-content-center">
          <div className="col-lg-6 col-md-12 col-sm-12 ">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img className={stylejob.image} src={img1} alt=""></img>
            </div>
            <div className={stylejob.button}>
              <button onClick={GoToCompany}>Job For You</button>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 ">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img className={stylejob.image} src={img2} alt=""></img>
            </div>
            <div className={stylejob.button}>
              <button onClick={GoToEmployee}>I Need A Job</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default JobIntroduction;
