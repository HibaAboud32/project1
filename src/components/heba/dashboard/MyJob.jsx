import React from "react";
import styles from "./Dashboard.module.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import EmployeeJobs from "../../job/Employee/employeeJobs/EmployeeJobs";
import { Link, Outlet, useLocation } from "react-router-dom";
import Loader from "../../loader/Loader";
import IntroCompany from "../../job/company/IntroCompany";
import ShowJobs from "../../job/company/showJobs/ShowJobs";
import { useParams } from "react-router-dom";

const token = localStorage.getItem("find_me_token");

const MyJob = () => {
  const { id } = useParams();

  const location = useLocation();
  console.log(location.pathname);

  const [employeeJob, setEmployeeJob] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [jobOffers, setJobOffers] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URI}api/user_job_seekers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setEmployeeJob(
          res.data.job_seekers.map((obj) => ({
            ...obj,
            menuList: false,
          }))
        );
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  // useEffect(() => {
  //     setIsLoading(true)
  //     axios.get(`${process.env.REACT_APP_API_URI}api/get_user_offers`,
  //     {
  //         headers : {
  //             Authorization : `Bearer ${token}`
  //         }
  //     })
  //     .then(res => {
  //         setIsLoading(false)
  //         console.log(res.data)
  //         setJobOffers(res.data.job_offers.map(obj => ({
  //             ...obj, menuList : false
  //         })))
  //     })
  //     .catch(error => {
  //         console.log(error)
  //         setIsLoading(false)
  //     })
  //     console.log("hi")
  // }, [])

  return (
    <div>
      {isLoading && <Loader />}
      <div style={{ minHeight: "calc(100vh - 100px)" }}>
        <h3
          style={{
            color: "#fff",
            fontSize: "26px",
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          Your Job Seekers
        </h3>
        {employeeJob.length === 0 ? (
          <div className={styles.no_favorite_product}>
            <Link to="/formemployee">
              You Have No Job Seekers Start Adding Some
            </Link>
          </div>
        ) : (
          <>
            <EmployeeJobs
              jobSeekers={employeeJob}
              setEmployeeJob={setEmployeeJob}
            />
            {location.pathname === `/myjob/seekersdetails/${id}` ? (
              <Outlet />
            ) : (
              ""
            )}
          </>
        )}
        <hr />
        <h3
          style={{
            color: "#fff",
            fontSize: "26px",
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          Your Job Offers
        </h3>
        {jobOffers.length === 0 ? (
          <div className={styles.no_favorite_product}>
            <Link to="/formcompany">
              You Have No Job Offers Start Adding Some
            </Link>
          </div>
        ) : (
          <>
            <ShowJobs jobOffers={jobOffers} setJobOffers={setJobOffers} />
            {location.pathname === `/myjob/jobdetails/${id}` ? <Outlet /> : ""}
          </>
        )}

        {/* <h3 style={{color: "#fff", fontSize : "26px", textAlign : "center", marginTop : "30px"}}>Your Job Offers</h3>
            {
                jobOffers.length === 0 ? 
            <div className={styles.no_favorite_product}>
                <Link to="/formcompany">You Have No Job Offers Start Adding Some</Link>
            </div>
            :
            ""
            }
            {
                location.pathname === `/myjob/jobdetails/${id}` ? 
                <Outlet />
                : 
                <>
            <ShowJobs jobOffers = {jobOffers} setJobOffers = {setJobOffers} />
                {
            location.pathname === `/myjob/jobdetails/${id}` ? 
                <Outlet />
            : 
            ""
        }
            </>
            } */}
      </div>
    </div>
  );
};

export default MyJob;
