import React from "react";
import styles from "./shopContact.module.css";
import ReactWhatsapp from "react-whatsapp";

const ShopContact = () => {
  const message =
    "Hello, I would like to subscribe and create my online store. ";

  return (
    <>
      <div className={styles.shop_contact}>
        <div className={styles.image}>
          <img src="/assets/find-me-icon100.png" alt="" />
        </div>
        <div className={styles.contact}>
          <img src="/assets/find-me-logo.png" alt="Logo" />
          <h4>
            {" "}
            Create your online store to display your products <br></br>{" "}
          </h4>
          <div className={styles.contact_element}>
            <ReactWhatsapp number="+963989737475 " message={message}>
              <img src="/assets/socialmedia/whatsapp.png" alt="" />
            </ReactWhatsapp>
            <p> Send us a WhatsApp message </p>
          </div>
          <div className={styles.contact_element}>
            <img src="/assets/socialmedia/message.png" alt="" />
            <p>Send us an email </p>
          </div>
          <div className={styles.contact_element}>
            <img src="/assets/socialmedia/telephone.png" alt="" />
            <p> Or </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopContact;
