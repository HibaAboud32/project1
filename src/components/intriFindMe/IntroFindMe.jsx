import React from "react";
import styles from "./introFindMe.module.css";
import { useNavigate } from "react-router-dom";
import { ContactUs } from "../contactUs/ContactUs";
import GoPremium from "../goPremium/GoPremium";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const IntroFindMe = () => {
  const navigate = useNavigate();

  const handleNavigateLogin = () => {
    navigate("/login");
  };

  const handleGoWork = () => {
    navigate("/jobintroduction");
  };

  const handleGoMarket = () => {
    navigate("/markets?page=1");
  };

  const handleGoServices = () => {
    navigate("/services");
  };

  const handlegoOpenshop = () => {
    navigate("/openshop");
  };

  return (
    <div className={styles.intro_find_me}>
      <div className={styles.headers}>
        <div className={styles.content}>
          <h2>Start Buying And Selling Now</h2>
          <p className={styles.content_text}>
            If you are looking for a place that contains everything you want!??
            You are now in the right place
          </p>
          <p className={styles.content_text}>
            Create your profile and start your success today
          </p>
          <button className={styles.button} onClick={handleNavigateLogin}>
            Get Started
          </button>
        </div>
        <div className={styles.video_container}>
          <video className={styles.video} autoPlay loop muted>
            <source src="/assets/introduction.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* <img src="/assets/find-me-logo.png" alt="Logo" /> */}
        </div>
      </div>
      <div className={styles.gray_section}></div>
      <div className={styles.inside_section}>
        <div className={styles.card_container}>
          <div className={styles.section}>
            <div className={styles.section_image}>
              <img src="/assets/intro/job.jpg" alt="" />
            </div>
            <div className={styles.card_content}>
              <h4>JOB</h4>
              <p> Are you looking for a job?</p>
              <p> You are a company and you want an employee?</p>
              <p> Are you a graduate and are you looking for a job?</p>
              <button
                onClick={handleGoWork}
                style={{ width: "80%", margin: "auto" }}
                className="primary_button"
              >
                JOB
              </button>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.section_image}>
              <img src="/assets/intro/shops.jpg" alt="" />
            </div>
            <div className={styles.card_content}>
              <h4>Markets </h4>
              <p> Do you want to market your products?</p>
              <p> And increase your sales percentage?</p>
              <p> Do you want to sell or buy something?</p>
              <button
                onClick={handleGoMarket}
                style={{ width: "80%", margin: "auto" }}
                className="primary_button"
              >
                Markets{" "}
              </button>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.section_image}>
              <img src="/assets/intro/index.jpg" alt="" />
            </div>
            <div className={styles.card_content}>
              <h4>Index</h4>
              <p>Are you searching for a specific party number?</p>
              <p>Are you looking for a doctor's number?</p>
              <p>Or a lawyer in your area? </p>
              <button
                onClick={handleGoServices}
                style={{ width: "80%", margin: "auto" }}
                className="primary_button"
              >
                Index
              </button>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.section_image}>
              <img src="/assets/intro/markets.jpg" alt="" />
            </div>
            <div className={styles.card_content}>
              <h4>Duty Free </h4>
              <p>Do you want to offer your product for free?</p>
              <p>Do you want free advertising space?</p>
              <p>No strings attached?</p>
              <button
                onClick={handlegoOpenshop}
                style={{ width: "80%", margin: "auto" }}
                className="primary_button"
              >
                Duty Free{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
      <GoPremium />
      <div className={styles.computer_section}>
        <div className={styles.computer_image}>
          <div className={styles.info_contact}>
            <EmailIcon style={{ color: "#008581" }} />
            info@focustradingcompany.com
          </div>
          <div className={styles.info_contact}>
            <PhoneIcon style={{ color: "#008581" }} />
            011 4841
          </div>
          <div className={styles.info_contact}>
            <WhatsAppIcon style={{ color: "#008581" }} />
            +963 989737475
          </div>
          <div className={styles.info_contact}>
            <LocationOnIcon style={{ color: "#008581" }} />
            Damascus , Al-Tajhiz , Al-Fardaws Tower{" "}
          </div>
        </div>
        <div className={styles.computer_content}>
          <ContactUs />
        </div>
      </div>
    </div>
  );
};

export default IntroFindMe;
