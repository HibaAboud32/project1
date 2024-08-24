import React, { useEffect, useState } from "react";
import styles from "./newJobDetails.module.css";
// import { useParams } from "react-router-dom";
// import Loader from "../../../loader/Loader";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCity,
  faClock,
  faEarth,
  faLocation,
  faPhone,
  faRibbon,
  faMoneyBill,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import WorkIcon from "@mui/icons-material/Work";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";

const NewJobDetails = ({ id, isOpen, onClose }) => {
  // const {id} = useParams();

  const [jobDetails, setJobDetails] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URI}api/get_details_offer/${id}`)
      .then((res) => {
        console.log(res);
        setJobDetails(res.data.job_offers);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.job_details_card}>
        <div className={styles.job_details_title}>
          <img
            className={styles.job_details_logo}
            src={`${process.env.REACT_APP_API_URI}${jobDetails.profile_img}`}
            alt=""
          ></img>
          {/* <p>{jobDetails.created_at}</p> */}
        </div>
        <div className={styles.job_details_content}>
          <div className={styles.job_details_item}>
            <div className={styles.job_details_left}>
              <div>
                {/* <FontAwesomeIcon icon={faUser} /> */}
                <AutoAwesomeMotionIcon />
                <p>Job Category</p>
              </div>
              <p>{jobDetails.job_category}</p>
            </div>
            <div className={styles.job_details_right}>
              <div>
                <WorkIcon />
                <p>Job Title</p>
              </div>
              <p>{jobDetails.title_en}</p>
            </div>
          </div>
          <div className={styles.job_details_item}>
            <div className={styles.job_details_left}>
              <div>
                <FontAwesomeIcon icon={faRibbon} />
                <p>Experience </p>
              </div>
              <p>{jobDetails.experience}</p>
            </div>
            <div className={styles.job_details_right}>
              <div>
                <FontAwesomeIcon icon={faClock} />
                <p>Work Hours </p>
              </div>
              <p>{jobDetails.work_hours}</p>
            </div>
          </div>
          <div className={styles.job_details_item}>
            <div className={styles.job_details_left}>
              <div>
                <FontAwesomeIcon icon={faCity} />
                <p>City</p>
              </div>
              <p>{jobDetails.city}</p>
            </div>
            <div className={styles.job_details_right}>
              <div>
                <FontAwesomeIcon icon={faLocation} />
                <p>Location</p>
              </div>
              <p>{jobDetails.location}</p>
            </div>
          </div>
          <div className={styles.job_details_item}>
            <div className={styles.job_details_left}>
              <div>
                <FontAwesomeIcon icon={faPhone} />
                <p>Phone : </p>
              </div>
              <p>{jobDetails.phone}</p>
            </div>
            <div className={styles.job_details_right}>
              <div>
                <FontAwesomeIcon icon={faMoneyBill} />
                <p>Salary</p>
              </div>
              <p>{jobDetails.salary}</p>
            </div>
          </div>
          <div className={styles.job_details_req}>
            <h5>Requirement</h5>
            <p>{jobDetails.requirements_en}</p>
          </div>
          <button className="primary_button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewJobDetails;
