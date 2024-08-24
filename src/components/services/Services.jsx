import React, { useEffect, useState } from "react";
import styles from "./services.module.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AdvertiseTwo from "../advertisetwo/AdvertiseTwo";
import { Box, Modal, useMediaQuery } from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

const initialValues = {
  citys: "",
  categorys: "",
  place: "",
};

const updateSchema = Yup.object().shape({
  citys: Yup.string(),
  categorys: Yup.string(),
  place: Yup.string(),
});

const Services = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isMobile = useMediaQuery("(max-width: 1100px)");

  const [services, setServices] = useState([]);
  // const [isThereSub, setIsThereSub] = useState()
  const [homeAds, setHomeAds] = useState([]);
  const [citysData, setCitysData] = useState([]);
  const [categorysData, setCategorysData] = useState([]);

  const handleSubServices = (id, index) => {
    if (services[index].sub) {
      navigate(`subservices/${id}`);
    } else {
      navigate(`mainservices/${id}`);
    }
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URI}api/services`)
      .then((res) => {
        setServices(res.data.services);
      })
      .catch((error) => console.log(error));
    axios
      .get(`${process.env.REACT_APP_API_URI}api/home_Ads`)
      .then((res) => setHomeAds(res.data.data))
      .catch((error) => console.log(error));
    axios
      .get(`${process.env.REACT_APP_API_URI}api/cities`)
      .then((res) => setCitysData(res.data?.data))
      .catch((error) => console.log(error));
    axios
      .get(`${process.env.REACT_APP_API_URI}api/services`)
      .then((res) => setCategorysData(res.data?.services))
      .catch((error) => console.log(error));
  }, []);

  // handle Search

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const [serchResult, setSerchResult] = useState([]);

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("city", values.citys);
    formData.append("category", values.categorys);
    formData.append("search", values.place);
    axios
      .post(
        `${process.env.REACT_APP_API_URI}api/home_search_sub_services`,
        formData
      )
      .then((res) => {
        const results = res.data?.data;
        if (results) {
          // Pass search results as state to the next route
          navigate(`mainservices/${id}`, { state: { searchResults: results } });
        }
        handleClose();
      })
      .catch((error) => console.log(error));
  };
  return (
    <div
      className={styles.services}
      style={{ minHeight: "calc(100vh - 135px)" }}
    >
      <AdvertiseTwo homeAds={homeAds} width={"100%"} />
      <h2 className={styles.title}>Services</h2>

      <div
        style={{ position: "relative" }}
        className={styles.services_container}
      >
        <Box
          sx={{
            position: "absolute",
            left: "4rem",
            top: "-2rem",
            bgcolor: "#39706c",
            p: "6px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
          onClick={handleOpen}
        >
          <img
            src="/assets/search.svg"
            alt="search"
            style={{
              width: "34px",
              height: "34px",
              objectFit: "cover",
            }}
          />
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "#fff",
              p: 5,
              width: "50%",
              borderRadius: "25px",
              boxShadow: 24,
              outline: "none",
            }}
          >
            <Formik
              initialValues={initialValues}
              validationSchema={updateSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form>
                  <Box sx={{ textAlign: isMobile ? "center" : "end" }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: isMobile ? "column" : "row",
                        columnGap: "25px",
                        mb: "10px",
                      }}
                    >
                      <Field
                        as="select"
                        id="citys"
                        name="citys"
                        style={{
                          width: isMobile ? "100%" : "230px",
                          padding: "13px 20px",
                          fontSize: "16px",
                          borderRadius: "20px",
                          border: "none",
                          boxShadow: "4px 6px 7px 0px #707070",
                          outline: "none",
                          marginBottom: "15px",
                          color: "#707070",
                        }}
                      >
                        {citysData.map((city) => (
                          <option key={city.id} value={city.name_ar}>
                            {city.name_ar}
                          </option>
                        ))}
                      </Field>
                      <Field
                        as="select"
                        id="categorys"
                        name="categorys"
                        style={{
                          width: isMobile ? "100%" : "230px",
                          padding: "13px 20px",
                          fontSize: "16px",
                          borderRadius: "20px",
                          border: "none",
                          boxShadow: "4px 6px 7px 0px #707070",
                          outline: "none",
                          marginBottom: "15px",
                          color: "#707070",
                        }}
                      >
                        {categorysData?.map((category, index) => (
                          <option key={index} value={category.name_ar}>
                            {category.name_ar}
                          </option>
                        ))}
                      </Field>
                      <Field
                        type="text"
                        id="place"
                        name="place"
                        placeholder="Place"
                        style={{
                          width: isMobile ? "100%" : "230px",
                          padding: "13px 20px",
                          fontSize: "16px",
                          borderRadius: "20px",
                          border: "none",
                          boxShadow: "4px 6px 7px 0px #707070",
                          outline: "none",
                          marginBottom: "15px",
                        }}
                      />
                    </Box>

                    <button className="primary_button" type="submit">
                      Search
                    </button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Modal>
        <div className={`${styles.services_container} container`}>
          {services &&
            services.map((element, index) => (
              <div key={element.id} className={styles.service}>
                <div className={styles.image}>
                  <img
                    src={`${process.env.REACT_APP_API_URI}${element.image}`}
                    alt={element.name_en}
                  />
                </div>
                <div className={styles.content}>
                  <p>{element.name_en}</p>
                  <p>{element.name_ar}</p>
                </div>
                <button
                  className="primary_button"
                  style={{ marginTop: "30px" }}
                  onClick={() => handleSubServices(element.id, index)}
                >
                  Show Details
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
