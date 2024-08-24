// import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
// import './styleform.css'
import axios from "axios";
import Loader from "../../../loader/Loader";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const token = localStorage.getItem("find_me_token");

function FormCompany() {
  const [nameEn, setNameEn] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [city, setCity] = useState("");

  //state to handle succes message
  const [errorMessage, setErrorMessage] = useState("");
  const [succesAddProduct, setSuccesAddProduct] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSaveFile = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSendJob = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name_en", nameEn);
    formData.append("name_ar", nameAr);
    formData.append("description_ar", descriptionAr);
    formData.append("description_en", descriptionEn);
    formData.append("phone", phone);
    formData.append("location", location);
    formData.append("current_price", price);
    formData.append("image", image);
    formData.append("city", city);
    axios
      .post(`${process.env.REACT_APP_API_URI}api/add_product`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
        if (res.data.status) {
          setSuccesAddProduct(res.data.message);
          setCity("");
          setDescriptionAr("");
          setDescriptionEn("");
          setImage("");
          setLocation("");
          setNameAr("");
          setNameEn("");
          setPhone("");
          setPrice("");
        } else {
          setErrorMessage(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setErrorMessage("error : ", error);
      });
  };

  useEffect(() => {
    setErrorMessage("");
  }, [
    nameEn,
    nameAr,
    descriptionAr,
    descriptionEn,
    phone,
    location,
    price,
    image,
  ]);

  return (
    <>
      <div className="container5 w-75 justify-content-center">
        <div className="row">
          <div className="col-lg col-sm-12">
            <label className="form-label">Name Arabic</label>
            <br></br>
            <input
              name="name_ar"
              className="form-control"
              type="text"
              placeholder="Enter Name arabic"
              value={nameAr}
              onChange={(e) => setNameAr(e.target.value)}
            ></input>
          </div>
          <div className="col-lg col-sm-12">
            <label className="form-label">Name English</label>
            <br></br>
            <input
              name="title_en"
              className="form-control"
              type="text"
              placeholder="Enter Name english"
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
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
              type="phone"
              placeholder="Enter Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            ></input>
          </div>
          <div className="col-lg col-sm-12">
            <label className="form-label">Price</label>
            <br></br>
            <input
              name="price"
              className="form-control"
              type="number"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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
              placeholder="Enter Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            ></input>
          </div>
          <div className="col-lg col-sm-12">
            <label className="form-label">City</label>
            <br></br>
            <input
              name="city"
              className="form-control"
              type="text"
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></input>
          </div>
        </div>

        <div className="row ">
          <div className="col-lg col-sm-12">
            <label className="form-label">Description Arabic</label>
            <textarea
              name="description-arabic"
              className="form-control"
              type="text"
              placeholder="Description Arabic"
              value={descriptionAr}
              onChange={(e) => setDescriptionAr(e.target.value)}
            ></textarea>
          </div>
          <div className="col-lg col-sm-12">
            <label className="form-label">Description English</label>
            <textarea
              name="description-english"
              className="form-control"
              type="text"
              placeholder="Description English"
              value={descriptionEn}
              onChange={(e) => setDescriptionEn(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="row">
          <div className="col-lg col-sm-12" style={{ paddingTop: "30px" }}>
            <label htmlFor="file" className="label_for_file">
              Upload Image
              <AddPhotoAlternateIcon />
            </label>
            <input
              id="file"
              type="file"
              placeholder="Upload Your CV"
              onChange={(e) => handleSaveFile(e)}
            />
          </div>
          <div className="col-lg col-sm-12" style={{ paddingTop: "30px" }}>
            <button className="primary_button" onClick={handleSendJob}>
              {" "}
              Add Product
            </button>
          </div>
        </div>
        {succesAddProduct && (
          <div className="succesMessage">
            <p>
              The process was completed successfully. You will receive a
              notification when your product is approved
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
