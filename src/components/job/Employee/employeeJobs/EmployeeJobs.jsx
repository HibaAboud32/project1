import React, { useState } from "react";
import styles from "./employeeJobs.module.css";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import axios from "axios";
import SeekersDetails from "../../seekersDetails/SeekersDetails";

const token = localStorage.getItem("find_me_token");

const EmployeeJobs = ({ jobSeekers, setJobSeekers }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [itemId, setItemId] = useState("");

  // const location = useLocation();
  const navigate = useNavigate();
  const divRef = useRef(null);
  const menuRef = useRef(null);
  const updateRef = useRef(null);

  const handleOpenModal = (id) => {
    setItemId(id);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // const handleClick = (id) => {
  //   divRef.current?.scrollIntoView({ behavior: "smooth" });
  //   navigate(`seekersdetails/${id}`);
  // };

  const listClicked = (index) => {
    setJobSeekers((prevProduct) => {
      const newData = [...prevProduct];
      newData[index].menuList = !newData[index].menuList;
      return newData;
    });
  };

  const handleUpdateProduct = (e, id) => {
    console.log("hi");
    navigate(`/formupdateseekers/${id}`);
    setJobSeekers((prevData) =>
      prevData.map((obj) => ({
        ...obj,
        menuList: false,
      }))
    );
  };

  const handleDeleteProduct = (e, id) => {
    axios
      .post(`${process.env.REACT_APP_API_URI}api/job_seekers/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status) {
          setJobSeekers(jobSeekers.filter((product) => product.id !== id));
        }
      })
      .catch((error) => {
        console.log(error);
      });
    e.stopPropagation();
    console.log("hi");
    setJobSeekers((prevData) =>
      prevData.map((obj) => ({
        ...obj,
        menuList: false,
      }))
    );
  };

  // useEffect to handle open and close menu
  // useEffect(() => {
  //   const handleClickAnywhere = (e) => {
  //     if (
  //       !menuRef.current.contains(e.target) &&
  //       !updateRef.current.contains(e.target)
  //     ) {
  //       setEmployeeJob((prevData) => {
  //         return prevData.map((obj) => {
  //           return {
  //             ...obj,
  //             menuList: false,
  //           };
  //         });
  //       });
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickAnywhere);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickAnywhere);
  //   };
  // }, []);

  console.log(jobSeekers);

  return (
    <>
      <div className={styles.container2}>
        <div className={`row`} style={{ paddingTop: "40px" }}>
          {jobSeekers &&
            jobSeekers.map((element, index) => (
              <div
                key={element.id}
                className="col-lg-3 col-md-6 col-sm-8 text-center"
                // style={{ paddingTop: "20px" }}
              >
                <div
                  className="card"
                  style={{ borderRadius: "30px", margin: "20px" }}
                >
                  <div className="card-body">
                    <div
                      className={`row flex-column ${styles.image_div}`}
                      style={{ width: "fit-content", margin: "auto" }}
                    >
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <img
                          src={`${process.env.REACT_APP_API_URI}${element.profile_img}`}
                          className={styles.imgcompany}
                          style={{
                            backgroundColor: "#ECF5F4",
                            borderRadius: "50%",
                            width: "140px",
                            height: "120px",
                            objectFit: "cover",
                          }}
                          alt=""
                        ></img>
                      </div>
                      {/* <div className={styles.product_element_icon}>
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
                              onClick={(e) =>
                                handleUpdateProduct(e, element.id)
                              }
                            >
                              <FontAwesomeIcon icon={faArrowsRotate} />
                              <p>Update</p>
                            </div>
                            <div
                              ref={updateRef}
                              className={styles.list_element}
                              onClick={(e) =>
                                handleDeleteProduct(e, element.id)
                              }
                            >
                              <FontAwesomeIcon icon={faTrash} />
                              <p>Delete</p>
                            </div>
                          </div>
                        )}
                      </div> */}
                      <div
                        className={`col-lg-6 col-md-6 col-sm-6 align-self-center ${styles.user_name}`}
                        style={{
                          color: "#006E66",
                          fontSize: "20px",
                          width: "100%",
                        }}
                      >
                        <p> {element.user_name}</p>
                      </div>
                    </div>
                    <div className="row">
                      <p
                        className="col-lg-12 col-md-12 col-sm-12"
                        style={{
                          color: "#006E66",
                          fontSize: "20px",
                          padding: "15px",
                          height: "60px",
                        }}
                      >
                        {" "}
                        {element.title_en}
                      </p>
                    </div>
                    <div className="row">
                      <p
                        className="col-lg-12 col-md-12 col-sm-12"
                        style={{
                          color: "#006E66",
                          fontSize: "20px",
                          padding: "15px",
                        }}
                      >
                        {element.city.name_ar}
                      </p>
                    </div>

                    <button
                      className="primary_button"
                      // onClick={() => handleClick(element.id)}
                      onClick={() => handleOpenModal(element.id)}
                    >
                      show detail
                    </button>
                    <SeekersDetails
                      id={itemId}
                      isOpen={modalOpen}
                      onClose={handleCloseModal}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div ref={divRef} />
    </>
  );
};

export default EmployeeJobs;
