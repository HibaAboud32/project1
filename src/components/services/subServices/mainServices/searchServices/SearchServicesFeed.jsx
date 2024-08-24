import axios from "axios";
import React from "react";
import styles from "./searchServicesFeed.module.css";
import { useState, useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
// import { useRef } from 'react';
import CounterButton from "../../../../counterButton/CounterButton";

const SearchCompanyFeed = () => {
  // const location = useLocation();
  const [searchParams] = useSearchParams();
  // const navigate = useNavigate();
  const { id } = useParams();

  const [resault, setResault] = useState([]);
  const [btnNumber, setBtnNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  // const divRef = useRef(null)

  useEffect(() => {
    // const params = new URLSearchParams();

    const city = searchParams.get("city");
    const place = searchParams.get("place");
    const search = searchParams.get("search");
    console.log("city", city);
    console.log("place", place);
    console.log("search", search);

    //fetch data from api
    axios
      .post(
        `${process.env.REACT_APP_API_URI}api/search/searchservices/${id}`,
        {
          city: city,
          place: place,
          text: search,
          counter: currentPage,
        },
        {}
      )
      .then((res) => {
        console.log(res.data.data);
        setResault(res.data.data);
        setBtnNumber(res.data.pages_number);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchParams,id,currentPage]);

  return (
    <div className={styles.sub_services}>
      <h3
        style={{
          color: "#F70000",
          marginTop: "30px",
          textAlign: "center",
          fontSize: "32px",
        }}
      >
        {resault.length === 0
          ? "There Is No Resault Matches"
          : "Search Resault"}
      </h3>
      <div className={`${styles.sub_services_container} container`}>
        {resault.map((element) => (
          <div key={element.id} className={styles.sub_element}>
            <img
              src={`${process.env.REACT_APP_API_URI}${element.image}`}
              alt=""
            />
            <div className={styles.content}>
              <div>
                <p>{element.name_ar}</p>
                <h4>:الاسم</h4>
              </div>
              <div>
                <p>{element.phone}</p>
                <h4>:الهاتف</h4>
              </div>
              <div>
                <p>{element.location}</p>
                <h4>:الموقع</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
      <CounterButton
        btnNumber={btnNumber}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default SearchCompanyFeed;
