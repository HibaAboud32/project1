import axios from 'axios';
import React from 'react'
import styles from "./searchCompanyFeed.module.css"
import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate, Outlet } from 'react-router-dom';
import { useRef } from 'react';
import CounterButton from '../../counterButton/CounterButton';

const SearchCompanyFeed = ({indexDetails}) => {
    const[searchParams] = useSearchParams();
    const navigate = useNavigate();


    const [resault, setResault] = useState([])
    const [btnNumber, setBtnNumber] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const divRef = useRef(null)




    //copy seaction content

   
    const handleNavigate = (id) => {
      navigate(`/profile/${id}`)
    }
  

      const handleShowDetail = (index) => {
        indexDetails(index)
        // console.log(index)
        divRef.current.scrollIntoView({ behavior: 'smooth' });
        navigate("jobdetails")
    }


    useEffect(() => {
        // const params = new URLSearchParams();

        const city = searchParams.get("city")
        const place = searchParams.get("place")
        const category = searchParams.get("category")
        const search = searchParams.get("search")
        console.log("city", city)
        console.log("place", place)
        console.log("category", category)
        console.log("search", search)

        //fetch data from api
        axios.post(`${process.env.REACT_APP_API_URI}api/search_offer`,
        {
          city : city,
          place : place,
          category : category,
          text : search,
          counter : currentPage
        },{})
        .then(res => {
          console.log(res.data.data)
          setResault(res.data.job_offers)
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
                        onClick={() => handleShowDetail(index)}
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
