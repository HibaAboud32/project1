import React, { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./category.css";
import axios from "axios";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";

import { Navigation } from "swiper";
import { autoBatchEnhancer } from "@reduxjs/toolkit";

const Category = () => {
  const navigate = useNavigate();
  const [categorys, setCategorys] = useState([]);

  const handleClick = useCallback(
    (id) => {
      navigate(`/category/${id}`);
    },
    [navigate]
  );

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URI}api/categories`)
      .then((res) => {
        setCategorys(res.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  console.log("main category component");

  return (
    <div className="categorys">
      <div className=" caetgory_container">
        <Swiper
          slidesPerView={4}
          navigation={true}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          modules={[Navigation]}
          className="mySwiper"
          breakpoints={{
            // when window width is >= 200px
            200: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            // when window width is >= 640px
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
        >
          {categorys &&
            categorys.map((category) => (
              <SwiperSlide key={category.id}>
                <div
                  className="category"
                  onClick={() => handleClick(category.id)}
                  // onClick={handleClick.bind(null, category.id)}
                >
                  <div className="main_categorys">
                    <img
                      className="category-image"
                      src={`${process.env.REACT_APP_API_URI}${category.image}`}
                      alt=""
                    />
                    <h3 className="category-name">{category.name_en}</h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default React.memo(Category);
