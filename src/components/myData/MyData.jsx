import React, { useEffect, useState } from "react";
import styles from "./myData.module.css";
import axios from "axios";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "../loader/Loader";

const token = localStorage.getItem("find_me_token");

const MyData = () => {
  //state to store is loading
  const [isLoading, setIsLoading] = useState(false);

  //state to store data
  const [data, setData] = useState({});

  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [userImage, setUserImage] = useState();
  const [lastPassword, setLastPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessagePassword, setSuccessMessagePassword] = useState("");
  const [successMessageInformation, setSuccessMessageInformation] =
    useState("");

  const handleSaveFile = (e) => {
    setUserImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", userName);
    formData.append("phone", phone);
    formData.append("image", userImage);

    axios
      .post(`${process.env.REACT_APP_API_URI}api/update_profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(Array.from(formData));
        setData(res.data.user);
        setIsLoading(false);
        setUserName("");
        setPhone("");
        setSuccessMessageInformation("Informations Changed Successfully");
      })
      .catch((error) => {
        console.log(
          "Error updating profile:",
          error.response ? error.response.data : error
        );
        setIsLoading(false);
      });
  };

  const handleUpdatePassword = () => {
    if (!lastPassword) {
      setErrorMessage("Enter Last Password");
    } else if (!newPassword) {
      setErrorMessage("Enter New Password");
    } else {
      setIsLoading(true);
      axios
        .post(
          `${process.env.REACT_APP_API_URI}api/update_password`,
          {
            old_password: lastPassword,
            new_password: newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.status) {
            console.log(res);
            setLastPassword("");
            setNewPassword("");
            setSuccessMessagePassword("Password Changed Successfully");
            setIsLoading(false);
          } else {
            setErrorMessage(res.data.message);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  //useeffect to handle error message
  useEffect(() => {
    setErrorMessage("");
  }, [lastPassword, newPassword]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URI}api/myprofile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(`${process.env.REACT_APP_API_URI}${data.image}`);
        console.log(res.data.user);
        setData(res.data.user);
        setUserName(res.data.user.name);
        setPhone(res.data.user.phone);
        setUserImage(res.data.user.image);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.my_data}>
      <img
        src={`${process.env.REACT_APP_API_URI}${data.image}`}
        alt=""
        className={styles.my_data_image}
      />
      <h5 className={styles.title}>Welcome {data.name} </h5>
      <form className={styles.my_data_form}>
        <div className={styles.form_element}>
          <label>{data.name}</label>
          <input
            type="name"
            placeholder="Enter New Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className={styles.form_element}>
          <label>{data.phone}</label>
          <input
            type="phone"
            placeholder="Enter New Name"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className={styles.form_element}>
          <label
            htmlFor="file"
            style={{ backgroundColor: "#DE9248" }}
            className="label_for_file"
          >
            Upload Your Image <FontAwesomeIcon icon={faUpload} />
          </label>
          <input
            id="file"
            type="file"
            placeholder="Upload Your CV"
            onChange={(e) => handleSaveFile(e)}
          />
        </div>
        <button
          style={{ width: "fit-content", marginTop: "20px" }}
          className="primary_button"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <p
          className={successMessageInformation ? "errmsg" : "offscreen"}
          aria-live="assertive"
          style={{ marginTop: "20px", backgroundColor: "green", color: "#fff" }}
        >
          {successMessageInformation}
        </p>
      </form>
      <hr />
      <div className={styles.password}>
        <h5 className={styles.title}>Change Password</h5>
        <p
          className={errorMessage ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errorMessage}
        </p>
        <div className={styles.form_element}>
          <label>Enter Last Password</label>
          <input
            type="password"
            placeholder="Enter Last Password"
            value={lastPassword}
            onChange={(e) => setLastPassword(e.target.value)}
          />
        </div>
        <div className={styles.form_element}>
          <label>Enter New Password</label>
          <input
            type="password"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button
          className="primary_button"
          style={{ width: "fit-content", marginTop: "20px" }}
          onClick={handleUpdatePassword}
        >
          Update Password
        </button>
        <p
          className={successMessagePassword ? "errmsg" : "offscreen"}
          aria-live="assertive"
          style={{ marginTop: "20px", backgroundColor: "green", color: "#fff" }}
        >
          {successMessagePassword}
        </p>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default MyData;
