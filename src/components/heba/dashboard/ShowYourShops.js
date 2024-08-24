import React, { useEffect, useState } from "react";
import Styledashboard from './Dashboard.module.css';
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loader from "../../loader/Loader"



const token = localStorage.getItem("find_me_token")

function ShowYourShops() {
    const navigate = useNavigate();

    const [myShops, setMyShops] = useState([])
    const [isLoading, setIsLoading] = useState(false)




    const handleNavigate = () => {
        navigate("/shopcontact")
    }

    const handleNavigateToShop = (id) => {
        navigate(`/profile/${id}`)
    }

    useEffect(() => {
        setIsLoading(true)
        axios.get(`${process.env.REACT_APP_API_URI}api/my_shops`,
        {
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        .then(res => {
            console.log(res.data.data)
            setMyShops(res.data.data)
            setIsLoading(false)
        })
        .catch(error => {
            console.log(error)
            setIsLoading(false)
    })
    }, [])



    return (
        <>
                <div className='col-12  text-end' style={{ padding: '30px' }}>
                    <button className="primary_button" onClick={handleNavigate}> Add shop</button>
                </div>

                <div className="col-12 text-center justify-content-center">
                    <p style={{ color: '#fff', fontSize: '40px', fontWeight : "bold" }}>Show Your Shops</p>
                </div>

                {
                    myShops.length !== 0 ? 
                <div className={Styledashboard.shop}>
                            {
                                myShops.map(element => (
                                    <div key={element.id} className={Styledashboard.shop_image} onClick={() => handleNavigateToShop(element.id)}> 
                                        <img src={`${process.env.REACT_APP_API_URI}${element.image}`} style={{ width: '250px', height: '250px', borderRadius: '30px' }} alt=""></img>
                                    </div>
                                ))
                            }  
                </div>
                :
                <div className={Styledashboard.empty_shop} style={{position : "relative"}}>
                    {
                        isLoading &&
                        <Loader />
                    }
                    <Link to="/shopcontact">You Have No Shop! Contact Us to Add One </Link>
                </div>
                }
        </>
    );
}

export default ShowYourShops;