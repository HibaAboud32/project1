import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import styles from "./openAddProduct.module.css"
import Loader from "../../../loader/Loader"

const token = localStorage.getItem("find_me_token");

const OpenAddProduct = ({ setAddProduct, addProduct}) => {

    const backdropRef = useRef(null)

    const [cities, setCities] = useState([])

    const[name_en,setName_en] = useState('')
    const[name_ar,setName_ar] = useState('')
    const[description_en,setDescription_en] = useState('')
    const[description_ar,setDescription_ar] = useState('')
    const[image,setImage] = useState('')
    const[price,setPrice] = useState('')
    const[phone,setPhone] = useState('')
    const[location,setLocation] = useState('')
    const[city,setCity] = useState('الجميع')
    //state to handle error message and lodaing spiner
    const [errorMsg, setErrorMsg] = useState("");
    // state to handle spinner loading 
    const [isLoading, setIsLoading] = useState(false)

    const changeHandler = (e) => {
        setImage(e.target.files[0]);
    }

    async function addProducte(e) {
        e.preventDefault();
        setIsLoading(true)
        const formData = new FormData();
        formData.append('name_en', name_en);
        formData.append('name_ar', name_ar);
        formData.append('description_en', description_en);
        formData.append('description_ar', description_ar);
        formData.append('image', image);
        formData.append('current_price', price);
        formData.append('phone', phone);
        formData.append('location', location);
        formData.append('city', city);

        await axios.post(`${process.env.REACT_APP_API_URI}api/add_product`, formData,
        {
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        .then(res => {
            if(!res.data.status){
                setErrorMsg(res.data.message)
            }else{
            setAddProduct(false)
            window.location.reload(false)
            }
        })
        .catch(error => {
            // setErrorMsg(error.message)
            console.log(error)}
            )

        setIsLoading(false)
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URI}api/cities`)
        .then(res => setCities(res.data.data))
        .catch(error => console.log(error))
    }, [])

    useEffect(() => {

    }, [])


  return (
    <>
    {
        isLoading &&<>
        <Loader />
        </>
    }
        <div className={styles.form_add_product}>
            <div onClick={() => setAddProduct(false)} className={styles.backdrop}></div>
            <div className={`${styles.add_product_container} container`}>
            <div className={styles.x_btn} onClick={() => setAddProduct(!addProduct)} >X</div>
                <h3 className={styles.create_product}>Add Product</h3>
                <hr  />
                {/* errormessage */}
                <p className={errorMsg ? styles.error_msg : styles.offScreen} aria-live="assertive">{errorMsg}</p>
                <form onSubmit={addProducte} className={styles.form_add}>
                    <div className={styles.input_container}>
                        <label>Name Arabic</label>
                        <input type="text" placeholder='Name Arabic' value={name_ar} onChange={e => setName_ar(e.target.value)} required />
                    </div>
                    <div className={styles.input_container}>
                        <label>Name English</label>
                        <input type="text" placeholder='Name English' value={name_en} onChange={e => setName_en(e.target.value)} required />
                    </div>
                    <div className={styles.input_container}>
                        <label>Current Price</label>
                        <input type="text" placeholder='Current Price' value={price} onChange={e => setPrice(e.target.value)} required />
                    </div>
                    <div className={styles.input_container}>
                        <label>Select City</label>
                        <select name="city" id="city" onChange={e => setCity(e.target.value)} required>
                            {
                                cities.map((element, index) => (
                                    <option className={styles.option} key={index} value={element}>{element}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className={styles.input_container}>
                        <label>Location</label>
                        <input type="text" placeholder='Location' value={location} onChange={e => setLocation(e.target.value)} required />
                    </div>
                    <div className={styles.input_container}>
                        <label>Phone</label>
                        <input type="text" placeholder='Phone' value={phone} onChange={e => setPhone(e.target.value)} required />
                    </div>
                    <div className={styles.input_container}>
                        <label>Description Arabic</label>
                        <textarea placeholder='Description Arabic' value={description_ar} onChange={e => setDescription_ar(e.target.value)} required></textarea>
                    </div>
                    <div className={styles.input_container}>
                        <label>Description English</label>
                        <textarea placeholder='Description English' value={description_en} onChange={e => setDescription_en(e.target.value)} required></textarea>
                    </div>
                    <div className={styles.input_container}>
                        <label>Select Image</label>
                        <input onChange={(e) => changeHandler(e)} type="file" className="custom-file-input" required />
                    </div>
                    <button className={styles.submit_btn} type='submit'>Submit</button>
                </form>
            </div>
        </div>
    </>
  )
}

export default OpenAddProduct
