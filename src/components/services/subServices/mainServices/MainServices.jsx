import React, { useEffect, useState } from "react";
import styles from "./maunServices.module.css";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import CounterButton from "../../../counterButton/CounterButton";

const SubServices = () => {
  const location = useLocation();
  const { id } = useParams();
  const searchResults = location.state?.searchResults || [];
  const [subServices, setSubServices] = useState([]);
  const [isThereSub, setIsThereSub] = useState(false);
  const [btnNumber, setBtnNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (searchResults.length === 0) {
      // Fetch sub-services only if there are no search results
      axios
        .get(
          `${process.env.REACT_APP_API_URI}api/services_sub/${id}?counter=${currentPage}`
        )
        .then((res) => {
          setSubServices(res.data.data);
          setBtnNumber(res.data.pages_number);
          setIsThereSub(res.data.sub);
        })
        .catch((error) => console.log(error));
    }
  }, [id, currentPage, searchResults.length]);

  const servicesToDisplay =
    searchResults.length > 0 ? searchResults : subServices;

  return (
    <div
      className={styles.sub_services}
      style={{ minHeight: "calc(100vh - 135px)" }}
    >
      <div className={`${styles.sub_services_container} container`}>
        {servicesToDisplay.map((element) => (
          <div key={element.id} className={styles.sub_element}>
            <img
              src={`${process.env.REACT_APP_API_URI}${element.image}`}
              alt=""
            />
            <div className={styles.content}>
              <div>
                <p>{element.name_ar}</p>
                <h4>الاسم</h4>
              </div>
              <div>
                <p>{element.phone}</p>
                <h4>الهاتف</h4>
              </div>
              <div>
                <p>{element.location}</p>
                <h4>الموقع</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
      {searchResults.length === 0 && (
        <CounterButton
          btnNumber={btnNumber}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default SubServices;
