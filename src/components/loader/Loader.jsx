import React, { useState } from 'react'
import "./loader.css"

const Loader = () => {

    const [showLoader, setShowLoader] = useState(true)

  return (

    <>
    {/* {
        showLoader && */}
        <div className='overlay_loader' onClick={() => setShowLoader(false)}>
        <div className="loadingio-spinner-spinner-50b4p3zhrgh">
                <div className="ldio-h0i21g44g1">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    {/* } */}
    </>
  )
}

export default Loader




// <div class="loadingio-spinner-spinner-50b4p3zhrgh"><div class="ldio-h0i21g44g1">
// <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
// </div></div>
// <style type="text/css">
// @keyframes ldio-h0i21g44g1 {
//   0% { opacity: 1 }
//   100% { opacity: 0 }
// }
// .ldio-h0i21g44g1 div {
//   left: 98px;
//   top: 44px;
//   position: absolute;
//   animation: ldio-h0i21g44g1 linear 1s infinite;
//   background: #207d78;
//   width: 4px;
//   height: 32px;
//   border-radius: 2px / 16px;
//   transform-origin: 2px 56px;
// }.ldio-h0i21g44g1 div:nth-child(1) {
//   transform: rotate(0deg);
//   animation-delay: -0.9090909090909091s;
//   background: #207d78;
// }.ldio-h0i21g44g1 div:nth-child(2) {
//   transform: rotate(32.72727272727273deg);
//   animation-delay: -0.8181818181818182s;
//   background: #207d78;
// }.ldio-h0i21g44g1 div:nth-child(3) {
//   transform: rotate(65.45454545454545deg);
//   animation-delay: -0.7272727272727273s;
//   background: #207d78;
// }.ldio-h0i21g44g1 div:nth-child(4) {
//   transform: rotate(98.18181818181819deg);
//   animation-delay: -0.6363636363636364s;
//   background: #207d78;
// }.ldio-h0i21g44g1 div:nth-child(5) {
//   transform: rotate(130.9090909090909deg);
//   animation-delay: -0.5454545454545454s;
//   background: #207d78;
// }.ldio-h0i21g44g1 div:nth-child(6) {
//   transform: rotate(163.63636363636363deg);
//   animation-delay: -0.45454545454545453s;
//   background: #207d78;
// }.ldio-h0i21g44g1 div:nth-child(7) {
//   transform: rotate(196.36363636363637deg);
//   animation-delay: -0.36363636363636365s;
//   background: #207d78;
// }.ldio-h0i21g44g1 div:nth-child(8) {
//   transform: rotate(229.0909090909091deg);
//   animation-delay: -0.2727272727272727s;
//   background: #207d78;
// }.ldio-h0i21g44g1 div:nth-child(9) {
//   transform: rotate(261.8181818181818deg);
//   animation-delay: -0.18181818181818182s;
//   background: #207d78;
// }.ldio-h0i21g44g1 div:nth-child(10) {
//   transform: rotate(294.54545454545456deg);
//   animation-delay: -0.09090909090909091s;
//   background: #207d78;
// }.ldio-h0i21g44g1 div:nth-child(11) {
//   transform: rotate(327.27272727272725deg);
//   animation-delay: 0s;
//   background: #207d78;
// }
// .loadingio-spinner-spinner-50b4p3zhrgh {
//   width: 200px;
//   height: 200px;
//   display: inline-block;
//   overflow: hidden;
//   background: none;
// }
// .ldio-h0i21g44g1 {
//   width: 100%;
//   height: 100%;
//   position: relative;
//   transform: translateZ(0) scale(1);
//   backface-visibility: hidden;
//   transform-origin: 0 0; /* see note above */
// }
// .ldio-h0i21g44g1 div { box-sizing: content-box; }
// </style>