import React, { useEffect, useState } from "react";
import '../../../job/Employee/form/FormEmployee.css';
import axios from "axios";
import Loader from "../../../loader/Loader"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
const token = localStorage.getItem("find_me_token")

function UpdateJobSeekers() {

    const {id} = useParams();

    //state to store input
    const [titleEn, setTitleEn] = useState("")
    const [titleAr, setTitleAr] = useState("")
    const [descriptionEn, setDescriptionEn] = useState("")
    const [descriptionAr, setDescriptionAr] = useState("")
    const [location, setLocation] = useState("")
    const [city, setCity] = useState("")
    const [cv, setCv] = useState("")
    //state for loading
    const [loading, setLoading] = useState(false)
    //state to store message
    const [errMessage, setErrMessage] = useState("")
    const [successAddSeekers, setSuccessAddSeekers] = useState(false)


    const handleSaveFile = (e) => {
        setCv(e.target.files[0])
    }


    const handleAddSeekers = () => {
        setLoading(true)
        const formData = new FormData();
        formData.append("title_en", titleEn) 
        formData.append("title_ar", titleAr) 
        formData.append("description_en", descriptionEn) 
        formData.append("description_ar", descriptionAr) 
        formData.append("cv", cv) 
        formData.append("location", location) 
        formData.append("city", city) 

        axios.post(`${process.env.REACT_APP_API_URI}api/job_seekers/${id}`,
        formData,
        {
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        .then(res => {
            console.log(res)
            if(res.data.status){
                setSuccessAddSeekers(true)
            }else{
                setErrMessage(res.data.message)
            }
            setLoading(false)
        })
        .catch(error => {
            setLoading(false)
            setErrMessage(error.message)
            console.log(error)
        })
    }


    useEffect(() => {
        setErrMessage("")
        setSuccessAddSeekers(false)
    }, [titleEn, titleAr, location, descriptionAr, descriptionEn,cv, city, location])



    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URI}api/job_seekers/${id}`)
        .then(res => {
            console.log(res.data.data)
            setTitleAr(res.data.data.title_ar)
            setTitleEn(res.data.data.title_en)
            setLocation(res.data.data.location)
            setCity(res.data.data.city)
            setDescriptionAr(res.data.data.description_ar)
            setDescriptionEn(res.data.data.description_en)
            setCv(res.data.data.cv)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    return (
        <>
        <div className='container5 w-75 justify-content-center'>
            <div className='row'>
                <div className='col-lg col-sm-12'>
                    <label className='form-label'>Title Arabic</label>
                    <br></br>
                    <input className='form-control' type='text' placeholder='enter title arabic pleace:' value={titleAr} onChange={(e) => setTitleAr(e.target.value)}></input>
                </div>
                <div className='col-lg col-sm-12'>
                    <label className='form-label'>Title English</label>
                    <br></br>
                    <input className='form-control' type='text' placeholder='enter title english pleace:' value={titleEn} onChange={(e) => setTitleEn(e.target.value)}></input>
                </div>
            </div>

            <div className='row'>
                <div className='col col-lg col-sm-12'>
                    <label className='form-label'>Location</label>
                    <br></br>
                    <input className='form-control' type='text' placeholder='enter location pleace:' value={location} onChange={(e) => setLocation(e.target.value)}></input>
                </div>
                <div className='col-lg col-sm-12'>
                    <label className='form-label'>City</label>
                    <br></br>
                    <input className='form-control' type='text' placeholder='enter city pleace:' value={city} onChange={(e) => setCity(e.target.value)}></input>
                </div>
            </div>

            <div className='row '>
                <div className='col col-lg col-sm-12'>
                    <label className='form-label'>Descriptopns English </label>
                    <textarea className='form-control' type='text' placeholder='enter requirements english pleace:' value={descriptionEn} onChange={(e) => setDescriptionEn(e.target.value)}></textarea>
                </div>
                <div className='col col-lg col-sm-12'>
                    <label className='form-label'>Descriptopns Arabic</label>
                    <textarea className='form-control' type='text' placeholder='enter requirements arabic pleace:' value={descriptionAr} onChange={(e) => setDescriptionAr(e.target.value)} ></textarea>
                </div>
            </div>

            <div className='row' style={{display : "flex", justifyContent : "space-between", alignItems : "center"}}>
                <div className='col-lg-2 col-sm-4  text-center' style={{ paddingTop: '30px' }}>
                    <label htmlFor="file" className="label_for_file">Upload Your CV <FontAwesomeIcon icon={faUpload} /></label>
                    <input id="file" type="file" placeholder="Upload Your CV" onChange={(e) => handleSaveFile(e)} />
                </div>
                <div className='col-lg-2 col-sm-4  text-center' style={{ paddingTop: '30px' }}>
                    <button className="primary_button" onClick={handleAddSeekers}> Add Job</button>
                </div>
            </div>
            {
        successAddSeekers &&
      <div className='succesMessage'>
        <p>The process was completed successfully.<Link to={-1}>Back</Link> </p>
      </div>
      }
            <p className={errMessage ? "errmsg" : "offscreen"} style={{padding : "10px", marginTop : "20px"}}>{errMessage}</p>
        </div>
        {
                loading &&
                <Loader />
            }
        </>
    );
}
export default UpdateJobSeekers;