import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../../../loader/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';

const token = localStorage.getItem("find_me_token")

function UpdateOpenShopProduct(){
    const {id} = useParams();

    //state to store product information
    const [productInfo, setProductInfo] = useState()


  const [nameAr, setNameAr] = useState("")
  const [titleEn, setTitleEn] = useState("")
  const [requirementsAr, setRequirementsAr] = useState("")
  const [requirementsEn, setRequirementsEn] = useState("")
  const [location, setLocation] = useState("")
  const [phone, setPhone] = useState("")
  const [currentPrice, setCurrentPrice] = useState("")
  const [city, setCity] = useState("")
  const [image, setImage] = useState("")

  //state to handle succes message
  const [succesAddJob, setSuccessAddJob] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)



  const handleSaveFile = (e) => {
    setImage(e.target.files[0])
  }



  const handleUpdateProduct = () => {
    setLoading(true)
    const formData = new FormData();
    formData.append("name_en",  titleEn)
    formData.append("city",  city)
    formData.append("name_ar",  nameAr)
    formData.append("description_ar",  requirementsAr)
    formData.append("description_en",  requirementsEn)
    formData.append("phone",  phone)
    formData.append("location",  location)
    formData.append("current_price",  currentPrice)
    formData.append("image",  image)

    axios.post(`${process.env.REACT_APP_API_URI}api/update_product/${id}`, 
    formData,
    {
      headers : {
        Authorization : `Bearer ${token}`
      }
    })
    .then(res => {
      if(res.data.status){
        setSuccessAddJob(true)
      }else{
        setErrorMessage(res.data.message)
      }
      setLoading(false)
    })
    .catch(error => {
      console.log(error)
      setErrorMessage(error.message)
      setLoading(false)
    })
  }

  useEffect(() => {
    setErrorMessage("")
  }, [nameAr, titleEn, requirementsAr, requirementsEn, location, phone, phone, image])



  //useEffect to get product details

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URI}api/getdetails/${id}`)
    .then(res => {
        // console.log(res)
        setProductInfo(res.data.data)
        setCity(res.data.data.city)
        setCurrentPrice(res.data.data.current_price)
        setImage(res.data.data.image)
        setLocation(res.data.data.location)
        setPhone(res.data.data.phone)
        setRequirementsAr(res.data.data.description_ar)
        setRequirementsEn(res.data.data.description_en)
        setNameAr(res.data.data.name_ar) 
        setTitleEn(res.data.data.name_en) 
    })
    .catch(error => {
        console.log(error)
    })
  }, [])

  console.log(productInfo)


  return(
    <>
    <div className='container5 w-75 justify-content-center'>
      <div className='row'>
        <div className='col-lg col-sm-12'>
          <label className='form-label'>Name Arabic</label>
          <br></br>
          <input name='name_ar' className='form-control' type='text' placeholder='Enter Name arabic' value={nameAr} onChange={(e) =>setNameAr(e.target.value)}></input>
        </div>
        <div className='col-lg col-sm-12'>
          <label className='form-label'>Name English</label>
          <br></br>
          <input name='name_en' className='form-control' type='text' placeholder='Enter Name English' value={titleEn} onChange={(e) => setTitleEn(e.target.value)}></input>
        </div>
      </div>

      <div className='row'>
      </div>

      <div className='row'>
         <div className='col-lg col-sm-12'>
          <label className='form-label'>Phone</label>
          <br></br>
          <input name='phone' className='form-control' type='text' placeholder='Enter Phone' value={phone} onChange={(e) => setPhone(e.target.value)}></input>
        </div>
        <div className='col-lg col-sm-12'>
          <label className='form-label'>Location</label>
          <br></br>
          <input name='location' className='form-control' type='text' placeholder='Enter Location' value={location} onChange={(e) => setLocation(e.target.value)}></input>
        </div>
      </div>

      <div className='row'>
        <div className='col-lg-6 col-sm-12'>
          <label className='form-label'>Current Price</label>
          <br></br>
          <input name='current-price' className='form-control' type='text' placeholder='Enter Current Price' value={currentPrice} onChange={(e) => setCurrentPrice(e.target.value)}></input>
        </div>
          <div className='col-lg col-sm-12'>
          <label className='form-label'>City</label>
          <br></br>
          <input name='city' className='form-control' type='text' placeholder='Enter City' value={city} onChange={(e) => setCity(e.target.value)}></input>
        </div>
      </div>

      <div className='row '>
        <div className='col col-lg col-sm-12'>
          <label className='form-label'>Description English </label>
          <textarea name='requirements_en' className='form-control' type='text' placeholder='Enter Description English' value={requirementsEn} onChange={(e) => setRequirementsEn(e.target.value)}></textarea>
        </div>
        <div className='col col-lg col-sm-12'>
          <label className='form-label'>Description Arabic</label>
          <textarea name='requirements_ar' className='form-control' type='text' placeholder='Enter Description Arabic' value={requirementsAr} onChange={(e) => setRequirementsAr(e.target.value)}></textarea>
        </div>
      </div>
      <div className='row'>
           <div className='col-lg col-sm-12' style={{ paddingTop: '30px' }}>
                    <label htmlFor="file" className="label_for_file">Upload Product Image<FontAwesomeIcon icon={faUpload} /></label>
                    <input id="file" type="file" placeholder="Upload Your CV" onChange={(e) => handleSaveFile(e)} />
            </div>
        <div className='col-lg col-sm-12' style={{paddingTop:'30px'}}>
          <button className="primary_button" onClick={handleUpdateProduct}>Update Product</button>
        </div>
      </div>
      {
        succesAddJob &&
      <div className='succesMessage'>
        <p>The process was completed successfully.<Link to={-1}>Back</Link> </p>
      </div>
      }
      <p className={errorMessage ? "errmsg" : "offscreen"} aria-live="assertive" style={{marginTop : "10px"}}>{errorMessage}</p>
    </div>
    {
      loading &&
      <Loader />
    }
      </>
  )
}

export default UpdateOpenShopProduct;
