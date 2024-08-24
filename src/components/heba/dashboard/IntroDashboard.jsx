import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { Link, NavLink } from "react-router-dom";
// import img1 from '../images/setting.png';
// import img2 from '../images/message.png';
import styles from './Dashboard.module.css';
import Chars from './Chars.js';

function IntroDashboard() {
  return ( 
    <>
    <div className={styles.dashboard}
    //  style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}
     >
      {/* <CDBSidebar textColor="#006E66" backgroundColor="#ECF5F4">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>

        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink to="/" className="activeClicked" >
              <CDBSidebarMenuItem style={{ color: '#006E66' }}><img src={img1} className={styles.image} />Setting</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/tables" className="activeClicked">
              <CDBSidebarMenuItem style={{ color: '#006E66' }}><img src={img2} className={styles.image} />Message</CDBSidebarMenuItem>
            </NavLink>

          </CDBSidebarMenu>
        </CDBSidebarContent>

      </CDBSidebar> */}

      <div className={styles.sidbar}>
        <ul className={styles.sidbar_ul}>
          <li className={styles.sidbar_li}>
            <img src="/assets/advertise.jpg" alt="" />
            <Link to="/">Setting</Link>
          </li>
          <li className={styles.sidbar_li}>
            <img src="/assets/advertise.jpg" alt="" />
            <Link to="/">Message</Link>
          </li>
        </ul>
      </div>
      















      <div className="container" style={{ background: 'transparent',padding:'0px' }}>
        <div className="row justify-content-center" >
          <div className="card col-lg-3 col-md-6 col-sm-2" style={{borderRadius:'30px', width: '40vh', margin: '20px',background:'#673BB7' }}>
            <h5 className={styles.title}> MY SHOPS</h5>
            <button className={styles.button} style={{color:'#673BB7'}}>show detail </button>
          </div>

          <div className="card col-lg-3 col-md-6 col-sm-2" style={{borderRadius:'30px', width: '40vh', margin: '20px',background:'#2989DB' }}>
            <h5 className={styles.title}> MY OPEN SHOPS PRODUCT</h5>
            <button className={styles.button} style={{color:'#2989DB'}}>show detail </button>
          </div>

          <div className="card col-lg-3 col-md-6 col-sm-2" style={{borderRadius:'30px', width: '40vh', margin: '20px',background:'#F3831B' }}>
            <h5 className={styles.title}>JOB</h5>
            <button className={styles.button} style={{color:'#F3831B'}}>show detail </button>
          </div>
        </div>
        <br></br>
        <div className="row justify-content-center">
          <div className="card col-lg-3 col-md-6 col-sm-2" style={{borderRadius:'30px', width: '40vh', margin: '20px',background:'#02746C' }}>
            <h5 className={styles.title}> MY FAVOURITE SHOPS</h5>
            <button className={styles.button} style={{color:'#02746C'}}> show detail </button>
          </div>

          <div className="card col-lg-3 col-md-6 col-sm-2" style={{borderRadius:'30px', width: '40vh', margin: '20px',background:'#5F4979' }}>
            <h5 className={styles.title}> MY FAVOURITE PRODUCT</h5>
            <button className={styles.button} style={{color:'#5F4979'}}>show detail </button>
          </div>
         
        </div> 
            <Chars />
      </div>
      </div>
      
    </>


  )
}

export default IntroDashboard;