import React from "react";
import { useLocation } from "react-router-dom";

export default function ProductDetail() {
  const location = useLocation();
  const { profileProducts = [], setProfileProducts = () => {} } = location.state || {};

  if (!profileProducts || !setProfileProducts) {
    // Handle the case when state is not available
    // For example, redirect to an error page or display a message
    return <div>No product detail available.</div>;
  }
console.log(location.state )
  return (
    <div className="ProductDet">
      {profileProducts && profileProducts.map((item) => (
        <div className="Detail" key={item.id}>
          <div className="MainImg">
            <img src={item.main_image} alt=""></img>
            <p>{item.description_en}</p>
          </div>
        </div>
      ))}
    </div>
  );
}