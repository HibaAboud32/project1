import React, { useEffect, useState } from "react";
import "./FormEmployee.css";
import axios from "axios";
import Loader from "../../../loader/Loader";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { Add, DeleteOutline } from "@mui/icons-material";

const token = localStorage.getItem("find_me_token");

function FormEmployee() {
  //state to store input
  const [titleEn, setTitleEn] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [Phone, setPhone] = useState("");
  const [LocationAr, setLocationAr] = useState("");
  const [LocationEn, setLocationEn] = useState("");
  const [city, setCity] = useState("");
  const [Skills, setSkills] = useState([""]);
  const [cv, setCv] = useState("");
  const [SocialLinks, setSocialLinks] = useState({
    instagram: "",
    facebook: "",
    github: "",
  });
  //state for loading
  const [loading, setLoading] = useState(false);
  //state to store message
  const [errMessage, setErrMessage] = useState("");
  const [successAddSeekers, setSuccessAddSeekers] = useState(false);

  const handleSaveFile = (e) => {
    setCv(e.target.files[0]);
  };

  const handleAddSeekers = () => {
    // Basic form validation
    if (
      !titleEn ||
      !titleAr ||
      !descriptionEn ||
      !descriptionAr ||
      !Phone ||
      !LocationAr ||
      !LocationEn ||
      !city
    ) {
      setErrMessage("Please fill in all required fields.");
      return;
    }
    setErrMessage("");
    setLoading(true);
    const formData = new FormData();
    formData.append("title_en", titleEn);
    formData.append("title_ar", titleAr);
    formData.append("description_en", descriptionEn);
    formData.append("description_ar", descriptionAr);
    formData.append("city_id", city);
    formData.append("cv", cv);
    formData.append("phone", Phone);
    formData.append("location_ar", LocationAr);
    formData.append("location_en", LocationEn);
    formData.append("skills", JSON.stringify(Skills));
    formData.append("social_media_links", JSON.stringify(SocialLinks));

    axios
      .post(`${process.env.REACT_APP_API_URI}api/job_seekers`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setLoading(false);
        if (res.data.status) {
          setSuccessAddSeekers(true);
        } else {
          setErrMessage(res.data.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.response.data); // Detailed error message from server
        setErrMessage(error.message);
      });
  };

  useEffect(() => {
    setErrMessage("");
    // setSuccessAddSeekers(false);
  }, [
    titleEn,
    titleAr,
    Phone,
    descriptionAr,
    descriptionEn,
    cv,
    city,
    LocationEn,
    LocationAr,
    SocialLinks,
    Skills,
  ]);

  // state to loading cities
  const [Cities, setCities] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URI}api/cities`)
      .then((res) => {
        // console.log(res);
        setCities(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // add skills
  const addSkillField = () => {
    if (Skills.length < 5) {
      setSkills([...Skills, ""]);
    }
  };
  const handleSkillChange = (index, value) => {
    const updatedSkills = [...Skills];
    updatedSkills[index] = value;
    setSkills(updatedSkills);
  };

  const deleteSkillField = (index) => {
    const updatedSkills = [...Skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  // Update social links
  const handleSocialLinksChange = (platform, value) => {
    setSocialLinks((prev) => ({
      ...prev,
      [platform]: value,
    }));
  };

  return (
    <>
      <div className="container5 w-75 justify-content-center">
        <div className="row">
          <div className="col-lg col-sm-12">
            <label className="form-label">Title Arabic</label>
            <br></br>
            <input
              className="form-control"
              type="text"
              placeholder="Enter title arabic :"
              value={titleAr}
              onChange={(e) => setTitleAr(e.target.value)}
              required
            ></input>
          </div>
          <div className="col-lg col-sm-12">
            <label className="form-label">Title English</label>
            <br></br>
            <input
              className="form-control"
              type="text"
              placeholder="Enter title english :"
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              required
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-lg col-sm-12">
            <label className="form-label">Phone</label>
            <br></br>
            <input
              className="form-control"
              type="tel"
              pattern="^\+?\d{0,13}$"
              placeholder="Enter phone :"
              value={Phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            ></input>
          </div>
          <div className="col-lg col-sm-12">
            <label className="form-label">City</label>
            <br></br>
            <select
              className="form-control"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={{ borderRadius: "20px", width: "75%" }}
              required
            >
              {Cities.map((element) => (
                <option value={element.name_ar} key={element.id}>
                  {element.name_ar}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-lg col-sm-12">
            <label className="form-label">Location Arabic</label>
            <br></br>
            <input
              className="form-control"
              type="text"
              placeholder="Enter location :"
              value={LocationAr}
              onChange={(e) => setLocationAr(e.target.value)}
              required
            ></input>
          </div>
          <div className="col-lg col-sm-12">
            <label className="form-label">Location English</label>
            <br></br>
            <input
              className="form-control"
              type="text"
              placeholder="Enter location :"
              value={LocationEn}
              onChange={(e) => setLocationEn(e.target.value)}
              required
            ></input>
          </div>
        </div>

        <div className="row ">
          <div className="col-lg col-sm-12">
            <label className="form-label">Descriptions English </label>
            <textarea
              className="form-control"
              type="text"
              placeholder="Enter requirements english :"
              value={descriptionEn}
              onChange={(e) => setDescriptionEn(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="col-lg col-sm-12">
            <label className="form-label">Descriptions Arabic</label>
            <textarea
              className="form-control"
              type="text"
              placeholder="Enter requirements arabic :"
              value={descriptionAr}
              onChange={(e) => setDescriptionAr(e.target.value)}
              required
            ></textarea>
          </div>
        </div>

        <div className="row">
          {Skills.map((skill, index) => (
            <div className="col-lg-6 col-sm-12" key={index}>
              <label className="form-label">Skills</label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter Your Skills:"
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
              ></input>
              <div
                className="col-lg-4 col-sm-8"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px",
                }}
              >
                <Add
                  onClick={() => addSkillField(index)}
                  style={{
                    fontSize: "30px",
                    cursor: "pointer",
                    background: "#5f9b97",
                    borderRadius: "50%",
                    color: "#fff",
                  }}
                />
                <DeleteOutline
                  onClick={() => deleteSkillField(index)}
                  style={{
                    fontSize: "30px",
                    cursor: "pointer",
                    background: "#5f9b97",
                    borderRadius: "50%",
                    color: "#fff",
                  }}
                />
              </div>
            </div>
          ))}

          <div className="col-lg-6 col-sm-12">
            <label className="form-label">Social Media Links</label>
            <br></br>
            <input
              className="form-control"
              type="url"
              pattern="https?://instagram.com/.+"
              placeholder="https://instagram.com/...."
              value={SocialLinks.instagram}
              // onChange={(e) => setSocialLinks(e.target.value)}
              onChange={(e) =>
                handleSocialLinksChange("instagram", e.target.value)
              }
            ></input>
            <br></br>
            <input
              className="form-control"
              type="url"
              pattern="https?://facebook.com/.+"
              placeholder="https://facebook.com/...."
              value={SocialLinks.facebook}
              // onChange={(e) => setSocialLinks(e.target.value)}
              onChange={(e) =>
                handleSocialLinksChange("facebook", e.target.value)
              }
            ></input>
            <br></br>
            <input
              className="form-control"
              type="url"
              pattern="https?://github.com/.+"
              placeholder="https://github.com/...."
              value={SocialLinks.github}
              // onChange={(e) => setSocialLinks(e.target.value)}
              onChange={(e) =>
                handleSocialLinksChange("github", e.target.value)
              }
            ></input>
          </div>
        </div>

        <div
          className="row"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            className="col-lg-2 col-sm-4  text-center"
            style={{ paddingTop: "30px" }}
          >
            <label htmlFor="file" className="label_for_file">
              Upload Your CV <FontAwesomeIcon icon={faUpload} />
            </label>
            <input
              id="file"
              type="file"
              placeholder="Upload Your CV"
              onChange={handleSaveFile}
            />
          </div>
          <div
            className="col-lg-2 col-sm-4  text-center"
            style={{ paddingTop: "30px" }}
          >
            <button className="primary_button" onClick={handleAddSeekers}>
              {" "}
              Add Job
            </button>
          </div>
        </div>
        {successAddSeekers && (
          <div className="succesMessage">
            <p>
              The process was completed successfully. You will receive a
              notification when your product is approved{" "}
              <Link to={-1}>Back</Link>{" "}
            </p>
          </div>
        )}
        <p
          className={errMessage ? "errmsg" : "offscreen"}
          style={{ padding: "10px", marginTop: "20px" }}
        >
          {errMessage}
        </p>
      </div>
      {loading && <Loader />}
    </>
  );
}
export default FormEmployee;
