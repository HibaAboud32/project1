import axios from 'axios';
import React, { useState } from 'react'
import styles from "./myShops.module.css"
import OpenAddProduct from './openAddProduct/OpenAddProduct';
import UpdateOpenMarket from './updateOpenMarket/UpdateOpenMarket'
import Loader from '../../loader/Loader';


const token = localStorage.getItem("find_me_token")

const MyShops = ({openShop}) => {
    const [openUpdateProduct, setOpenUpdateProduct] = useState(false);
    const [indexUpdateProduct, setIndexUpdayeProduct] = useState(null)
    const [state, setState] = useState(null)
    const [addProduct, setAddProduct] = useState(false)
    // state to loading
    const [isLoading, setIsLoading] = useState(false)




    const handleUpdateProduct = (id, index) => {
        setOpenUpdateProduct(!openUpdateProduct)
        setState(id)
        setIndexUpdayeProduct(index)
    }

    const handleDeleteProduct = (id) => {
        setIsLoading(true)
        axios.post(`${process.env.REACT_APP_API_URI}api/delete_product/${id}`,{},
        {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }).then(res => {
            setIsLoading(false)
            window.location.reload(false)    
        })
        .catch(error => {
            console.log(error)
            setIsLoading(false)
            
        })
        
    }

    const handleAddProduct = () => {
        setAddProduct(!addProduct)
    }


  return (
    <div className={styles.shops}>
        <div className={`${styles.shops_container} container`}>
            <button onClick={handleAddProduct} className={styles.add_product_btn}>add product</button>
            <div className={styles.my_shops_container}>
                {
                    openShop &&
                    openShop.map((element, index) => (
                        <div key={element.id} className={styles.shop}>
                            <div className={styles.shops_image}>
                                <img src={`${process.env.REACT_APP_API_URI}${element.image}`} alt="" />
                            </div>
                            <div className={styles.shops_content}>
                                <div className={styles.name}>
                                    <p>{element.name_en}</p>
                                    <p>{element.name_ar}</p>
                                </div>
                                <div className={styles.price}>
                                    <p>{element.current_price}</p>
                                    <p>{element.old_price}</p>
                                </div>
                                <div className={styles.more_info}>
                                    <p>{element.location}</p>
                                    <p>{element.phone}</p>
                                    <p>{element.bio}</p>
                                    <p>Views : {element.views}</p>
                                </div>
                                <div className={styles.update_delete_btn}>
                                    <button onClick={() => handleUpdateProduct(element.id, index)} className={styles.btn}>update Product</button>
                                    <button className={styles.btn} onClick={() => handleDeleteProduct(element.id)}>Delete Product</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
                {
                    openUpdateProduct && 
                    <UpdateOpenMarket
                    indexUpdateProduct  = {indexUpdateProduct}
                    state = {state}
                    openUpdateProduct = {openUpdateProduct}
                    setOpenUpdateProduct = {setOpenUpdateProduct}
                    openShop = {openShop}
                    />
                }
                {
                    addProduct && <OpenAddProduct addProduct = {addProduct} setAddProduct = {setAddProduct} />
                }
            </div>
        </div>
        {
            isLoading && <Loader />
        }
    </div>
  )
}

export default MyShops
