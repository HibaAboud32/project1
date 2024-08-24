import React, { useCallback, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
// import { Box, Modal, Typography } from "@mui/material";
import styles from "./Offers.module.css";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

const Stories = ({ data }) => {
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();

  // const [open, setOpen] = useState(false);
  // const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URI}api/advertisement`)
      .then((res) => {
        setOffers(res.data.data);
      })
      .catch((error) => console.log(error));
  }, []);
  const handleNavigate = useCallback(
    (id) => {
      navigate(`/profile/${id}`);
    },
    [navigate]
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div style={{ width: "90%", margin: "auto", padding: "10px" }}>
      <Slider {...settings}>
        {offers.map((offer, index) => (
          <Grid key={index} container lg={10} md={10} sm={10} xs={10}>
            <div
              // onClick={() => handleOpen(offer)}
              className={styles.card_offer}
            >
              <div className={styles.card__img}>
                <img
                  src={`${process.env.REACT_APP_API_URI}${offer.image}`}
                  alt=""
                />
              </div>
              <div class={styles.card__avatar}>
                <img
                  src={`${process.env.REACT_APP_API_URI}${offer.shop.image}`}
                  alt="Shop Logo"
                ></img>
              </div>
              <div class={styles.card__title}>{offer.shop.name_en}</div>
              <div class={styles.card__subtitle}>{offer.shop.bio}</div>
              <div class={styles.card__wrapper}>
                <button
                  class={styles.card__btn}
                  onClick={() => handleNavigate(offer.shop.id)}
                >
                  Show Shop
                </button>
              </div>
            </div>
          </Grid>
        ))}
      </Slider>
      {/* {selectedStory && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src={`${process.env.REACT_APP_API_URI}${selectedStory.shop.image}`}
                alt="Shop Logo"
                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
              />
              <Typography variant="h6">{selectedStory.shop.name_en}</Typography>
            </div>
            <Typography variant="body1" style={{ marginTop: "20px" }}>
              {selectedStory.shop.bio}
            </Typography>
            <img
              src={`${process.env.REACT_APP_API_URI}${selectedStory.image}`}
              alt={selectedStory.title}
              style={{ width: "100%", marginTop: "10px" }}
            />
          </Box>
        </Modal>
      )} */}
    </div>
  );
};

export default Stories;
