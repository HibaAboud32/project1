import React, { useEffect, useState } from "react";
import styles from "./searchServicesInput.module.css";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const SearchServicesInput = () => {
  // const location = useLocation();
  const navigate = useNavigate();
  // const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();

  //state to show and hide filter content

  // const [showFilter, setShowFilter] = useState(false)

  const [search, setSearch] = useState("");
  //state to store city
  const [city, setCity] = useState([]);
  // state to store city selected
  const [citySelect, setCitySelect] = useState("");
  //state to store place
  const [place, setPlace] = useState([]);
  // state to store place selected
  const [placeSelect, setPlaceSelect] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.append("city", citySelect);
    params.append("place", placeSelect);
    params.append("search", search);
    navigate(`/searchservices/${id}?${params.toString()}`);
  };

  //useEffect to fetch city
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URI}api/cities`)
      .then((res) => {
        setCity(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //use effect to fetch places
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_API_URI}api/places`, {
        city: citySelect,
      })
      .then((res) => {
        setPlace(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [citySelect]);

  return (
    <div style={{ paddingBottom: "30px" }}>
      <div className="container">
        <div className={styles.search}>
          <div className={styles.search_content}>
            <input
              className={styles.search_input}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search All Resources"
            />
            <div className={`${styles.filter_content}`}>
              <div className={styles.filter_select}>
                <div className={styles.filter_section}>
                  {/* <label>City</label> */}
                  <select
                    onChange={(e) => setCitySelect(e.target.value)}
                    name="Place"
                    id=""
                  >
                    {city.map((element, index) => (
                      <option key={index} value={element}>
                        {element}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={styles.filter_select}>
                <div className={styles.filter_section}>
                  {/* <label>Place</label> */}
                  <select
                    onChange={(e) => setPlaceSelect(e.target.value)}
                    name="place"
                    id=""
                  >
                    {place.map((element, index) => (
                      <option key={index} value={element}>
                        {element}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.filter_btn} onClick={handleSearch}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchServicesInput;
