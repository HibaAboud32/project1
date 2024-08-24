import React, { useEffect, useState } from "react";
import styles from "./subServices.module.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const SubServices = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [SubServices, setSubServices] = useState([]);

  const handleSubServices = (id, index) => {
    if (SubServices[index].sub) {
      navigate(`/services/SubServices/${id}`);
    } else {
      navigate(`/services/MainServices/${id}`);
    }
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URI}api/services_sub/${id}`)
      .then((res) => {
        setSubServices(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div className={styles.services}>
      <h2 className={styles.title}>Index</h2>
      <div className={styles.services_container}>
        <div className={`${styles.services_container} container`}>
          {SubServices.map((element, index) => (
            <div key={element.id} className={styles.service}>
              <div className={styles.image}>
                <img
                  src={`${process.env.REACT_APP_API_URI}${element.image}`}
                  alt={element.name_en}
                />
              </div>
              <div className={styles.content}>
                <p>{element.name_en}</p>
                <p>{element.name_ar}</p>
              </div>
              <button
                className="primary_button"
                style={{ marginTop: "30px" }}
                onClick={() => handleSubServices(element.id, index)}
              >
                Show Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubServices;
