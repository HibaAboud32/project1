import axios from "axios";
import styles from "./getPolicy.module.css";
import React, { useEffect, useState } from "react";

const GetPolicy = () => {
  const [policy, setPolicy] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URI}api/get_policy`)
      .then((res) => {
        setPolicy(res.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return <div className={styles.get_policy}>{policy}</div>;
};

export default GetPolicy;
