// import React, { useEffect, useState } from 'react'
// import styles from "./profile.module.css"
// import { useParams, useNavigate } from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faClock, faEye , faHeart} from '@fortawesome/free-regular-svg-icons';
// import { faPhoneFlip, faLocationDot, faHeart as faHeart2, faLandmark } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
// import Footer from "../footer/Footer"
// import FormAddProduct from './formAddProduct/FormAddProduct';
// import FormUpdateProduct from '../myProfile/formUpdateProduct/FormUpdateProduct';
// import ProductInShop from "../productInShop/ProductInShop"

// const token = localStorage.getItem("find_me_token")

// const Profile = () => {
//     const {id} = useParams();
//     const navigate = useNavigate();
//     const [shops, setShops] = useState({});
//     const [products, setProducts] = useState([]);
//     const [similar, setSimilar] = useState([])
//     const [favorate, setFavorate] = useState(false)
//     const [showFormAddProduct, setShowFormAddProduct] = useState(false)
//     const [showUpdateProduct, setShowUpdateProduct] = useState(false)
//     const [state, setState] = useState(null)

//     // const handleFavoraiteClick = (id) => {
//     //     // shops[0].favorite = !shops[0].favorite
//     //     axios.post(`${process.env.REACT_APP_API_URI}api/add_product_to_favorites`,
//     //     {product_id : id},
//     //     {
//     //         headers : {
//     //             Authorization : `Bearer ${token}`
//     //         }
//     //     })
//     //     .then()
//     //     .catch(error => console.log(error))

//     //     setFavorate(!favorate)
//     // }
//     const handleFavoraiteShopClick = () => {
//         setShops({...shops, favorite : !shops.favorite})
//         axios.post(`${process.env.REACT_APP_API_URI}api/add_shop_to_favorites`,
//         {shop_id :id },
//         {headers : {
//             Authorization : `Bearer ${token}`
//         }}
//         )
//         .then(res => {
//             console.log(res.data)
//         })
//         .catch(error => console.log(error))
//         setFavorate(!favorate)
//     }

//     const handleNavigate = (id) => {
//         navigate(`/profile/${id}`)
//         window.location.reload(false)
//       }

//     // const handleDeleteProduct = (id) => {
//     //     axios.post(`${process.env.REACT_APP_API_URI}api/shop/delete_product/${id}`,{},
//     //     {
//     //         headers : {
//     //             Authorization : `Bearer ${token}`
//     //         }
//     //     }).then()
//     //     .catch(error => console.log(error))
//     //     window.location.reload(false)
//     // }

//     // console.log(shops.favorite)

//     useEffect(() => {
//         axios.get(`${process.env.REACT_APP_API_URI}api/shop/${id}`,
//         {
//             headers : {
//                 Authorization : `Bearer ${token}`
//             }
//         })
//         .then((res) => {
//             setShops(res.data.shops[0]);
//             setProducts(res.data.products)
//             setSimilar(res.data.Similar_shops)
//             console.log(res.data.products)
//         })
//         .catch(error => console.log(error))
//     }, [])

//   return (
//     <>
//         <div className={styles.profile}>
//             <div className={styles.profile_header}></div>
//             <div className="container">
//                 {
//                     shops &&
//                 <div className={styles.profile_info}>
//                     <div className={styles.profile_image}>
//                         <img
//                         src={`${process.env.REACT_APP_API_URI}${shops.image}`}
//                         alt={shops.name_en} />
//                     </div>
//                     <div className={styles.content}>
//                         <div className={styles.content_top}>
//                             <h2>{shops.name_en}</h2>
//                             {
//                                 localStorage.getItem("find_me_token") &&
//                                 <button className={styles.favorite_btn} onClick={handleFavoraiteShopClick}>
//                                     {
//                                         shops.favorite ?
//                                     <FontAwesomeIcon icon={faHeart2} style={{color : "Red", marginRight : "10px"}} />
//                                     : <FontAwesomeIcon icon={faHeart} style={{color : "red", marginRight : "10px"}} />
//                                     }
//                                     Favorite
//                                 </button>
//                             }
//                         </div>
//                         <div className={styles.content_info}>
//                             <p>
//                             <FontAwesomeIcon icon={faClock} /><span>{typeof shops.created_at === "string" ?  shops.created_at.substring(0, 10) : ""}</span>
//                             </p>
//                             <p>
//                             <FontAwesomeIcon icon={faLandmark} /><span>{typeof shops.created_at === "string" ?  shops.category.substring(0, 10) : ""}</span>
//                             </p>
//                             <p>
//                                 <FontAwesomeIcon icon={faEye} /><span>{shops.views} views</span>
//                             </p>
//                             <p>
//                                 <FontAwesomeIcon icon={faPhoneFlip} /><span>{shops.phone}</span>
//                             </p>
//                             <p>
//                                 <FontAwesomeIcon icon={faLocationDot} /><span>{shops.address}</span>
//                             </p>

//                         </div>
//                     </div>
//                     {
//                         shops.owner && <button
//                         className={styles.add_product}
//                         onClick={() => setShowFormAddProduct(!showFormAddProduct)}
//                         >Add Product</button>
//                     }
//                 </div>
//                 }
//             {products.length !== 0 ? <ProductInShop products = {products}
//                 shops = {shops}
//                 setProducts = {setProducts}
//                 setState = {setState}
//                 showUpdateProduct = {showUpdateProduct}
//                 setShowUpdateProduct = {setShowUpdateProduct}
//                 /> : <h4 style={{textAlign : "center", color : "rgb(0 5 214 / 89%)", fontSize : "32px"}}>There Is No Producte In This Shop</h4>}
//             </div>
//             {
//                 showFormAddProduct && <FormAddProduct id = {id} showFormAddProduct = {showFormAddProduct} setShowFormAddProduct = {setShowFormAddProduct} />
//             }
//             {
//                 showUpdateProduct &&
//             <FormUpdateProduct state = {state} showUpdateProduct ={ showUpdateProduct} setShowUpdateProduct ={setShowUpdateProduct} />
//             }

//             {/* handle show similar  */}
//             <h4 className={styles.similar_Shop}>Similar Shop</h4>
//   <div className={`container ${styles.section_container}`}>
//             {
//                 similar.length === 0 ? <h4 style={{color : "rgb(0 5 214 / 89%)", fontSize : "32px"}}>There Is No Similar Shop</h4> : ""
//             }
//             {similar.map(element => (
//               <div key={element.id} className={styles.card} style={{ position: 'relative', margin: '10px' }}>
//               <div className={styles.image1}>
//                 <img src={`${process.env.REACT_APP_API_URI}${element.image}`} alt="" />
//               </div>
//               <div className="col-lg-12 text-center" style={{paddingTop:'20px'}}>
//                   <h4 style={{ color: '#5F9B97' }}>{element.name_ar}</h4>
//                   <h6 style={{ color: '#5F9B97' }}>{element.name_en}</h6>
//                   <p style={{ color: '#707070', height : "50px", marginTop : "10px"}}>{element.bio}</p>
//               </div>

//               <div className="col-lg-12 text-center">
//                   <p style={{ color: '#DE9248' }}>{element.city}</p>
//                   <p style={{ color: '#DE9248', height : "50px", marginTop : "10px"}}>{element.address}</p>
//               </div>
//               <div className="col-lg-12 text-center">
//                   <p style={{ color: '#5F9B97' }}>{element.phone}</p>
//               </div>
//               <button onClick={() => handleNavigate(element.id)} className="primary_button" style={{width : "100%", borderRadius : "0"}}>Show Details</button>
//           </div>
//             ))}
//         </div>
//             <Footer />
//         </div>
//     </>
//   )
// }

// export default Profile

import React from "react";
// import styles from "./profile.module.css";
import ProfileHeader from "./profileHeader/ProfileHeader";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductInShop from "./productInShop/ProductInShop";
import SimilarShop from "./SimilarShop/SimilarShop";

const token = localStorage.getItem("find_me_token");

const Profile = () => {
  const { id } = useParams();

  const [profileInfo, setProfileInfo] = useState();
  const [profileProducts, setProfileProducts] = useState([]);
  const [similarShop, setSimilarShop] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URI}api/shop_/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setProfileInfo(res.data.shop);
        setProfileProducts(res.data.products);
        setSimilarShop(res.data.similar_shops);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div style={{ backgroundColor: "#eeeeee", minHeight: "100vh" }}>
      <div>
        <ProfileHeader
          profileInfo={profileInfo}
          setProfileInfo={setProfileInfo}
        />
      </div>
      <div
        style={{
          padding: "30px",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <h3
          style={{ fontSize: "32px", color: "#006E66", letterSpacing: "5px" }}
        >
          Products
        </h3>
      </div>
      <ProductInShop
        profileProducts={profileProducts}
        setProfileProducts={setProfileProducts}
      />
      <div
        style={{
          padding: "30px",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <h3
          style={{
            textAlign: "center",
            fontSize: "32px",
            color: "#006E66",
            letterSpacing: "5px",
          }}
        >
          Similar Shops
        </h3>
      </div>
      <SimilarShop similarShop={similarShop} setSimilarShop={setSimilarShop} />
      <div></div>
    </div>
  );
};

export default Profile;
