import axios from "axios";
import React, { useEffect, useState } from "react";
import AdvertiseTwo from "../advertisetwo/AdvertiseTwo";
import styles from "./openShop.module.css";
import { useNavigate, useLocation } from "react-router-dom";
// import SearchOpenShopInput from "./searchOpenShop/search/SearchOpenShopInput";
import CounterButton from "../counterButton/CounterButton";
import AddProduct from "./AddProduct";
const token = localStorage.getItem("find_me_token");

const OpenShop = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [homeAds, setHomeAds] = useState([]);
  const [openShopProduct, setOpenShopProduct] = useState([]);
  // const [openShopProduct2, setOpenShopProduct2] = useState([]);

  //logic to handle button load more and less
  const [btnNumber, setBtnNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handleShowPopup = (id) => {
    navigate(`popup/${id}`);
  };

  useEffect(() => {
    //fetch advertise for openshop
    axios
      .get(`${process.env.REACT_APP_API_URI}api/open_shop_Ads`)
      .then((res) => {
        setHomeAds(res.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  //is loading to handle loader to job company
  const [isLoadingOpenshop, setIsLoadingOpenshop] = useState(false);

  useEffect(() => {
    //open shop product
    setIsLoadingOpenshop(true);
    axios
      .get(
        `${process.env.REACT_APP_API_URI}api/openshops?counter=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setOpenShopProduct(res.data.data);
        // setOpenShopProduct2(res.data.data);
        setBtnNumber(res.data.pages_number);
        setIsLoadingOpenshop(false);
      })
      .catch((error) => console.log(error));
  }, [currentPage]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get("page"));
    if (!isNaN(page) && page > 0) {
      setCurrentPage(page);
    }
  }, [location.search]);

  return (
    <>
      <div
        style={{
          position: "relative",
          // background: "#C7E8E6",
          minHeight: "calc(100vh - 135px)",
        }}
      >
        <div style={{ backgroundColor: "#f5f5f5" }}>
          <AdvertiseTwo width="100%" homeAds={homeAds} />
        </div>

        <div
          style={{
            padding: "10px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <AddProduct />
        </div>

        <div className={styles.open_shop}>
          <div className={`${styles.open_shop_container} container`}>
            {!isLoadingOpenshop &&
              openShopProduct.map((element) => (
                <div key={element.id} className={styles.open_shop_card}>
                  <div className={styles.open_shop_img}>
                    <img
                      src={`${process.env.REACT_APP_API_URI}${element.image}`}
                      alt={element.name_en}
                      onClick={() => handleShowPopup(element.id)}
                    />
                  </div>
                  <div className={styles.open_shop_content}>
                    <h3 className={styles.title}>{element.name_en}</h3>
                    <p className={styles.description}>
                      {element.current_price}
                    </p>
                  </div>
                  <button
                    onClick={() => handleShowPopup(element.id)}
                    className="primary_button"
                  >
                    Show Details
                  </button>
                </div>
              ))}
          </div>
          <CounterButton
            isLoading={isLoadingOpenshop}
            btnNumber={btnNumber}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
};

export default OpenShop;
