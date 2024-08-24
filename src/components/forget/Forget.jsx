import React, { useEffect, useState } from "react";
import styles from "./forget.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../loader/Loader";
import { usePinInput } from "react-pin-input-hook";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const code = Math.floor(100000 + Math.random() * 900000);

function Forget() {
  const navigate = useNavigate();

  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [values, setValues] = useState(Array(6).fill("")); //store input validate value
  const [resetPassword, setResetPassword] = useState(false); //state to show or hide reset password popup
  const [typeOfPassword, setTypeOfPassword] = useState(false); //store to show or hide password

  const [password, setPassword] = useState(""); //store password
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const { fields } = usePinInput({
    values,
    autoFocus: true,
    onComplete: (values) => handleSendValidation(values),
    onChange: (values) => {
      setValues(values);
    },
  });

  const sendVerification = () => {
    if (phone.length === 10) {
      setIsLoading(true);
      axios
        .post(
          `${process.env.REACT_APP_API_URI}api/check_existed`,
          { phone: phone },
          {
            headers: {},
          }
        )
        .then((res) => {
          //when the number is true
          if (res.data.status) {
            axios
              .post(
                `${process.env.REACT_APP_API_URI}api/forgot_password`,
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
                setShowVerification(true);
                console.log(res.data);
              })
              .catch((error) => {
                console.log(error);
                setIsLoading(false);
              });
          } else {
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    } else {
      setErrMessage("Number phone is wrong");
    }
  };

  const handleSendValidation = (values) => {
    if (code.toString() === values) {
      setShowVerification(false);
      setResetPassword(true);
    } else {
      setErrMessage("The code is wrong");
    }
  };

  const handleReSendMessage = () => {};

  const handleResetPassword = () => {
    setIsLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API_URI}api/reset_password`,
        {
          phone: phone,
          password: password,
        },
        {
          headers: {},
        }
      )
      .then((res) => {
        setResetPassword(false);
        setIsLoading(false);
        localStorage.setItem("find_me_token", res.data.token);
        navigate("/");
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setErrMessage("");
  }, [phone]);

  //useEffect to check valid password

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setValidMatch(password === matchPwd);
  }, [password, matchPwd]);

  return (
    <div className={styles.forget_password}>
      <div className={styles.forget_password_container}>
        <img
          className={styles.logo}
          src="/assets/find-me-logo.png"
          alt="shop"
        />
        <h3>Account recovery</h3>
        <p>
          To help keep your account secure, wants to make sure that you're the
          one trying to sign in.
        </p>
        <p
          className={errMessage ? "errmsg" : "offscreen"}
          style={{ marginTop: "20px" }}
        >
          {errMessage}
        </p>
        <input
          type="tel"
          required
          placeholder="Enter Your Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <img
          className={styles.image_verification}
          src="/assets/verification.jpg"
          alt=""
        />
        <p>
          when you click on button 'Send Code' you will recive a message with
          verification code
        </p>
        <div className={styles.forget_password_footer}>
          <button onClick={sendVerification} className="primary_button">
            Send Code
          </button>
          <Link className={styles.send_verification}>Resend A Code!</Link>
        </div>
      </div>
      {showVerification && (
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
              There is no code recive
            </button>
            <p
              style={{ marginTop: "20px" }}
              className={errMessage ? "errmsg" : "offscreen"}
            >
              {errMessage}
            </p>
          </div>
        </>
      )}
      {resetPassword && (
        <>
          <div className={styles.reset_password}>
            <div className={styles.reset_password_container}>
              <h3>Reset password</h3>
              <input
                value={password}
                type={typeOfPassword ? "text" : "password"}
                placeholder="Enter New Password"
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
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
              <input
                value={matchPwd}
                onChange={(e) => setMatchPwd(e.target.value)}
                type="password"
                placeholder="Confirm New Password"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
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
                className="primary_button"
                disabled={!validPwd || !validMatch ? true : false}
                onClick={handleResetPassword}
              >
                Reset Password
              </button>
            </div>
          </div>
        </>
      )}
      {isLoading && <Loader />}
    </div>
  );
}

export default Forget;
