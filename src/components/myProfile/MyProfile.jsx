import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Sections from '../sections/Sections';
import "./myProfile.css"
import MyShops from './myShops/MyShops';
import { useDetectOutsideClick } from "./useDetectOutsideClick";
import ProductInShop from '../productInShop/ProductInShop';
import Loader from '../loader/Loader';



const token = localStorage.getItem("find_me_token");

const MyProfile = () => {

    const navigate = useNavigate();


    const [userInfo, setUserInfo] = useState([])//store user information
    const [image, setImage] = useState('')//store image
    const [shops, setShops] = useState([]);//store market shop
    const [openShop, setOpenShop] = useState([])//store open shop
    const [newInfo, setNewInfo] = useState({
        name : "",
        phone : "",
    });
    const [favoriteShop, setFavoriteShop] = useState([])
    const [favoriteProduct, setFavoriteProduct] = useState([])
    //logic to open and close dropdown
    const dropdownRef = useRef(null);
    const iconRef = useRef(null);
    const [isActive, setIsActive] = useState(false)

    const onClick = () => {
        // if(isActive){
            setIsActive(!isActive)
        // }
    }

    const handleClick = (e) => {
        if(!isActive){
            setIsActive(!isActive)
        }
        // if(e.target)
        
    }
    // const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

    
    useEffect(() => {
            if(isActive){
                document.body.addEventListener("click", onClick, true)
            }
            // return () => {
            //     document.body.removeEventListener("click", onClick, true)
            // }
    }, [isActive])

    //end

    //state to loading spinner
    const [isLoading, setIsLoading] = useState(false)

    //change input value

    const handleChange = (e) => {
        setNewInfo({...newInfo, [e.target.name] : e.target.value})
    }
    //end

    //image change
    const handleImageChange = (e) => {
        setImage(e.target.files[0])
    }
    //end


    //send data to api to update data
    const handleUpdateData = () => {
        setIsLoading(true)
        const formData = new FormData();
        formData.append("image", image)
        formData.append("name" , newInfo.name)
        formData.append("phone" , newInfo.phone)

        axios.post(`${process.env.REACT_APP_API_URI}api/update_profile`,
            formData
        ,
        {
            headers : {
                'Content-Type': 'multipart/form-data',
                Authorization : `Bearer ${token}`,
            }
        })
        .then(res => {
            setIsLoading(false)
            setUserInfo(res.data.user)
            })
        .catch(error => {
            setIsLoading(false)
            console.log(error)});

            setIsActive(!isActive)
    }
    //end

    //logout logic
    const handleLogout = () => {
        setIsLoading(true)
        axios.post(`${process.env.REACT_APP_API_URI}api/logout`,{},
        {
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        .then(() => {
            setIsLoading(false)
            localStorage.removeItem("find_me_token");
            localStorage.removeItem("userId");
            navigate("/")
            window.location.reload(false)
        })
        .catch(error => {
            setIsLoading(false)
            console.log(error)});
        setIsActive(!isActive)

    }

    //delete account logic
    const handleDeleteAccount = () => {
        setIsLoading(true)
        axios.post(`${process.env.REACT_APP_API_URI}api/userDelete`,
        {},
        {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }
        ).then(() => {
            setIsLoading(true)
            localStorage.removeItem("find_me_token")
            localStorage.removeItem("userId")
            navigate("/")
            window.location.reload(false)
        })
        .catch(error => {
            setIsLoading(true)
            console.log(error)})
        setIsActive(!isActive)
    }
    



    // useEffect(() => {

    //     //fetch my profile info
    //     axios.get(`${process.env.REACT_APP_API_URI}api/myprofile`, 
    //     {
    //         headers : {
    //             Authorization : `Bearer ${token}`
    //         }
    //     }
    //     )
    //     .then(res => {
    //         setUserInfo(res.data.user)
    //     })
    //     .catch(error => console.log(error))

    //     //fetch my shop store

    //     axios.get(`${process.env.REACT_APP_API_URI}api/my_shops`,
    //     {
    //         headers : {
    //         Authorization : `Bearer ${token}`
    //     }
    // }
    //     )
    //     .then(res => {
    //         setShops(res.data.data)    
    //     })
    //     .catch(error => console.log(error))

    //     //fetch my open shop product
    //     axios.get(`${process.env.REACT_APP_API_URI}api/my_products`,
    //     {
    //         headers : {
    //             Authorization : `Bearer ${token}`
    //         }
    //     })
    //     .then(res => {
    //         setOpenShop(res.data.data)
    //     }).catch(error => console.log(error))

    //     //fetch my favorite shop
    //     axios.get(`${process.env.REACT_APP_API_URI}api/get_my_favorite`, 
    //     {
    //         headers : {
    //             Authorization : `Bearer ${token}`
    //         }
    //     }).then(res => {
    //     setFavoriteShop(res.data.shops)
    //     setFavoriteProduct(res.data.products)
    //     })
    //     .catch(error => console.log(error))
        
    // }, [])

    // console.log(iconRef.current.className)


  return (
    <div className="myProfile">
        {
            isLoading &&<>
            <Loader />
            </>
        }
      <div className="container my_profile_container">
        <div className="header">
            <div className="header_image">
                <img src={`${process.env.REACT_APP_API_URI}${userInfo.image}`} alt="" />
            </div>
            <div className="header_info">
                <div><input type="text" name='name' placeholder='your name' value={newInfo.name} onChange={e => handleChange(e)} /></div>
                <div><input type="text" name='phone' placeholder='your number' value={newInfo.phone} onChange={e => handleChange(e)} /></div>
                <div>
                    <input className='input_file' type="file" id='file' name='file' onChange={(e) => handleImageChange(e)} />
                </div>
            </div>
            <div className="bollet_list">
            <div className="container">
                <div className="menu-container">
                    <button
                      className="menu-trigger"
                      ref={iconRef}
                      onClick={handleClick}>
                        <span>{userInfo.name}</span>
                        <img
                            src={`${process.env.REACT_APP_API_URI}${userInfo.image}`}
                            alt="User avatar"
                            style={{"width" : "32px", "height" : "32px", "objectFit" : "cover"}}
                        />
                    </button>
                    <nav
                        ref={dropdownRef}
                        className={`menu ${isActive ? "active" : "inactive"}`}
                        >
                        <ul>
                            <li>
                            <button onClick={handleUpdateData}>Update</button>
                            </li>
                            <li>
                            <button onClick={handleLogout}>Logout</button>
                            </li>
                            <li>
                            <button onClick={handleDeleteAccount} style={{backgroundColor : "red"}}>Delete Account</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
        </div>
      </div>
      <h2 style={{fontSize : "32px", color : "#fff",textAlign : "center", marginTop : "30px"}}>My Shops</h2>
        <Sections sections = {shops} />
        <br />
        <h2 style={{fontSize : "32px", color : "#fff",textAlign : "center", marginTop : "30px"}}>My Open Shop Product</h2>
        <MyShops openShop={openShop} />
        <br />
        <h2 style={{fontSize : "32px", color : "#fff",textAlign : "center", marginTop : "30px"}}>My Favorite Shops</h2>
        <Sections sections = {favoriteShop} />
        <br />
        <h2 style={{fontSize : "32px", color : "#fff",textAlign : "center", marginTop : "30px"}}>My Favorite Product</h2>
        <ProductInShop products = {favoriteProduct} shops = {shops} />
    </div>
  )
}

export default MyProfile
