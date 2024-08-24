import React, { useEffect, useState } from "react";
import styles from "./subCategory.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper";
import AdvertiseTwo from "../../advertisetwo/AdvertiseTwo";
import Sections from "../../sections/Sections";

const SubCategory = () => {
  const { id } = useParams();
  const [ads, setAds] = useState([]);
  const [shops, setShops] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resAds = await axios.get(
          `${process.env.REACT_APP_API_URI}api/categories_Ads/${id}`
        );
        setAds(resAds.data.data);

        const resCategory = await axios.get(
          `${process.env.REACT_APP_API_URI}api/category/${id}`
        );
        setShops(resCategory.data.shops);
        setSubCategories(resCategory.data.sub_categories);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const handleClick = async (id) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URI}api/category/${id}`
      );
      setSubCategories(res.data.sub_categories);
      setShops(res.data.shops);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={styles.sub_category}
      style={{ minHeight: "calc(100vh - 135px)" }}
    >
      <AdvertiseTwo homeAds={ads} width={"100%"} />
      {subCategories.length > 0 && (
        <div
          className={styles.subCategories}
          style={{ backgroundColor: "#f5f5f5" }}
        >
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Navigation, Pagination]}
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
            {subCategories.map((element) => (
              <SwiperSlide
                key={element.id}
                onClick={() => handleClick(element.id)}
              >
                <div className={styles.sub_categories}>
                  <img
                    className={styles.sub_category_image}
                    src={`${process.env.REACT_APP_API_URI}${element.image}`}
                    alt={element.name_en}
                  />
                  <h3 className={styles.element_name}>{element.name_en}</h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      {/* <Sections
        data={shops}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      /> */}
    </div>
  );
};

export default SubCategory;
