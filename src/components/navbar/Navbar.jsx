import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import "./navbar.css";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
import Notification from "./notification/Notification";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const token = localStorage.getItem("find_me_token");

function Navbar() {
  const navigate = useNavigate();

  // useRef for handle open and close all menu
  const menuRef = useRef(null);
  const personalRef = useRef(null);
  const notificationRef = useRef(null);

  //state to loading spinner
  const [isLoading, setIsLoading] = useState(false);

  // state to store notification
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState([]);

  //state to store personal informaion
  const [personalData, setPersonalData] = useState({});
  const [showPersonalData, setShowPersonalData] = useState(false);
  //state to toggle responcive list
  const [showList, setShowList] = useState(false);

  //function to handle logout
  const handleLogout = () => {
    setIsLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API_URI}api/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setIsLoading(false);
        localStorage.removeItem("find_me_token");
        localStorage.removeItem("userId");
        navigate("/");
        window.location.reload(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  //handle navigate
  const handleClick = () => {
    navigate("/addyouradvertise");
  };
  const handleGoProfile = () => {
    navigate("/introdashboard");
  };

  const handleGoMydata = () => {
    navigate("/mydata");
  };

  //useEffect to handle close menu notification and menu navbar
  useEffect(() => {
    let handler = (e) => {
      if (!notificationRef.current?.contains(e.target)) {
        setShowNotification(false);
      }
      if (!personalRef.current?.contains(e.target)) {
        setShowPersonalData(false);
      }
      if (!menuRef.current.contains(e.target)) {
        setShowList(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  //useEffect to handle store notification
  useEffect(() => {
    if (showNotification) {
      axios
        .get(`${process.env.REACT_APP_API_URI}api/read_notifications`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then()
        .catch((error) => {});
    }
  }, [showNotification]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URI}api/user_notifications_`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setNotification(res.data.notifications);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // store personal information
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URI}api/myprofile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPersonalData(res.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <header>
      {isLoading && (
        <>
          <Loader />
        </>
      )}
      <div className="logo">
        <Link to="/">
          <img src="/assets/find-me-logo.png" alt="" />
        </Link>
        <button onClick={handleClick} className="add_your_ads">
          <span>
            Add Your Advertise{" "}
            <FontAwesomeIcon icon={faPlus} style={{ paddingLeft: "4px" }} />
          </span>
        </button>
      </div>
      <div className={`navigation_link_a`}>
        <NavLink to="/">About Us</NavLink>
        <NavLink to="/markets?page=1">Home</NavLink>
        <NavLink to="openshop">Duty Free</NavLink>
        <NavLink to="jobintroduction">Job</NavLink>
        <NavLink to="services">Index</NavLink>
        {localStorage.getItem("find_me_token") ? (
          ""
        ) : (
          <NavLink to="/login">Sign In</NavLink>
        )}
      </div>
      <div className="navigation_right">
        {localStorage.getItem("find_me_token") && (
          <div className="navigation_link">
            <button
              className="nav-btn nav-close-btn"
              onClick={() => setShowNotification(!showNotification)}
              ref={notificationRef}
            >
              <FontAwesomeIcon
                className="nav-btn nav-close-btn"
                icon={faBell}
              />
            </button>
            <ul
              className={`notification_list ${
                showNotification
                  ? "active_notification"
                  : "inactive_notification"
              }`}
            >
              <h2 className="notification_title">Notifaication</h2>
              {notification &&
                notification.map((element) => (
                  <Notification key={element.id} element={element} />
                ))}
            </ul>
          </div>
        )}
        {localStorage.getItem("find_me_token") && (
          <div className="my_image">
            <img
              src={`${process.env.REACT_APP_API_URI}${personalData.image}`}
              alt=""
              onClick={() => setShowPersonalData(!showPersonalData)}
              ref={personalRef}
            />
            <ul
              className={`info_list ${
                showPersonalData
                  ? "active_personal_data"
                  : "inactive_personal_data"
              }`}
            >
              <p style={{ margin: "0" }}>Log In As</p>
              <h6>{personalData.name}</h6>
              <hr />
              <li onClick={handleGoMydata}>
                <p>My Data</p>
              </li>
              <li onClick={handleGoProfile}>
                <p>My Profile</p>
              </li>
              <li onClick={handleLogout} className="log_out">
                <p>Log Out</p>
              </li>
            </ul>
          </div>
        )}
        <div className="responcive_list">
          <button
            className="nav-btn nav-close-btn"
            onClick={() => setShowList(!showList)}
            ref={menuRef}
          >
            <FontAwesomeIcon className="nav-btn nav-close-btn" icon={faBars} />
          </button>
          <div
            className={`nav_list ${
              showList ? "active_nav_list" : "inactive_nav_list"
            }`}
          >
            <NavLink to="/">About Us</NavLink>
            <NavLink to="/markets?page=1">Home</NavLink>
            <NavLink to="openshop">Duty Free</NavLink>
            <NavLink to="jobintroduction">Job</NavLink>
            <NavLink to="services">Index</NavLink>
            {localStorage.getItem("find_me_token") ? (
              ""
            ) : (
              <NavLink to="/login">Sign In</NavLink>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
