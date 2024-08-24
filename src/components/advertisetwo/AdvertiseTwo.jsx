import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./advertiseTwo.css";
import { Autoplay, Pagination, Navigation } from "swiper";

export default function AdvertiseTwo({ homeAds, dir, width }) {
  // console.log("advertise two component");

  return (
    <div className="advertise_two" style={{ width: width }}>
      {/* <div className="container"> */}
      {homeAds.length === 0 ? (
        ""
      ) : (
        <Swiper
          dir={dir || "ltr"}
          spaceBetween={30}
          centeredSlides={true}
          loop
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {homeAds.map((element) => (
            <SwiperSlide key={element.id}>
              <img
                src={`${process.env.REACT_APP_API_URI}${element.image}`}
                alt=""
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {/* </div> */}
    </div>
  );
}
