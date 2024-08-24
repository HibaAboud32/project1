import React, { useEffect, useState } from "react";
import styles from "./IntroCompany.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import AdvertiseTwo from "../../advertisetwo/AdvertiseTwo";
import axios from "axios";
// import SearchCompanyInput from "./../searchCompany/search/SearchCompanyInput";
// import SearchEmployeeCompany from "./../searchEmployee/search/SearchEmployeeInput.jsx";
import CounterButton from "../../counterButton/CounterButton";
import ShowJobs from "./showJobs/ShowJobs";
const token = localStorage.getItem("find_me_token");

const IntroCompany = () => {
  const location = useLocation();

  //state to store job
  const [jobOffers, setJobOffers] = useState([]);
  const [btnNumber, setBtnNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState("");
  //state to store advertise
  const [homeAds, setHomeAds] = useState([]);

  //is loading to handle loader to job company
  const [isLoadingJob, setIsLoadingJob] = useState(false);

  const navigate = useNavigate();
  //when this state change the component will rerender => useEffect will work
  // const divRef = useRef(null);

  const handleGoToForm = () => {
    navigate("/formcompany");
  };

  useEffect(() => {
    // setIsLoadingJob(true);
    axios
      .get(
        `${process.env.REACT_APP_API_URI}api/job_offer?counter=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setJobOffers(res.data.data);
        setBtnNumber(res.data.pages_number);
      })
      .catch((error) => console.log(error));
  }, [currentPage]);
  console.log(jobOffers);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URI}api/home_Ads`)
      .then((res) => setHomeAds(res.data.data))
      .catch((error) => console.log(error));
  }, []);

  // useEffect(() => {
  //   const searchParams = new URLSearchParams(location.search);
  //   const page = parseInt(searchParams.get("page"));
  //   if (!isNaN(page) && page > 0) {
  //     setCurrentPage(page);
  //   }
  // });

  return (
    <div style={{ minHeight: "calc(100vh - 135px)" }}>
      <div className={styles.container1}>
        <div style={{ marginBottom: "40px" }}>
          <AdvertiseTwo homeAds={homeAds} width={"100%"} />
        </div>
        <div className={`row justify-content-end ${styles.add_btn}`}>
          <div
            className="col-2"
            style={{ width: "200px", textAlign: "center" }}
          >
            <button
              onClick={handleGoToForm}
              className={styles.add}
              style={{
                border: "none",
                backgroundColor: "#ffffff",
                borderRadius: "50%",
                width: "50px",
                height: "50px",
              }}
            >
              {" "}
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
                Job For You
              </p>
            </div>
          </div>
          <div className="row justify-content-center">
            {/* <SearchCompanyInput /> */}
            {/* <SearchEmployeeCompany /> */}
          </div>
        </div>
      </div>

      <div className={styles.container2}>
        <ShowJobs jobOffers={jobOffers} setJobOffers={setJobOffers} />
        <Outlet />
        <CounterButton
          isLoading={isLoadingJob}
          btnNumber={btnNumber}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default IntroCompany;
