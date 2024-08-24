// import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import "./FormCompany.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../../../loader/Loader";

const token = localStorage.getItem("find_me_token");

function FormCompany() {
  const [titleAr, setTitleAr] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [workHour, setWorkHour] = useState("");
  const [jobCategory, setJobCategory] = useState("");
  const [requirementsAr, setRequirementsAr] = useState("");
  const [requirementsEn, setRequirementsEn] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");
  const [city, setCity] = useState("");

  //state to handle success message
  const [successAddJob, setSuccessAddJob] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // state to loading job categories
  const [JobCategories, setJobCategories] = useState(["job"]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URI}api/job_categories`)
      .then((res) => {
        console.log(res);
        setJobCategories(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // state to loading cities
  const [Cities, setCities] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URI}api/cities`)
      .then((res) => {
        console.log(res);
        setCities(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSendJob = () => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API_URI}api/add_offer`,
        {
          title_ar: titleAr,
          title_en: titleEn,
          work_hours: workHour,
          job_category: jobCategory,
          requirements_ar: requirementsAr,
          requirements_en: requirementsEn,
          location: location,
          phone: phone,
          salary: salary,
          experience: experience,
          city: city,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status) {
          setSuccessAddJob(true);
        } else {
          setErrorMessage(res.data.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    setErrorMessage("");
  }, [
    titleAr,
    titleEn,
    workHour,
    jobCategory,
    requirementsAr,
    requirementsEn,
    location,
    phone,
    salary,
    experience,
    city,
  ]);

  return (
    <>
      <div className="container5 w-75 justify-content-center">
        <div className="row">
          <div className="col-lg col-sm-12">
            <label className="form-label">Title Arabic</label>
            <br></br>
            <input
              name="title_ar"
              className="form-control"
              type="text"
              placeholder="Enter title arabic:"
              value={titleAr}
              onChange={(e) => setTitleAr(e.target.value)}
              required
            ></input>
          </div>
          <div className="col-lg col-sm-12">
            <label className="form-label">Title English</label>
            <br></br>
            <input
              name="title_en"
              className="form-control"
              type="text"
              placeholder="Enter title english:"
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              required
            ></input>
          </div>
        </div>

        <div className="row">
          <div className="col col-lg col-sm-12">
            <label className="form-label">Phone</label>
            <br></br>
            <input
              name="phone"
              className="form-control"
              type="text"
              placeholder="Enter phone :"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            ></input>
          </div>
          <div className=" col-lg col-sm-12">
            <label className="form-label">Work Hours</label>
            <br></br>
            <input
              name="work_hours"
              className="form-control"
              type="text"
              placeholder="Enter work hours :"
              value={workHour}
              onChange={(e) => setWorkHour(e.target.value)}
              required
            ></input>
          </div>
        </div>

        <div className="row">
          <div className="col-lg col-sm-12">
            <label className="form-label">Location</label>
            <br></br>
            <input
              name="location"
              className="form-control"
              type="text"
              placeholder="Enter location :"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            ></input>
          </div>
          <div className=" col-lg-6 col-sm-12">
            <label className="form-label">Experience</label>
            <br></br>
            <input
              name="experience"
              className="form-control"
              type="text"
              placeholder="Enter experience :"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
            ></input>
          </div>
        </div>

        <div className="row ">
          <div className=" col-lg col-sm-12">
            <label className="form-label">Requirements English </label>
            <textarea
              name="requirements_en"
              className="form-control"
              type="text"
              placeholder="Enter requirements english :"
              value={requirementsEn}
              onChange={(e) => setRequirementsEn(e.target.value)}
              required
            ></textarea>
          </div>
          <div className=" col-lg col-sm-12">
            <label className="form-label">Requirements Arabic</label>
            <textarea
              name="requirements_ar"
              className="form-control"
              type="text"
              placeholder="Enter requirements arabic :"
              value={requirementsAr}
              onChange={(e) => setRequirementsAr(e.target.value)}
              required
            ></textarea>
          </div>
        </div>

        <div className="row">
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
          <div className=" col-lg-6 col-sm-12">
            <label className="form-label">Job Category</label>
            <br></br>
            <select
              className="form-control"
              value={jobCategory}
              onChange={(e) => setJobCategory(e.target.value)}
              style={{ borderRadius: "20px", width: "75%" }}
              required
            >
              {JobCategories.map((element) => (
                <option value={element.name} key={element.id}>
                  {element.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 col-sm-12">
            <label className="form-label">Salary</label>
            <br></br>
            <input
              name="salary"
              className="form-control"
              type="text"
              placeholder="Enter salary :"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
            ></input>
          </div>
          <div
            className="col-lg-4 col-sm-4 align-self-center text-center"
            style={{ paddingTop: "30px" }}
          >
            <button className="primary_button" onClick={handleSendJob}>
              {" "}
              Add Job
            </button>
          </div>
        </div>
        {successAddJob && (
          <div className="succesMessage">
            <p>
              The process was completed successfully. You will receive a
              notification when your product is approved{" "}
              <Link to={-1}>Back</Link>{" "}
            </p>
          </div>
        )}
        <p
          className={errorMessage ? "errmsg" : "offscreen"}
          aria-live="assertive"
          style={{ marginTop: "10px" }}
        >
          {errorMessage}
        </p>
      </div>
      {loading && <Loader />}
    </>
  );
}

export default FormCompany;
