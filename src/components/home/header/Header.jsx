import axios from "axios";
import { useEffect, useState } from "react";
import AdvertiseTwo from "../../advertisetwo/AdvertiseTwo";
import Category from "../../category/Category";
import "./header.css";
import Sections from "../../sections/Sections";
import Offers from "../../Offers/Offers";

function Header() {
  //state to store shops and information to send it to component section that show shop
  const [data, setData] = useState([]);
  const [btnNumber, setBtnNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [homeAds, setHomeAds] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_API_URI}api/popular_shops_?counter=${currentPage}`
      )
      .then((res) => {
        setIsLoading(false);
        setData(res.data.data);
        setBtnNumber(res.data.pages_number);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage]);

  //useEffect to fetch advertise

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URI}api/home_Ads`)
      .then((res) => setHomeAds(res.data.data))
      .catch((error) => console.log(error));
  }, []);

  // console.log("Done");

  return (
    <>
      <div className="home" style={{ minHeight: "calc(100vh - 135px)" }}>
        <div style={{ backgroundColor: "#F5F5F5" }}>
          <AdvertiseTwo homeAds={homeAds} width={"100%"} />
          {/* <AdvertiseTwo homeAds={homeAds} dir="rtl" width={"70%"} /> */}
          <Category />
        </div>
        {/* <GoPremium /> */}
        <h2
          className="show_shops"
          style={{
            padding: "30px",
            display: "flex",
            justifyContent: "flex-start",
            fontSize: "32px",
            letterSpacing: "5px",
          }}
        >
          Offers
        </h2>
        <Offers data={data} />
        <h2
          className="show_shops"
          style={{
            padding: "30px",
            display: "flex",
            justifyContent: "flex-start",
            fontSize: "32px",
            letterSpacing: "5px",
          }}
        >
          Shops
        </h2>
        <Sections
          isLoading={isLoading}
          data={data}
          btnNumber={btnNumber}
          setBtnNumber={setBtnNumber}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
}

export default Header;
