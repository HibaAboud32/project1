// import axios from 'axios'
// import React, { useState } from 'react'
// import styles from "./formUpdateProduct.module.css"

// const token = localStorage.getItem("token");

// const FormUpdateProduct = ({ setShowUpdateProduct, showUpdateProduct, state}) => {

//     const[name_en,setName_en] = useState('')
//     const[name_ar,setName_ar] = useState('')
//     const[description_en,setDescription_en] = useState('')
//     const[description_ar,setDescription_ar] = useState('')
//     const[image,setImage] = useState('')
//     const[price,setPrice] = useState('')

//     const changeHandler = (e) => {
//         setImage(e.target.files[0]);
//     }

//     async function updateProduct(e) {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('name_en', name_en);
//         formData.append('name_ar', name_ar);
//         formData.append('description_en', description_en);
//         formData.append('description_ar', description_ar);
//         formData.append('main_image', image);
//         formData.append('current_price', price);

//         console.log('name_en', name_en,'description_en', description_en )

//         await axios.post(`${process.env.REACT_APP_API_URI}api/shop/update_product/${state}`, formData,
//         {
//             headers : {
//                 Authorization : `Bearer ${token}`
//             }
//         })
//         .then(res => {
//             window.location.reload(false)    
//         })
//         .catch(error => console.log(error))

//             setShowUpdateProduct(false)


//     }


//   return (
//     <>
//         <div className={styles.form_add_product}>
//             <div className={styles.backdrop}></div>
//             <div className={`${styles.add_product_container} container`}>
//             <div className={styles.x_btn} onClick={() => setShowUpdateProduct(!showUpdateProduct)} >X</div>
//                 <h3 className={styles.create_product}>Update Product</h3>
//                 <hr  />
//                 <form onSubmit={updateProduct}>
//                     <div className={styles.input_container}>
//                         <label>Name Arabic</label>
//                         <input type="text" placeholder='Name Arabic' value={name_ar} onChange={e => setName_ar(e.target.value)} required />
//                     </div>
//                     <div className={styles.input_container}>
//                         <label>Name English</label>
//                         <input type="text" placeholder='Name English' value={name_en} onChange={e => setName_en(e.target.value)} required />
//                     </div>
//                     <div className={styles.input_container}>
//                         <label>Current Price</label>
//                         <input type="text" placeholder='Current Price' value={price} onChange={e => setPrice(e.target.value)} required />
//                     </div>
//                     <div className={styles.input_container}>
//                         <label>Description Arabic</label>
//                         <textarea placeholder='Description Arabic' value={description_ar} onChange={e => setDescription_ar(e.target.value)} required></textarea>
//                     </div>
//                     <div className={styles.input_container}>
//                         <label>Description English</label>
//                         <textarea placeholder='Description English' value={description_en} onChange={e => setDescription_en(e.target.value)} required></textarea>
//                     </div>
//                     <div className={styles.input_container}>
//                         <label>Select Image</label>
//                         <input onChange={(e) => changeHandler(e)} type="file" className="custom-file-input" required />
//                     </div>
//                     <button className={styles.submit_btn} type='submit'>Submit</button>
//                 </form>
//             </div>
//         </div>
//     </>
//   )
// }

// export default FormUpdateProduct




import axios from 'axios'
import React, { useState } from 'react'
import styles from "./formUpdateProduct.module.css"
import Loader from "../../loader/Loader"

const token = localStorage.getItem("find_me_token");

const FormUpdateProduct = ({ state, showUpdateProduct, setShowUpdateProduct}) => {



    const[name_en,setName_en] = useState('')
    const[name_ar,setName_ar] = useState('')
    const[description_en,setDescription_en] = useState('')
    const[description_ar,setDescription_ar] = useState('')
    const[image,setImage] = useState('')
    const[price,setPrice] = useState('')
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

        await axios.post(`${process.env.REACT_APP_API_URI}api/shop/update_product/${state}`, formData,
        {
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        .then(res => {
            if(!res.data.status){
                setErrorMsg(res.data.message)
            }else{
                setShowUpdateProduct(false)
            window.location.reload(false)
            }
        })
        .catch(error => {
            // setErrorMsg(error.message)
            console.log(error)}
            )
            setIsLoading(false)
    }





  return (
    <>
    {
        isLoading &&<>
        <Loader />
        </>
    }
        <div className={styles.form_add_product}>
            <div onClick={() => setShowUpdateProduct(false)} className={styles.backdrop}></div>
            <div className={`${styles.add_product_container} container`}>
            <div className={styles.x_btn} onClick={() => setShowUpdateProduct(!showUpdateProduct)} >X</div>
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

export default FormUpdateProduct
