import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./contactUs.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ContactUs = () => {
  const form = useRef();
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Message, setMessage] = useState("");
  const [Phone, setPhone] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_dwpn74x",
        "template_jf8f0cp",
        form.current,
        "FjyaUwYaMFEebx_vB"
      )
      .then(
        (result) => {
          console.log("SUCCESS!", result.text);
          toast.success("Message Sent Successfully!");
          setPhone("");
          setMessage("");
          setEmail("");
          setName("");
          form.current.reset();
        },
        (error) => {
          console.log("FAILED...", error.text);
          toast.error("Failed to send message. Please try again later.");
        }
      );
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <form ref={form} onSubmit={sendEmail} className="contactForm">
        <label>Name</label>
        <input
          type="text"
          name="user_name"
          value={Name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Enter Your Name"
          required
        />
        <label>Email</label>
        <input
          type="email"
          name="user_email"
          value={Email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Enter Your Email"
          required
        />
        <label>Phone</label>
        <input
          type="phone"
          name="user_phone"
          value={Phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          placeholder="Enter Your phone"
          required
        />
        <label>Message</label>
        <textarea
          name="message"
          placeholder="Enter Your Message"
          value={Message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          required
        />
        <button type="submit" className="primary_button">
          Send Message
        </button>
      </form>
    </div>
  );
};
