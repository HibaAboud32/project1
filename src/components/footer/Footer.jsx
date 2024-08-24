import React from "react";
import "./footer.css";

const Footer = () => {
  // console.log("footer component");

  return (
    <div className="footer">
      <div className="container footer-container">
        <div className="footer-downloadapp">
          <div className="footer-socialmedia">
            <a href="#">
              <img src="/assets/android.png" alt="" />
            </a>
            <a href="#">
              <img src="/assets/apple_store.png" alt="" />
            </a>
          </div>
          <div className="copy-right">
            <p>
              This website is made by{" "}
              <a href="https://focustradingcompany.com/">
                Focus Trading Company
              </a>{" "}
              &copy; 2022 ,all right reserved.
            </p>
          </div>
          <div className="footer-socialmedia">
            <a href="/">
              <img src="/assets/socialmedia/facebook.png" alt="" />
            </a>
            <a href="/">
              <img src="/assets/socialmedia/instagram.png" alt="" />
            </a>
            <a href="/">
              <img src="/assets/socialmedia/tiktok.png" alt="" />
            </a>
            <a href="/">
              <img src="/assets/socialmedia/whatsapp.png" alt="" />
            </a>
            <a href="/">
              <img src="/assets/socialmedia/youtube.png" alt="" />
            </a>
            <a href="/">
              <img src="/assets/socialmedia/twitter.png" alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Footer);
