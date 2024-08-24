import "./App.css";
import { Routes, Route, HashRouter } from "react-router-dom";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
// import ContactUs from "./components/contactUs/ContactUs";
import Profile from "./components/profile/Profile";
import LoginForm from "./components/logIn/LogInForm";
import MyProfile from "./components/myProfile/MyProfile";
import OpenShop from "./components/openShop/OpenShop";
import OpenShopPopup from "./components/openShop/openShopPopup/OpenShopPopup";
import Services from "./components/services/Services";
import Policy from "./components/policy/Policy";
import GetPolicy from "./components/policy/getPolicy/GetPolicy";
import { requestPermission } from "./messaging-init-in-sw";
import { useState } from "react";
import SeekersDetails from "./components/job/seekersDetails/SeekersDetails";
import Forget from "./components/forget/Forget";
import SubServices from "./components/services/subServices/subServices/SubServices";
import MainServices from "./components/services/subServices/mainServices/MainServices";
import IntroDashboard from "./components/heba/dashboard/Dashboard";
import AddYourAdvertise from "./components/addYourAdvertise/AddYourAdvertise";
import ShopContact from "./components/shopContact/ShopContact";
import SearchFeed from "./components/sections/searchFeed/SearchFeed";
import SearchCompanyFeed from "./components/job/searchCompany/SearchCompanyFeed";
import SearchEmployeeFeed from "./components/job/searchEmployee/SearchEmployeeFeed";
import SearchOpenShopFeed from "./components/openShop/searchOpenShop/SearchOpenShopFeed";
import SearchServicesFeed from "./components/services/subServices/mainServices/searchServices/SearchServicesFeed";
import SubCategory from "./components/category/subCategory/SubCategory";
import ShowYourShops from "./components/heba/dashboard/ShowYourShops";
import ShowOpenShops from "./components/heba/dashboard/ShowOpenShops";
import MyData from "./components/myData/MyData";
import IntroCompany from "./components/job/company/IntroCompany";
import JobIntroduction from "./components/job/Intoduction/JobIntroduction";
import FormCompany from "./components/job/company/form/FormCompany";
import IntroEmployee from "./components/job/Employee/IntroEmployee";
import FormEmployee from "./components/job/Employee/form/FormEmployee";
import JobDetails from "./components/job/jobDetail/JobDetail";
import AddOpenShopProduct from "./components/heba/dashboard/addOpenShopProduct/AddOpenShopProduct";
import MyFavoriteShop from "./components/heba/dashboard/MyFavoriteShop";
import MyFavoriteProduct from "./components/heba/dashboard/MyFavoriteProduct";
import MyJob from "./components/heba/dashboard/MyJob";
import NewJobDeatails from "./components/job/company/jobDetails/NewJobDeatails";
// import ShowJobs from "./components/job/company/showJobs/ShowJobs";
import UpdateOpenShopProduct from "./components/heba/dashboard/updateOpenShopProduct/UpdateOpenShopProduct";
import UpdateJobSeekers from "./components/heba/dashboard/updateJobSeekers/UpdateJobSeekers";
import UpdateJobOffer from "./components/heba/dashboard/updateJobOffer/UpdateJobOffer";
import IntroFindMe from "./components/intriFindMe/IntroFindMe";
import Footer from "./components/footer/Footer";
import FormAdd from "./components/openShop/FormAdd";
import { Navigate, useLocation } from "react-router-dom";
import ProductDetailShop from "./components/profile/productInShop/ProductDetailShop";

function PrivateRoute({ children }) {
  const location = useLocation();
  const token = localStorage.getItem("find_me_token");

  if (!token) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

// const token = localStorage.getItem("find_me_token");

function App() {
  const [fcmToken, setFcmToken] = useState("");

  const [index, setIndex] = useState("");

  requestPermission(setFcmToken);

  //function to send data from child(job) to parent
  const indexDetails = (index) => {
    setIndex(index);
    console.log(index);
  };

  return (
    <HashRouter>
      <Navbar />
      {!sessionStorage.getItem("accept_cookies") && <Policy />}
      <Routes>
        <Route exact path="/" element={<IntroFindMe />}></Route>
        <Route exact path="/markets" element={<Home />}></Route>
        <Route path="/category/:id" element={<SubCategory />}></Route>
        <Route path="/profile/:id" element={<Profile />}></Route>
        <Route
          path="/ProductDetail/:id"
          element={<ProductDetailShop />}
        ></Route>
        <Route
          path="/login"
          element={<LoginForm fcmToken={fcmToken} />}
        ></Route>
        <Route
          path="/myprofile"
          element={
            <PrivateRoute>
              <MyProfile />
            </PrivateRoute>
          }
        />
        <Route path="/openshop" element={<OpenShop />}></Route>
        <Route path="/formaddproduct" element={<FormAdd />}></Route>
        <Route path="/searchshop" element={<SearchFeed />}></Route>
        <Route
          path="/searchcompany"
          element={<SearchCompanyFeed indexDetails={indexDetails} />}
        >
          <Route
            exact
            path="jobdetails"
            element={<JobDetails index={index} />}
          ></Route>
        </Route>
        <Route path="/searchemployee" element={<SearchEmployeeFeed />}>
          <Route path="seekersdetails/:id" element={<SeekersDetails />}></Route>
        </Route>
        <Route path="searchopenshop" element={<SearchOpenShopFeed />}></Route>

        {/* route for services */}
        <Route path="/services" element={<Services />}></Route>
        <Route
          path="/services/mainservices/:id"
          element={<MainServices />}
        ></Route>
        <Route
          path="/services/subservices/:id"
          element={<SubServices />}
        ></Route>
        <Route
          path="/searchservices/:id"
          element={<SearchServicesFeed />}
        ></Route>

        <Route path="/openshop/popup/:id" element={<OpenShopPopup />}></Route>
        <Route path="/addopenshop" element={<AddOpenShopProduct />}></Route>
        <Route path="/policy" element={<GetPolicy />}></Route>
        <Route path="/forgetpassword" element={<Forget />}></Route>
        <Route
          exact
          path="/addyouradvertise"
          element={<AddYourAdvertise />}
        ></Route>
        <Route exact path="/shopcontact" element={<ShopContact />}></Route>
        <Route
          exact
          path="/introdashboard"
          element={<IntroDashboard />}
        ></Route>
        <Route exact path="/showyourshops" element={<ShowYourShops />}></Route>
        <Route exact path="/showopenshops" element={<ShowOpenShops />}></Route>
        <Route
          exact
          path="/formupdateproduct/:id"
          element={<UpdateOpenShopProduct />}
        ></Route>
        <Route
          exact
          path="/formupdateseekers/:id"
          element={<UpdateJobSeekers />}
        ></Route>
        <Route
          exact
          path="/formupdateoffers/:id"
          element={<UpdateJobOffer />}
        ></Route>
        <Route
          exact
          path="/myfavoriteshop"
          element={<MyFavoriteShop />}
        ></Route>
        <Route
          exact
          path="/myfavoriteproduct"
          element={<MyFavoriteProduct />}
        ></Route>
        <Route exact path="/myjob" element={<MyJob />}>
          <Route
            exact
            path="seekersdetails/:id"
            element={<SeekersDetails index={index} />}
          ></Route>
          <Route
            exact
            path="jobdetails/:id"
            element={<NewJobDeatails index={index} />}
          ></Route>
        </Route>

        <Route exact path="/mydata" element={<MyData />}></Route>

        {/* route for job */}
        <Route
          exact
          path="/jobintroduction"
          element={<JobIntroduction />}
        ></Route>
        <Route path="/compny" element={<IntroCompany />}>
          <Route path="/compny/jobdetails/:id" element={<NewJobDeatails />} />
        </Route>
        <Route exact path="/formcompany" element={<FormCompany />}></Route>
        <Route exact path="/introemployee" element={<IntroEmployee />}>
          <Route path="seekersdetails/:id" element={<SeekersDetails />}></Route>
        </Route>
        <Route exact path="/formemployee" element={<FormEmployee />}></Route>
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;
