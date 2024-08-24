import React, { useState } from "react";
import "./productInShop.css";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeart2 } from "@fortawesome/free-solid-svg-icons";

const token = localStorage.getItem("find_me_token");

const ProductInShop = ({
  products,
  setProducts,
  shops,
  setState,
  showUpdateProduct,
  setShowUpdateProduct,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const handleUpdateProduct = (id) => {
    setState(id);
    setShowUpdateProduct(!showUpdateProduct);
  };

  const handleDeleteProduct = (id) => {
    axios
      .post(`${process.env.REACT_APP_API_URI}api/shop/delete_product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => window.location.reload(false))
      .catch((error) => console.log(error));
  };

  const handleFavoriteProductClick = (index, id) => {
    setProducts(
      [...products],
      (products[index].favorite = !products[index].favorite)
    );
    axios
      .post(
        `${process.env.REACT_APP_API_URI}api/add_product_to_favorites`,
        {
          product_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(products);

  return (
    <div className="our-plan">
      <div className="container">
        <div className="boxes">
          {products &&
            products.map((element, index) => (
              <div key={element.id} className="box">
                <Swiper
                  style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                  }}
                  loop={true}
                  spaceBetween={1}
                  navigation={true}
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper2"
                >
                  {element.images &&
                    element.images.map((element, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={`${process.env.REACT_APP_API_URI}${element}`}
                          alt=""
                        />
                      </SwiperSlide>
                    ))}
                </Swiper>
                <Swiper
                  onSwiper={setThumbsSwiper}
                  loop={true}
                  spaceBetween={1}
                  slidesPerView={2}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper myswiper_slide_one"
                >
                  {element.images_ &&
                    element.images_.map((element, index) => (
                      <SwiperSlide key={index} className="swiper_slide_sub">
                        <img
                          src={`${process.env.REACT_APP_API_URI}${element}`}
                          alt=""
                        />
                      </SwiperSlide>
                    ))}
                </Swiper>
                <h3 className="h3_name_ar">{element.name_ar}</h3>
                <h3 className="h3_name_en">{element.name_en}</h3>
                <p className="price">{element.current_price}</p>
                <p className="old_price">{element.old_price}</p>
                <p className="product_in_shop_des">{element.description_en}</p>
                <p className="product_in_shop_des">{element.description_ar}</p>
                <div className="favorite_product">
                  <button
                    onClick={() =>
                      handleFavoriteProductClick(index, element.id)
                    }
                  >
                    {element.favorite ? (
                      <FontAwesomeIcon
                        icon={faHeart2}
                        style={{ color: "Red", marginRight: "10px" }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faHeart}
                        style={{ color: "red", marginRight: "10px" }}
                      />
                    )}
                    Favorite
                  </button>
                </div>
                {shops[0]
                  ? shops[0].owner && (
                      <div className="update_delete_product">
                        <button
                          className="update_product"
                          onClick={() => handleUpdateProduct(element.id)}
                        >
                          Update Product
                        </button>
                        <button
                          className="delete_product"
                          onClick={() => handleDeleteProduct(element.id)}
                        >
                          Delete Product
                        </button>
                      </div>
                    )
                  : ""}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductInShop;
