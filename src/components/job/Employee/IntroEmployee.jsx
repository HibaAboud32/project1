import React, { useEffect, useState } from "react";
import styles from "./IntroEmployee.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import AdvertiseTwo from "../../advertisetwo/AdvertiseTwo";
// import SearchEmployeeCompany from "./../searchEmployee/search/SearchEmployeeInput.jsx";
import CounterButton from "../../counterButton/CounterButton";
import EmployeeJobs from "./employeeJobs/EmployeeJobs";

const token = localStorage.getItem("find_me_token");

function IntroEmployee() {
  const location = useLocation();

  const navigate = useNavigate();
  // const divRef = useRef(null)

  const [homeAds, setHomeAds] = useState([]);

  //handle button load more and less
  const [jobSeekers, setJobSeekers] = useState([]);
  const [btnNumber, setBtnNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState("");

  // const handleGoCompany = () => {
  //     navigate("/job")
  // }

  const handleGoToForm = () => {
    navigate("/formemployee");
  };

  //is loading to handle loader to job company
  const [isLoadingEmployee, setIsLoadingEmployee] = useState(false);

  useEffect(() => {
    // setIsLoadingEmployee(true);
    axios
      .get(
        `${process.env.REACT_APP_API_URI}api/job_seekers?counter=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setJobSeekers(res.data.data);
        setBtnNumber(res.data.pages_number);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage]);
  console.log(jobSeekers);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URI}api/home_Ads`)
      .then((res) => {
        setHomeAds(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // useEffect(() => {
  //   const searchParams = new URLSearchParams(location.search);
  //   const page = parseInt(searchParams.get("page"));
  //   if (!isNaN(page) && page > 0) {
  //     setCurrentPage(page);
  //   }
  // }, [location.search]);

  return (
    <div style={{ minHeight: "calc(100vh - 135px)" }}>
      <div className={styles.container1}>
        <div style={{ marginBottom: "20px" }}>
          <AdvertiseTwo homeAds={homeAds} width={"100%"} />
        </div>
        <div className={`row justify-content-end ${styles.add_btn}`}>
          <div
            className="col-2"
            style={{ width: "200px", textAlign: "center", marginTop: "20px" }}
          >
            <button
              className={styles.add}
              style={{
                border: "none",
                backgroundColor: "#ffffff",
                borderRadius: "50%",
                width: "50px",
                height: "50px",
              }}
              onClick={handleGoToForm}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <p style={{ fontWeight: "bold", margin: "auto" }}>Add Your Job</p>
          </div>
        </div>
        <div className="row">
          <div
            className="row justify-content-center"
            style={{ paddingTop: "20px" }}
          >
            <div className="col-lg-12 text-center">
              <p
                style={{ color: "#fff", fontSize: "30px", fontWeight: "bold" }}
              >
                I Need A Job
              </p>
            </div>
          </div>
          <div
            className="row justify-content-center"
            style={{ paddingTop: "20px" }}
          >
            <div className="row justify-content-center">
              {/* <SearchEmployeeCompany /> */}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.container2}>
        <EmployeeJobs jobSeekers={jobSeekers} setJobSeekers={setJobSeekers} />
        <Outlet />
        <CounterButton
          isLoading={isLoadingEmployee}
          btnNumber={btnNumber}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}
export default IntroEmployee;
