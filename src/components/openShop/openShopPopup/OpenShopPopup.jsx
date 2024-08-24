import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./openShopPopup.module.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const OpenShopPopup = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [productDetails, setProductDetails] = useState([]);

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URI}api/getdetails/${id}`)
      .then((res) => setProductDetails(res.data.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className={styles.popup}>
      <div className={styles.container}>
        <div className={styles.image}>
          <img
            src={`${process.env.REACT_APP_API_URI}${productDetails.image}`}
            alt=""
          />
        </div>
        <div className={styles.content}>
          <div className={styles.title}>
            <h3>{productDetails.name_en}</h3>
            <h3>{productDetails.name_ar}</h3>
          </div>
          <p className={styles.description}>{productDetails.description_en}</p>
          <div className={styles.info}>
            <div className={styles.price}>
              <h4>Current Price</h4>
              <p>{productDetails.current_price}</p>
            </div>
            <div className={styles.location}>
              <h4>Location</h4>
              <p>{productDetails.location}</p>
            </div>
            <div className={styles.phone}>
              <h4>Phone</h4>
              <p>{productDetails.phone}</p>
            </div>
          </div>
          <button className="primary_button" onClick={handleBack}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpenShopPopup;
