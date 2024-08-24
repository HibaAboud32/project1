import React, { useEffect, useRef, useState } from "react";
import Styledashboard from "./Dashboard.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../../loader/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem("find_me_token");

function ShowOpenShops() {
  const navigate = useNavigate();
  const menuRefs = useRef([]); // Use an array to store refs to all menus
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Function to navigate to add product page
  const handleAddProduct = () => {
    navigate("/addopenshop");
  };

  // Function to navigate to show product details
  const handleShowProduct = (id) => {
    navigate(`/openshop/popup/${id}`);
  };

  // Toggle menu visibility
  const listClicked = (index) => {
    setProduct((prevProduct) => {
      const newData = prevProduct.map((item, i) => ({
        ...item,
        menuList: i === index ? !item.menuList : false,
      }));
      return newData;
    });
  };

  // Handle product update
  const handleUpdateProduct = (id) => {
    console.log(`Navigating to update product with ID: ${id}`)// Debugging output
    closeAllMenus(); // Close all menus before navigating
    navigate(`/formupdateproduct/${id}`);
  };

  // Handle product delete
  const handleDeleteProduct = (id) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URI}api/delete_product/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setProduct((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
    closeAllMenus();
  };

  // Close all menus
  const closeAllMenus = () => {
    setProduct((prevData) =>
      prevData.map((obj) => ({
        ...obj,
        menuList: false,
      }))
    );
  };

  // Handle click outside the menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!menuRefs.current.some((ref) => ref?.contains(e.target))) {
        closeAllMenus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch products on mount
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URI}api/my_products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProduct(
          res.data.data.map((obj) => ({
            ...obj,
            menuList: false,
          }))
        );
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="col-12 text-end" style={{ padding: "30px" }}>
        <button className="primary_button" onClick={handleAddProduct}>
          Add product
        </button>
      </div>
      <div className="col-12 text-center justify-content-center">
        <p style={{ color: "#fff", fontSize: "40px", fontWeight: "bold" }}>
          Show Your Open Shops Product
        </p>
      </div>
      <div className={Styledashboard.producs_container}>
        {isLoading ? (
          <Loader />
        ) : product.length > 0 ? (
          product.map((element, index) => (
            <div key={element.id} className={Styledashboard.product_element}>
              <div className={Styledashboard.product_element_icon}>
                <div
                  className={Styledashboard.dots}
                  onClick={() => listClicked(index)}
                  ref={(el) => (menuRefs.current[index] = el)} // Assign ref to the element
                >
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                {element.menuList && (
                  <div
                    className={Styledashboard.list_product}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div
                      className={Styledashboard.list_element}
                      onClick={() => handleUpdateProduct(element.id)}
                    >
                      <FontAwesomeIcon icon={faArrowsRotate} />
                      <p>Update</p>
                    </div>
                    <div
                      className={Styledashboard.list_element}
                      onClick={() => handleDeleteProduct(element.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                      <p>Delete</p>
                    </div>
                  </div>
                )}
              </div>
              <div className={Styledashboard.product_element_image}>
                <img
                  src={`${process.env.REACT_APP_API_URI}${element.image}`}
                  alt={element.title}
                />
              </div>
              <button
                onClick={() => handleShowProduct(element.id)}
                className="primary_button"
                style={{ marginTop: "15px" }}
              >
                Show Details
              </button>
            </div>
          ))
        ) : (
          <div className={Styledashboard.empty_shop}>
            <Link to="/shopcontact">
              You Have No Product! Start Adding Some For Free
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShowOpenShops;
