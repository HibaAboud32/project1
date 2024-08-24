import React from "react";
import "./FormAdd.css";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

export default function FormAdd() {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        padding: "30px",
        minHeight: "calc(100vh - 135px)",
      }}
    >
      <div className="form-container">
        <form className="form">
          <div className="row">
            <div className="form-group col-lg-6 col-md-6 col-sm-12">
              <label>Name Ar</label>
              <input type="text" required="" />
            </div>
            <div className="form-group col-lg-6 col-md-6 col-sm-12">
              <label>Name En</label>
              <input type="text" required="" />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-6 col-md-6 col-sm-12">
              <label>City</label>
              <input type="text" required="" />
            </div>
            <div className="form-group col-lg-6 col-md-6 col-sm-12">
              <label>Location</label>
              <input type="text" required="" />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-6 col-md-6 col-sm-12">
              <label>Phone</label>
              <input type="text" required="" />
            </div>
            <div className="form-group col-lg-6 col-md-6 col-sm-12">
              <label>Current Price</label>
              <input type="text" required="" />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-6 col-md-6 col-sm-12">
              <label for="textarea">Description Ar</label>
              <textarea
                name="textarea"
                id="textarea"
                rows="10"
                cols="50"
                required=""
              >
                {" "}
              </textarea>
            </div>
            <div className="form-group col-lg-6 col-md-6 col-sm-12">
              <label for="textarea">Description En</label>
              <textarea
                name="textarea"
                id="textarea"
                rows="10"
                cols="50"
                required=""
              >
                {" "}
              </textarea>
            </div>
          </div>
          <div
            className="row"
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <button
              style={{ margin: "20px 0px" }}
              className="primary_button col-lg-4 col-md-6 col-sm-12"
              type="file"
            >
              <AddPhotoAlternateIcon />
              Upload Image
            </button>

            <button
              style={{ margin: "20px 0px" }}
              className="primary_button col-lg-4 col-md-6 col-sm-12"
              type="file"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
