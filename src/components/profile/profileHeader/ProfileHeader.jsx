import React from "react";
import styles from "./profileHeader.module.css";
// import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
// import ShowMap from "./showMap/ShowMap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";
// import { useParams } from "react-router-dom";
import CallIcon from "@mui/icons-material/Call";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LocationOnIcon from "@mui/icons-material/LocationOn";

// const token = localStorage.getItem("find_me_token");

const ProfileHeader = ({ profileInfo, setProfileInfo }) => {
  return (
    <>
      {profileInfo && (
        <>
          <div className={styles.background}>
            <img
              src={`${process.env.REACT_APP_API_URI}${profileInfo.second_image}`}
              alt="Cover"
            />
          </div>
          <div className={styles.content}>
            <div className={styles.conetnt_left}>
              <img
                src={`${process.env.REACT_APP_API_URI}${profileInfo.image}`}
                alt=""
              />
              <div className={styles.image_info}>
                <h4>{profileInfo.name_ar}</h4>
                <div>
                  <button className="primary_button" style={{ margin: "5px" }}>
                    {/* {profileInfo.favorite ? (
                    <FontAwesomeIcon
                      icon={faHeart}
                      style={{ marginRight: "10px", color: "red" }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faHeart_2}
                      style={{ marginRight: "10px", color: "red" }}
                    />
                  )} */}
                    <span className={styles.favorite_number}>
                      <FontAwesomeIcon
                        icon={faHeart}
                        style={{
                          padding: "2px",
                          color: "var(--main-text-color)",
                        }}
                      />
                      {profileInfo.favorite_count}
                    </span>
                  </button>

                  <button className="primary_button" style={{ margin: "5px" }}>
                    <FontAwesomeIcon
                      icon={faBagShopping}
                      style={{
                        padding: "2px",
                        color: "var(--main-text-color)",
                      }}
                    />
                    <span className={styles.favorite_number}>
                      {profileInfo.products_count}
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.content_center}>
              <p>
                <CallIcon />
                {profileInfo.phone}
              </p>
              <p>
                <LocationCityIcon />
                {profileInfo.city}
              </p>
              <p>
                <LocationOnIcon />
                {profileInfo.address}
              </p>
            </div>
            <div className={styles.content_right}>
              <div className={styles.about}>
                <h4>Bio</h4>
                <p>{profileInfo.bio}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProfileHeader;
