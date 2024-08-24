import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePinInput } from "react-pin-input-hook";
import "./logInForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import Loader from "../loader/Loader";

const code = Math.floor(100000 + Math.random() * 900000);

function LoginForm({ fcmToken }) {
  const navigate = useNavigate();

  const USER_REGEX =
    /^[a-zA-Z\u0600-\u06FF,-\s\d][\s\d\a-zA-Z\u0600-\u06FF,-]{3,23}/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [phone, setPhone] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [errLoginMsg, setErrLoginMsg] = useState("");
  const [password, setPassword] = useState("");
  const [typeOfPassword, setTypeOfPassword] = useState(false);

  //state to loading spinner
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd, phone]);

  useEffect(() => {
    setErrLoginMsg("");
  }, [password, phone]);

  const [btnState, setBtnState] = useState(false);
  const body = document.querySelector("body");
  let toggleClassCheck = btnState ? "active" : "";
  const [state, setState] = useState(true);
  const [showValidateRegister, setShowValidateRegister] = useState(false); //open or colse validate for register
  const [showValidatePassword, setShowValidatePassword] = useState(false); //open or colse validate for reset password
  const [values, setValues] = useState(Array(6).fill("")); //store input validate value
  const [messageSent, setMessageSent] = useState(false);

  //stare to login btn to disabel
  const [loginDisabl, setLoginDisabel] = useState(false);

  // register + login const

  const handleReSendMessage = () => {
    setIsLoading(true);

    axios
      .post(`${process.env.REACT_APP_API_URI}api/send_verificationCode`, {
        phone: phone,
        code: code,
        signature: "0000",
      })
      .then((res) => {
        console.log(res);
        if (res.data.status) {
          setShowValidatePassword(false);
        } else {
          setShowValidatePassword(false);
          setLoginDisabel(true);
          setErrLoginMsg("You have to wait 30 minit before login");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setErrMsg("Too Many Request");
        console.log(error);
        setShowValidateRegister(false);
      });
    setIsLoading(false);
  };

  const handleSendValidation = (values) => {
    if (showValidateRegister) {
      setIsLoading(true);
      if (code.toString() === values) {
        axios
          .post(
            `${process.env.REACT_APP_API_URI}api/register`,
            {
              phone: phone,
              password: pwd,
              name: user,
              fcm_token: fcmToken ? fcmToken : "111111",
            },
            {
              option: {
                verify: false,
              },
            }
          )
          .then((res) => {
            setIsLoading(false);
            localStorage.setItem("find_me_token", res.data.token);
            localStorage.setItem("userId", res.data.data.id);
            navigate("/");
            window.location.reload(false);
          })
          .catch((error) => {
            setIsLoading(false);
            console.log(error);
          });
      } else {
        setErrMsg("Code is false");
        setIsLoading(false);
      }
    } else if (showValidatePassword) {
      console.log("login");
      setIsLoading(true);
      if (code.toString() === values) {
        axios
          .post(
            `${process.env.REACT_APP_API_URI}api/verified_login`,
            {
              phone: phone,
              fcm_token: fcmToken ? fcmToken : "111111",
            },
            { headers: {} }
          )
          .then((res) => {
            setIsLoading(false);
            setShowValidatePassword(false);
            localStorage.setItem("find_me_token", res.data.token);
            navigate("/");
            window.location.reload(false);
          })
          .catch((error) => {
            console.log(error);
            setIsLoading(false);
          });
      } else {
        setTimeout(() => {
          setIsLoading(false);
          setShowValidatePassword(false);
          setErrLoginMsg("Code is false");
          window.location.reload(false);

          setState(false);
        }, 1000);
      }
    }
  };

  //function for validate
  const { fields } = usePinInput({
    values,
    autoFocus: true,
    onComplete: (values) => handleSendValidation(values),
    onChange: (values) => {
      setValues(values);
    },
  });

  // login function
  const handleApi = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_URI}api/login`, {
        phone: phone,
        password: password,
        fcm_token: fcmToken ? fcmToken : "111111",
      })
      .then((response) => {
        setIsLoading(false);
        if (response.data.status) {
          localStorage.setItem("find_me_token", response.data.token);
          localStorage.setItem("userId", response.data.data.id);
          navigate("/");
          window.location.reload(false);
        } else if (response.data.message === "Too many login attempts") {
          setShowValidatePassword(true);
          setIsLoading(true);
          setErrLoginMsg(response.data.message);
          axios
            .post(
              `${process.env.REACT_APP_API_URI}api/send_verificationCode`,
              {
                phone: phone,
                code: code,
                signature: "0000",
              },
              {
                headers: {},
              }
            )
            .then((res) => {
              setIsLoading(false);
              setShowValidatePassword(true);
            })
            .catch((error) => {
              console.log(error);
              setIsLoading(false);
            });
        } else {
          setErrLoginMsg(response.data.message);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  // register function
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_URI}api/validate_credential`, {
        name: user,
        phone: phone,
        password: pwd,
        fcm_token: fcmToken ? fcmToken : "111111",
      })
      .then((result) => {
        if (result.data.status) {
          axios
            .post(
              `${process.env.REACT_APP_API_URI}api/send_verificationCode`,
              {
                phone: phone,
                code: code,
                signature: "0000",
              },
              {
                headers: {},
              }
            )
            .then((res) => {
              setShowValidateRegister(true);
              setMessageSent(true);
              setIsLoading(false);
            })
            .catch((error) => {
              console.log(error);
              setIsLoading(false);
            });
        } else {
          setErrMsg(result.data.message);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err.message);
      });
  };

  // console.log(code)

  return (
    <section style={{minHeight: "calc(100vh - 135px)"}}>
      {isLoading && (
        <>
          <Loader />
        </>
      )}
      <div className="contaner">
        <div className="bluebg">
          <div className="box signin">
            <h2> Already Have an Account?</h2>
            <button
              onClick={() => {
                setBtnState((btnState) => !btnState);
                body.classList.remove("active");
                setState(!state);
              }}
              className={`btn${toggleClassCheck}`}
              id="btnIn"
            >
              Sign In
            </button>
          </div>
          <div className="box signup">
            <h2> Don't Have an Account?</h2>
            <button
              onClick={() => {
                setBtnState((btnState) => !btnState);
                setState(!state);
                body.classList.add("active");
              }}
              className={`btn${toggleClassCheck}`}
              id="btnUp"
            >
              Sign Up
            </button>
          </div>
        </div>
        <div className={state ? "formbx active" : "formbx"} id="form">
          <div className="form signinform">
            <p
              ref={errRef}
              className={errLoginMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errLoginMsg}
            </p>
            <form>
              <h3>Sign In</h3>
              <input
                type="text"
                placeholder="Number Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <div className="password_div">
                <input
                  type={typeOfPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  minLength="6"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {typeOfPassword ? (
                  <FontAwesomeIcon
                    icon={faEye}
                    className="eye_password"
                    onClick={() => setTypeOfPassword(!typeOfPassword)}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    className="eye_password"
                    onClick={() => setTypeOfPassword(!typeOfPassword)}
                  />
                )}
              </div>
              <input
                onClick={handleApi}
                type="submit"
                value="Login"
                disabled={loginDisabl}
                style={loginDisabl ? { opacity: "0.5" } : {}}
              />
            </form>
            <button
              className="ForgetBtn"
              onClick={() => {
                navigate("/forgetpassword");
              }}
            >
              Did you <span>forget password?</span>
            </button>
          </div>
          <div className="form signupform ">
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <form>
              <h3>Sign Up</h3>
              <input
                placeholder="Full Name"
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  userFocus && user && !validName ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
              <input
                type="tel"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                placeholder="Number Phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
              />
              <div className="password_div">
                <input
                  placeholder="Password"
                  type={typeOfPassword ? "text" : "password"}
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  autoComplete="false"
                />
                {typeOfPassword ? (
                  <FontAwesomeIcon
                    icon={faEye}
                    className="show_pass_conf"
                    onClick={() => setTypeOfPassword(!typeOfPassword)}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    className="show_pass_conf"
                    onClick={() => setTypeOfPassword(!typeOfPassword)}
                  />
                )}
              </div>
              <p
                id="pwdnote"
                className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number and a
                special character.
                <br />
                Allowed special characters:!@#$%
                {/* <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span> */}
              </p>
              <div className="password_div">
                <input
                  placeholder="Confirm Password"
                  type={typeOfPassword ? "text" : "password"}
                  id="confirm_pwd"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                  autoComplete="false"
                />
                {typeOfPassword ? (
                  <FontAwesomeIcon
                    icon={faEye}
                    className="show_pass_registger"
                    onClick={() => setTypeOfPassword(!typeOfPassword)}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    className="show_pass_registger"
                    onClick={() => setTypeOfPassword(!typeOfPassword)}
                  />
                )}
              </div>
              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
              </p>
              <button
                onClick={handleSubmit}
                type="submit"
                value="Register"
                className={`submit_register_btn ${
                  !validName || !validPwd || !validMatch
                    ? "submit_register_btn_disabled"
                    : ""
                }`}
                disabled={!validName || !validPwd || !validMatch ? true : false}
              >
                Register
              </button>
            </form>
          </div>
        </div>
        {showValidateRegister && (
          <div className="pin-input pin-input-2">
            <h2 className="validate_title">Enter Code Validation</h2>
            {fields.map((propsField, index) => (
              <input
                key={index}
                className="pin-input__field pin-input__field-2"
                {...propsField}
              />
            ))}
            <button
              onClick={handleReSendMessage}
              className="primary_button"
              style={{ marginTop: "20px" }}
            >
              There is no code receive
            </button>
          </div>
        )}
        {showValidatePassword && (
          <>
            <div className="pin-input-2-container"></div>
            <div className="pin-input pin-input-2">
              <h2 className="validate_title">Enter Code Validation</h2>
              {fields.map((propsField, index) => (
                <input
                  key={index}
                  className="pin-input__field pin-input__field-2"
                  {...propsField}
                />
              ))}
              <button
                onClick={handleReSendMessage}
                className="primary_button"
                style={{ marginTop: "20px" }}
              >
                There is no code receive
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default LoginForm;
