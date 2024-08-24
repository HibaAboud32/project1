import React from "react";
import styles from "./addYourAdvertise.module.css";
import { useNavigate } from "react-router-dom";
const AddYourAdvertise = () => {
  const navigate = useNavigate();

  const handleGoToShop = () => {
    navigate("/shopcontact");
  };

  return (
    <>
      <div
        className={styles.add_your_advertise}
        style={{ minHeight: "calc(100vh - 135px)" }}
      >
        <div className={styles.add_your_advertise_container}>
          <img src="/assets/find-me-logo.png" alt="Logo" />
          <h3> welcome </h3>
          <button onClick={handleGoToShop} className={styles.btn}>
            {" "}
            Publish in Markets{" "}
          </button>
          <button onClick={handleGoToShop} className={styles.btn}>
            {" "}
            Publish in Duty Free{" "}
          </button>
          <button onClick={handleGoToShop} className={styles.btn}>
            {" "}
            Publish in Index{" "}
          </button>
          <button onClick={handleGoToShop} className={styles.btn}>
            {" "}
            Publish in Job{""}
          </button>
        </div>
      </div>
    </>
  );
};

export default AddYourAdvertise;
