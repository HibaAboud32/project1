import axios from 'axios';
import React from 'react'
import styles from "./searchEmployeeFeed.module.css"
import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate, Outlet, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGreaterThan, faLessThan } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import CounterButton from '../../counterButton/CounterButton';

const SearchCompanyFeed = ({indexDetails}) => {
    // const location = useLocation();
    const[searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();


    const [resault, setResault] = useState([])
    const [btnNumber, setBtnNumber] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const divRef = useRef(null)




    //copy seaction content

   
    const handleNavigate = (id) => {
      navigate(`/profile/${id}`)
    }
  

    const handleClick = (id) => {
      divRef.current?.scrollIntoView({ behavior: "smooth" })
      const currentUrl = `${location.search}`
      console.log(currentUrl)
      navigate(`/searchemployee/seekersdetails/${id}${currentUrl}`)
  }
  


    useEffect(() => {
        // const params = new URLSearchParams();

        const city = searchParams.get("city")
        const place = searchParams.get("place")
        const search = searchParams.get("search")
        console.log("city", city)
        console.log("place", place)
        console.log("search", search)

        //fetch data from api
        axios.post(`${process.env.REACT_APP_API_URI}api/job_seekers/search`,
        {
          city : city,
          place : place,
          text : search,
          counter : currentPage
        },{})
        .then(res => {
          console.log(res.data.job_seekers)
          setResault(res.data.job_seekers)
          setBtnNumber(res.data.pages_number)
        })
        .catch(error => {
          console.log(error)
        })
    }, [currentPage])





  return (
    <>
    <div className={styles.container2}>
    <div className="row justify-content-center">
        <div className="col-lg-8 col-sm-8 text-center ">
        <h3 style={{color : "#F70000", marginTop : "30px", textAlign : "center", fontSize : "32px" }}>{resault.length === 0 ? "There Is No Resault Matches" : "Search Resault"}</h3>
        </div>
    </div>

    <div className={`row`} style={{ paddingTop: '40px' }}>
        {
            resault.map((element, index) => (
            <div key={element.id} className="col-lg-3 col-md-6 col-sm-8 text-center" >
                <div style={{ padding: '30px' }}>
                    <img className={styles.imgcompany} src={`${process.env.REACT_APP_API_URI}${element.profile_img}`} alt=""></img>
                </div>
                <div className="card" style={{ borderRadius: '30px' }}>
                    <div className="card-body">
                        <h5 className={styles.title}>company name</h5>
                        <p>{element.user_name}</p>
                        
                        <h5 className={styles.title}>Job Category</h5>
                        <p>{element.job_category}</p>
                        
                        <h5 className={styles.title}>Number</h5>
                        <p>{element.phone}</p>
                        
                        <h5 className={styles.title}>Location</h5>
                        <p>{element.location}</p>
                        
                        <button className="primary_button"
                        onClick={() => handleClick(element.id)}
                        >show detail</button>
                    </div>
                </div>
            </div>
            ))
        }
    </div>
    <div className="row justify-content-center" style={{paddingTop:'20px'}}>
    </div>
    <div ref={divRef} />
    <Outlet />
<CounterButton btnNumber={btnNumber} currentPage={currentPage} setCurrentPage={setCurrentPage} /> 
</div>
</>
  )
}

export default SearchCompanyFeed
