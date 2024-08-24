import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Sections from '../../sections/Sections'
import styles from "./Dashboard.module.css"
import { Link } from 'react-router-dom'
import Loader from "../../loader/Loader"


const token = localStorage.getItem("find_me_token")

const MyFavoriteShop = () => {

    const [favoriteShop, setFavoriteShop] = useState([])
    const [isLoading, setILoading] = useState(false)


    useEffect(() => {
        setILoading(true)
            axios.get(`${process.env.REACT_APP_API_URI}api/get_my_favorite`,
            {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            .then(res => {
                setFavoriteShop(res.data.shops)
                setILoading(false)
            })
            .catch(error => {
                console.log(error)
                setILoading(false)
            })
    }, [])

    console.log(favoriteShop)
    

  return (
    <div>
        {
            isLoading && 
            <Loader />
        }
        <div style={{minHeight : "calc(100vh - 100px)"}}>
            {
                favoriteShop.length === 0 ? 
                <div className={styles.no_favorite_shop}>
                    <Link to="/">You Have No Favorite Shop Start Adding Some</Link>
                </div>
                : 
                <>
                    <h3 className={styles.favorite_title}>Your Favorite Products</h3>
                    <Sections data = {favoriteShop} />
                </>
            }
        </div>  
    </div>
  )
}

export default MyFavoriteShop
