// import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
// import './FormCompany.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../../../loader/Loader';
import { useParams } from 'react-router-dom';

const token = localStorage.getItem("find_me_token")

function UpdateJobOffer(){
    const {id} = useParams();


  const [titleAr, setTitleAr] = useState("")
  const [titleEn, setTitleEn] = useState("")
  const [workHour, setWorkHour] = useState("")
  const [jobCategory, setJobCategory] = useState("")
  const [requirementsAr, setRequirementsAr] = useState("")
  const [requirementsEn, setRequirementsEn] = useState("")
  const [location, setLocation] = useState("")
  const [phone, setPhone] = useState("")
  const [salary, setSalary] = useState("")
  const [experience, setExperience] = useState("")
  const [city, setCity] = useState("")

  //state to handle succes message
  const [succesAddJob, setSuccessAddJob] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)


  const handleSendJob = () => {
    setLoading(true)
    axios.post(`${process.env.REACT_APP_API_URI}api/update_offer/${id}`, 
    {
      title_ar : titleAr,
      title_en : titleEn,
      work_hours : workHour,
      job_category : jobCategory,
      requirements_ar : requirementsAr,
      requirements_en : requirementsEn,
      location : location,
      phone : phone,
      salary : salary,
      experience : experience,
      city : city
    },
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
  }, [titleAr, titleEn, workHour, jobCategory, requirementsAr, requirementsEn, location, phone, salary, experience, city])


  //useEffect to fetch previous data tp update it
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URI}api/get_details_offer/${id}`)
    .then(res => {
        console.log(res.data.job_offers)
        setTitleAr(res.data.job_offers.title_ar)
        setTitleEn(res.data.job_offers.title_en)
        setPhone(res.data.job_offers.phone)
        setSalary(res.data.job_offers.salary)
        setRequirementsAr(res.data.job_offers.requirements_ar)
        setRequirementsEn(res.data.job_offers.requirements_en)
        setWorkHour(res.data.job_offers.work_hours)
        setJobCategory(res.data.job_offers.job_category)
        setExperience(res.data.job_offers.experience)
        setCity(res.data.job_offers.city)
        setLocation(res.data.job_offers.location)
    })
    .catch(error => {
        console.log(error)
    })
  }, [])


  return(
    <>
    <div className='container5 w-75 justify-content-center'>
      <div className='row'>
        <div className='col-lg col-sm-12'>
          <label className='form-label'>Title Arabic</label>
          <br></br>
          <input name='title_ar' className='form-control' type='text' placeholder='enter title arabic pleace:' value={titleAr} onChange={(e) =>setTitleAr(e.target.value)}></input>
        </div>
        <div className='col-lg col-sm-12'>
          <label className='form-label'>Title English</label>
          <br></br>
          <input name='title_en' className='form-control' type='text' placeholder='enter title english pleace:' value={titleEn} onChange={(e) => setTitleEn(e.target.value)}></input>
        </div>
      </div>

      <div className='row'>
        <div className='col col-lg col-sm-12'>
          <label className='form-label'>Phone</label>
          <br></br>
          <input name='phone' className='form-control' type='text' placeholder='enter phone pleace:' value={phone} onChange={(e) => setPhone(e.target.value)}></input>
        </div>
        <div className=' col-lg col-sm-12'>
          <label className='form-label'>Work Hours</label>
          <br></br>
          <input name='work_hours' className='form-control' type='number' placeholder='enter work hours pleace:' value={workHour} onChange={(e) => setWorkHour(e.target.value)}></input>
        </div>
      </div>

      <div className='row'>
        <div className='col-lg col-sm-12'>
          <label className='form-label'>Location</label>
          <br></br>
          <input name='location' className='form-control' type='text' placeholder='enter location pleace:' value={location} onChange={(e) => setLocation(e.target.value)}></input>
        </div>
        <div className='col-lg col-sm-12'>
          <label className='form-label'>City</label>
          <br></br>
          <input name='city' className='form-control' type='text' placeholder='enter city pleace:' value={city} onChange={(e) => setCity(e.target.value)}></input>
        </div>
      </div>

      <div className='row '>
        <div className='col col-lg col-sm-12'>
          <label className='form-label'>Requirements English </label>
          <textarea name='requirements_en' className='form-control' type='text' placeholder='enter requirements english pleace:' value={requirementsEn} onChange={(e) => setRequirementsEn(e.target.value)}></textarea>
        </div>
        <div className='col col-lg col-sm-12'>
          <label className='form-label'>Requirements Arabic</label>
          <textarea name='requirements_ar' className='form-control' type='text' placeholder='enter requirements arabic pleace:' value={requirementsAr} onChange={(e) => setRequirementsAr(e.target.value)}></textarea>
        </div>
      </div>

      <div className='row'>
        <div className=' col-lg-6 col-sm-12'>
          <label className='form-label'>Experience</label>
          <br></br>
          <input name='experience' className='form-control' type='number' placeholder='enter experience pleace:' value={experience} onChange={(e) => setExperience(e.target.value)}></input>
        </div>
        <div className=' col-lg-6 col-sm-12'>
          <label className='form-label'>Job Category</label>
          <br></br>
          <input name='job_category' className='form-control' type='text' placeholder='enter work hours pleace:' value={jobCategory} onChange={(e) => setJobCategory(e.target.value)}></input>
        </div>
      </div>

      <div className='row'>
      
        <div className='col-lg-6 col-sm-12'>
          <label className='form-label'>Salary</label>
          <br></br>
          <input name='salary' className='form-control' type='text' placeholder='enter salary pleace:' value={salary} onChange={(e) => setSalary(e.target.value)}></input>
        </div>
        <div className='col-lg-4 col-sm-4 align-self-center text-center' style={{paddingTop:'30px'}}>
          <button className="primary_button" onClick={handleSendJob}>Update Job</button>
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

export default UpdateJobOffer;