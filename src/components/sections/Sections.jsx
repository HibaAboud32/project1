import React, { useCallback } from "react";
// import axios from 'axios';
import styles from "./sections.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import SearchShop from "./search/SearchShop";
import CounterButton from "../counterButton/CounterButton";
// import Footer from '../footer/Footer';

const Sections = ({
  data,
  btnNumber,
  setBtnNumber,
  currentPage,
  setCurrentPage,
  isLoading,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // const [data, setData] = useState([])

  // const [btnNumber, setBtnNumber] = useState(0)
  // const [currentPage, setCurrentPage] = useState(1)

  // const handleNavigate = (id) => {
  //   navigate(`/profile/${id}`)
  // }

  const handleNavigate = useCallback(
    (id) => {
      navigate(`/profile/${id}`);
    },
    [navigate]
  );

  // console.log("section component");

  return (
    <>
      {location.pathname === "/" ? <SearchShop /> : ""}
      <div className={styles.section}>
        <div className={`container ${styles.section_container}`}>
          {!isLoading &&
            data.map((element) => (
              <div
                key={element.id}
                className={styles.card}
                style={{ position: "relative", margin: "10px" }}
              >
                <div className={styles.image1}>
                  <img
                    src={`${process.env.REACT_APP_API_URI}${element.image}`}
                    alt=""
                  />
                </div>
                <div
                  className="col-lg-12 text-center"
                  style={{ paddingTop: "20px" }}
                >
                  <h4 style={{ color: "#5F9B97" }}>{element.name_ar}</h4>
                  <h6 style={{ color: "#5F9B97" }}>{element.name_en}</h6>
                  <p
                    style={{
                      color: "#707070",
                      height: "50px",
                      marginTop: "10px",
                    }}
                  >
                    {element.bio}
                  </p>
                </div>
                <div className="col-lg-12 text-center">
                  <p style={{ color: "#DE9248" }}>{element.city}</p>
                  <p
                    style={{
                      color: "#DE9248",
                      height: "50px",
                      marginTop: "10px",
                    }}
                  >
                    {element.address}
                  </p>
                </div>
                <div className="col-lg-12 text-center">
                  <p style={{ color: "#5F9B97" }}>{element.phone}</p>
                </div>
                <button
                  onClick={() => handleNavigate(element.id)}
                  className="primary_button"
                  style={{
                    width: "100%",
                    borderRadius: "0",
                    borderBottomRightRadius: "30px",
                    borderBottomLeftRadius: "30px",
                  }}
                >
                  Show Details
                </button>
              </div>
            ))}
        </div>
        {location.pathname === `/markets` ? (
          <CounterButton
            isLoading={isLoading}
            btnNumber={btnNumber}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};
export default React.memo(Sections);
