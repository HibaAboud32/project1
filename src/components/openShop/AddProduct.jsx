import React from "react";
import "./AddProduct.css";
import { useNavigate } from "react-router-dom";
export default function AddProduct() {
  const navigate = useNavigate();
  const handleGoToForm = () => {
    navigate("/addopenshop");
  };
  return (
    <div>
      <button class="c-button" onClick={handleGoToForm}>
        <span class="c-main">
          <span class="c-ico">
            <span class="c-blur"></span> <span class="ico-text">+</span>
          </span>
          Add
        </span>
      </button>
    </div>
  );
}
