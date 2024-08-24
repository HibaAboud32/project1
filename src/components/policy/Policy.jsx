import React, { useState } from "react";
import styles from "./policy.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const Policy = () => {
  const navigate = useNavigate();

  const [showPolicy, setShowPolicy] = useState(true);

  const handleShowDetails = () => {
    navigate("/policy");
    setShowPolicy(!showPolicy);
  };

  const handleAcceptCookies = () => {
    sessionStorage.setItem("accept_cookies", true);
    setShowPolicy(!showPolicy);
  };

  return (
    <>
      <div
        className={`${
          showPolicy
            ? styles.show_policy
            : `${styles.hide_policy} ${styles.show_policy}`
        }`}
      >
        <div className={styles.policy_container}>
          <div className={styles.left}>
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className={styles.icon}
            />
            <p>
              This site uses cookies to offer you a better browsing experience.
              Find out more on
              <Link to="policy">How we use cookies</Link>
            </p>
          </div>
          <div className={styles.right}>
            <button className={styles.policy_btn} onClick={handleShowDetails}>
              Show Details
            </button>
            <button className={styles.policy_btn} onClick={handleAcceptCookies}>
              Accept All cookies
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Policy;
