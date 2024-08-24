import React, { useEffect, useState } from "react";
import styles from "./seekersDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCity,
  faEarth,
  faFilePdf,
  faLocation,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import WorkIcon from "@mui/icons-material/Work";

const SeekersDetails = ({ id, onClose, isOpen }) => {
  const downloadCV = async (cvUrl) => {
    try {
      const response = await fetch(cvUrl);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "jobSeekerCV.pdf"; // or extract the filename from headers or a state variable
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Download CV failed:", error);
    }
  };
  // const { id } = useParams();

  const [jobSeekersDetails, setJobSeekersDetails] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URI}api/job_seekers/${id}`)
      .then((res) => {
        console.log(res);
        setJobSeekersDetails(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  console.log(jobSeekersDetails);
  if (!isOpen) return null;
  return (
    <>
      {" "}
      {jobSeekersDetails && (
        <div className={styles.modal}>
          <div
            className={styles.job_details_card}
            style={{ marginBottom: "20px" }}
          >
            <div className={styles.job_details_title}>
              <img
                className={styles.job_details_logo}
                src={`${process.env.REACT_APP_API_URI}${jobSeekersDetails.profile_img}`}
                alt=""
              ></img>
              {/* <p>4 Days Ago</p> */}
            </div>
            <div className={styles.job_details_content}>
              <div className={styles.job_details_item}>
                <div className={styles.job_details_left}>
                  <div>
                    <FontAwesomeIcon icon={faUser} />
                    <p>Full Name : </p>
                  </div>
                  <p>{jobSeekersDetails.user_name}</p>
                </div>
                <div className={styles.job_details_right}>
                  <div>
                    <WorkIcon />
                    <p>Job Title</p>
                  </div>
                  <p>{jobSeekersDetails.title_en}</p>
                </div>
              </div>
              <div className={styles.job_details_item}>
                <div className={styles.job_details_left}>
                  <div>
                    <FontAwesomeIcon icon={faCity} />
                    <p>City : </p>
                  </div>
                  <p>{jobSeekersDetails.city.name_en}</p>
                </div>
                <div className={styles.job_details_right}>
                  <div>
                    <FontAwesomeIcon icon={faLocation} />
                    <p>Location</p>
                  </div>
                  <p>{jobSeekersDetails.location_en}</p>
                </div>
              </div>
              <div className={styles.job_details_item}>
                <div className={styles.job_details_left}>
                  <div>
                    <FontAwesomeIcon icon={faPhone} />
                    <p>Phone : </p>
                  </div>
                  <p>{jobSeekersDetails.phone}</p>
                </div>
                <div className={styles.job_details_left}>
                  <div>
                    <WorkIcon />
                    <p>skills : </p>
                  </div>
                  <p>
                    {Array.from(new Set(jobSeekersDetails.skills)).join("   ")}
                  </p>
                </div>

                <div className={styles.job_details_right}>
                  <div>
                    <InstagramIcon />
                    <a
                      className={styles.pdf}
                      target="_blank"
                      rel="noreferrer"
                      href={`${process.env.REACT_APP_API_URI}${jobSeekersDetails.social_media_links.instagram}`}
                      download="cv"
                    >
                      instagram
                    </a>
                  </div>
                  <div>
                    <FacebookIcon />
                    <a
                      className={styles.pdf}
                      target="_blank"
                      rel="noreferrer"
                      href={`${process.env.REACT_APP_API_URI}${jobSeekersDetails.social_media_links.facebook}`}
                      download="cv"
                    >
                      facebook
                    </a>
                  </div>
                  <div>
                    <GitHubIcon />
                    <a
                      className={styles.pdf}
                      target="_blank"
                      rel="noreferrer"
                      href={`${process.env.REACT_APP_API_URI}${jobSeekersDetails.social_media_links.github}`}
                      download="cv"
                    >
                      github
                    </a>
                  </div>
                </div>

                <div className={styles.job_details_right}>
                  <div>
                    <FontAwesomeIcon icon={faFilePdf} />
                    <a
                      className={styles.pdf}
                      target="_blank"
                      rel="noreferrer"
                      href={`${process.env.REACT_APP_API_URI}${jobSeekersDetails.cv}`}
                      download="cv"
                      //                       onClick={(e) => {
                      //   e.preventDefault(); // Prevent default anchor behavior
                      //   const cvUrl = `${process.env.REACT_APP_API_URI}${jobSeekersDetails.cv}`;
                      //   downloadCV(cvUrl);
                      // }}
                    >
                      Download CV
                    </a>
                  </div>
                </div>
              </div>
              <div className={styles.job_details_req}>
                <h5>Bio</h5>
                <p>{jobSeekersDetails.description_en}</p>
              </div>
            </div>
            <button className="primary_button" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SeekersDetails;
