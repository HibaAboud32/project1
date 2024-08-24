import axios from "axios";
import React from "react";
import styles from "./searchFeed.module.css";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import CounterButton from "../../counterButton/CounterButton";

const SearchFeed = () => {
  // const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [resault, setResault] = useState([]);
  const [btnNumber, setBtnNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  //copy seaction content

  const handleNavigate = (id) => {
    navigate(`/profile/${id}`);
  };

  useEffect(() => {
    // const params = new URLSearchParams();

    const city = searchParams.get("city");
    const place = searchParams.get("place");
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    console.log("city", city);
    console.log("place", place);
    console.log("category", category);
    console.log("search", search);

    //fetch data from api
    axios
      .post(
        `${process.env.REACT_APP_API_URI}api/search_market`,
        {
          city: city,
          place: place,
          category: category,
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
  }, [currentPage]);

  return (
    <>
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
      <div className={styles.section}>
        <div className={`container ${styles.section_container}`}>
          {resault.map((element) => (
            <div
              key={element.id}
              className={styles.card}
              style={{ position: "relative", margin: "10px" }}
            >
              <div className={styles.image1}>
                <img
                  src={`https://testfindme.focustradingco.sy${element.image}`}
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
        <CounterButton
          btnNumber={btnNumber}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};

export default SearchFeed;
