import axios from 'axios';
import React from 'react'
import styles from "./searchOpenShopFeed.module.css"
import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGreaterThan, faLessThan } from '@fortawesome/free-solid-svg-icons';
import CounterButton from '../../counterButton/CounterButton';

const SearchCompanyFeed = () => {
    // const location = useLocation();
    const[searchParams] = useSearchParams();
    const navigate = useNavigate();


    const [resault, setResault] = useState([])
    const [btnNumber, setBtnNumber] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)


    //copy seaction content

    const handleShowPopup = (id) => {
      navigate(`/openshop/popup/${id}`)
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
        axios.post(`${process.env.REACT_APP_API_URI}api/search_product`,
        {
          city : city,
          place : place,
          search : search,
          counter : currentPage
        },{})
        .then(res => {
          console.log(res.data.data)
          setResault(res.data.data)
          setBtnNumber(res.data.pages_number)
        })
        .catch(error => {
          console.log(error)
        })
    }, [currentPage])





  return (
  <>

    <div style={{position : "relative"}}>
    <div style={{backgroundColor : "#f5f5f5", paddingBottom : "50px"}}>
    </div>
          <h3 style={{color : "#F70000", marginTop : "30px", textAlign : "center", fontSize : "32px" }}>{resault.length === 0 ? "There Is No Resault Matches" : "Search Resault"}</h3>
    <div style={{marginTop : "50px"}}>
    </div>
  <div className={styles.open_shop}>
    <div className={`${styles.open_shop_container} container`}>
        {
            resault.map(element => (
                <div key={element.id} className={styles.open_shop_card}>
                    <div className={styles.open_shop_img}>
                        <img src={`${process.env.REACT_APP_API_URI}${element.image}`} alt={element.name_en} onClick={() => handleShowPopup(element.id)} />
                    </div>
                    <div className={styles.open_shop_content}>
                        <h3 className={styles.title}>{element.name_en}</h3>
                        <p className={styles.description}>{element.current_price}</p>
                    </div>
                    <button onClick={() => handleShowPopup(element.id)} className="primary_button">Show Details</button>
                </div>
            ))
        }
    </div>
    <CounterButton btnNumber={btnNumber} currentPage={currentPage} setCurrentPage={setCurrentPage} />
  </div>
</div>
</>
  )
}

export default SearchCompanyFeed
