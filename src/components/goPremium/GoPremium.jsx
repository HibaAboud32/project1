import React, { useEffect, useState } from "react";
import "./goPremium.css";
import axios from "axios";

const GoPremium = () => {
  // const navigate = useNavigate();
  const [bunch, setBunch] = useState(false);
  // const [phone, setPhone] = useState("")
  // const [message, setMessage] = useState("")
  const [data, setData] = useState([]);
  const [Phone, setPhone] = useState();

  // const handleEmailClick = () => {
  //   const gmailUrl =
  //     "https://mail.google.com/mail/u/0/#inbox?compose=CllgCKCBkBJFwzwZdqXBtfTHJxsPHNBDBwtZLmzJPlWxwXqsSFFTrZxRMqCZNQTTGKQkjvCjnhg";
  //   window.open(gmailUrl, "_blank");
  // };

  const handleGoPrem = () => {
    setBunch(!bunch);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URI}api/plans_cards`)
      .then((res) => {
        // setPhone(res.data.phone)
        // setMessage(res.data.msg)
        setData(res.data.data);
        setPhone(res.data.phone);
      })
      .catch((error) => console.log(error));
  }, []);

  // console.log("go prem component");

  return (
    <>
      <div className="go-premium">
        <p className="go-premium-text">
          Join <span> </span>premium With <span>50%</span>OFF
        </p>
        <button className="go-preium-btn" onClick={handleGoPrem}>
          Go Premium
        </button>
      </div>
      <div>
        <div className="container">
          <div className="bunch">
            {data.map((element) => (
              <div
                key={element.id}
                className={`bunch_card ${bunch ? "bunch_card_show" : ""}`}
              >
                <span></span>
                <h3 className="bunch_name">{element.name}</h3>
                <p>Price : {element.price}</p>
                <p>Duration : {element.duration}</p>
                <p>
                  Products limit per month : {element.products_limit_per_month}
                </p>
                <p>
                  Images count per product : {element.images_count_per_product}
                </p>
                <p>Advertise Count : {element.ads_count}</p>
                <div className="contact_element"></div>
                <div className="contact_element">
                  <img src="/assets/socialmedia/telephone.png" alt="" />

                  <p>{Phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(GoPremium);
