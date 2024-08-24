import React from "react";
import Styledashboard from "./Dashboard.module.css";
// import { CChart } from "@coreui/react-chartjs";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const GoToShops = () => {
    navigate("/showyourshops");
  };
  const GoToOpenShops = () => {
    navigate("/showopenshops");
  };
  const handleGoFavoriteShop = () => {
    navigate("/myfavoriteshop");
  };
  const handleGoFavoriteProduct = () => {
    navigate("/myfavoriteproduct");
  };
  const handleGoMyJob = () => {
    navigate("/myjob");
  };
  return (
    <>
      <div
        className="container"
        style={{
          background: "transparent",
          padding: "0px",
          minHeight: "calc(100vh - 135px)",
        }}
      >
        <div className={Styledashboard.element_container}>
          <div
            className={`card col-lg-3 col-md-6 col-sm-2 ${Styledashboard.element_content} ${Styledashboard.element_content_1}`}
            style={{ borderRadius: "30px", width: "40vh", margin: "20px" }}
          >
            <h5 className={Styledashboard.title}>My Shops</h5>
            <button style={{ color: "#2989DB" }} onClick={GoToShops}>
              show detail{" "}
            </button>
          </div>
          <div
            className={`card col-lg-3 col-md-6 col-sm-2 ${Styledashboard.element_content} ${Styledashboard.element_content_2}`}
            style={{ borderRadius: "30px", width: "40vh", margin: "20px" }}
          >
            <h5 className={Styledashboard.title}>OPEN SHOPS</h5>
            <button style={{ color: "#2989DB" }} onClick={GoToOpenShops}>
              show detail{" "}
            </button>
          </div>
          <div
            className={`card col-lg-3 col-md-6 col-sm-2 ${Styledashboard.element_content} ${Styledashboard.element_content_3}`}
            style={{ borderRadius: "30px", width: "40vh", margin: "20px" }}
          >
            <h5 className={Styledashboard.title}>Job</h5>
            <button style={{ color: "#2989DB" }} onClick={handleGoMyJob}>
              show detail{" "}
            </button>
          </div>
          <div
            className={`card col-lg-3 col-md-6 col-sm-2 ${Styledashboard.element_content} ${Styledashboard.element_content_4}`}
            style={{ borderRadius: "30px", width: "40vh", margin: "20px" }}
          >
            <h5 className={Styledashboard.title}>My Favorite Shops</h5>
            <button style={{ color: "#2989DB" }} onClick={handleGoFavoriteShop}>
              show detail{" "}
            </button>
          </div>
          <div
            className={`card col-lg-3 col-md-6 col-sm-2 ${Styledashboard.element_content} ${Styledashboard.element_content_5}`}
            style={{ borderRadius: "30px", width: "40vh", margin: "20px" }}
          >
            <h5 className={Styledashboard.title}>My Favorite Products</h5>
            <button
              style={{ color: "#2989DB" }}
              onClick={handleGoFavoriteProduct}
            >
              show detail{" "}
            </button>
          </div>
        </div>
        {/*      
        <div className='col-lg-6 col-md-6 col-sm-6 justify-content-center' style={{background:'#ffffff', margin : "30px auto 30px auto" }}>
      <CChart
        type="bar"
        data={{
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
        {
          label: 'GitHub Commits',
          backgroundColor: '#2989DB',
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
        },
    ],
  }}
  labels="months"
/>
</div> */}
      </div>
    </>
  );
};

export default Dashboard;
