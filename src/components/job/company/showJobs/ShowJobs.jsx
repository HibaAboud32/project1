import React from "react";
import styles from "./showJobs.module.css";
import { useRef } from "react";
// import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useState } from "react";
import NewJobDeatails from "../jobDetails/NewJobDeatails";
const token = localStorage.getItem("find_me_token");

const ShowJobs = ({ jobOffers, setJobOffers }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [itemId, setItemId] = useState("");
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const updateRef = useRef(null);
  const divRef = useRef(null);

  const handleOpenModal = (id) => {
    setItemId(id);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // const handleShowDetail = (id) => {
  //   // divRef.current.scrollIntoView({ behavior: "smooth" });
  //   navigate(`jobdetails/${id}`);
  // };

  const listClicked = (index) => {
    setJobOffers((prevProduct) => {
      const newData = [...prevProduct];
      newData[index].menuList = !newData[index].menuList;
      return newData;
    });
  };

  const handleUpdateProduct = (e, id) => {
    console.log("hi");
    navigate(`/formupdateoffers/${id}`);
    setJobOffers((prevData) =>
      prevData.map((obj) => ({
        ...obj,
        menuList: false,
      }))
    );
  };

  const handleDeleteProduct = (e, id) => {
    axios
      .post(`${process.env.REACT_APP_API_URI}api/delete_offer/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status) {
          setJobOffers(jobOffers.filter((product) => product.id !== id));
        }
      })
      .catch((error) => {
        console.log(error);
      });
    e.stopPropagation();
    console.log("hi");
    setJobOffers((prevData) =>
      prevData.map((obj) => ({
        ...obj,
        menuList: false,
      }))
    );
  };
  console.log(jobOffers);

  return (
    <>
      <div className={`row`} style={{ paddingTop: "40px" }}>
        {jobOffers &&
          jobOffers.map((element, index) => (
            <div
              key={element.id}
              className="col-lg-3 col-md-6 col-sm-8 text-center"
            >
              <div style={{ padding: "30px" }}>
                <img
                  className={styles.imgcompany}
                  style={{
                    backgroundColor: "#ECF5F4",
                    borderRadius: "50%",
                    width: "140px",
                    height: "120px",
                    objectFit: "cover",
                  }}
                  src={`${process.env.REACT_APP_API_URI}${element.profile_img}`}
                  alt=""
                ></img>
              </div>
              <div className={styles.product_element_icon}>
                <div
                  className={styles.dots}
                  onClick={() => listClicked(index)}
                  ref={menuRef}
                >
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                {element.menuList && (
                  <div className={styles.list_product}>
                    <div
                      ref={menuRef}
                      className={styles.list_element}
                      onClick={(e) => handleUpdateProduct(e, element.id)}
                    >
                      <FontAwesomeIcon icon={faArrowsRotate} />
                      <p>Update</p>
                    </div>
                    <div
                      ref={updateRef}
                      className={styles.list_element}
                      onClick={(e) => handleDeleteProduct(e, element.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                      <p>Delete</p>
                    </div>
                  </div>
                )}
              </div>
              <div
                className="card"
                style={{ borderRadius: "30px", margin: "20px" }}
              >
                <div className="card-body">
                  <h5 className={styles.title}>company name</h5>
                  <p>{element.user_name}</p>

                  <h5 className={styles.title}>Job Category</h5>
                  <p>{element.job_category}</p>

                  <h5 className={styles.title}>Number</h5>
                  <p>{element.phone}</p>

                  <h5 className={styles.title}>Location</h5>
                  <p>{element.location}</p>

                  <button
                    className="primary_button"
                    // onClick={() => handleShowDetail(element.id)}
                    onClick={() => handleOpenModal(element.id)}
                  >
                    show detail
                  </button>
                  <NewJobDeatails
                    id={itemId}
                    isOpen={modalOpen}
                    onClose={handleCloseModal}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
      <div
        className="row justify-content-center"
        style={{ paddingTop: "20px" }}
      ></div>
      <div ref={divRef} />
      {/* <Outlet /> */}
    </>
  );
};

export default ShowJobs;
