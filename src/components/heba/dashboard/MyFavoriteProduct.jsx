import React from 'react'
import ProductInShop from '../../productInShop/ProductInShop'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import styles from "./Dashboard.module.css"
import { Link } from 'react-router-dom'
import Loader from '../../loader/Loader'

const token = localStorage.getItem("find_me_token")

const MyFavoriteProduct = () => {

    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [shops, setShops] = useState([])

    useEffect(() => {
        setIsLoading(true)
        axios.get(`${process.env.REACT_APP_API_URI}api/get_my_favorite`, 
        {
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        .then(res => {
            setProducts(res.data.products)
            setIsLoading(false)
        })
        .catch(error => {
            console.log(error)
            setIsLoading(false)
        })
    }, [])



  return (
    <div>
                {
            isLoading && 
            <Loader />
        }
        <div style={{minHeight : "calc(100vh - 100px)"}}>
            {
                products.length === 0 ? 
                <div className={styles.no_favorite_product}>
                    <Link to="/">You Have No Favorite Product Start Adding Some</Link>
                </div>
                : 
                <>
                    <h3 className={styles.favorite_title}>Your Favorite Products</h3>
                    <ProductInShop setProducts = {setProducts} products = {products} shops = {shops}  />
                </>
            }
        </div>
    </div>
  )
}

export default MyFavoriteProduct
