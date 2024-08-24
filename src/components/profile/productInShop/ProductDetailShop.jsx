import { Box, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const token = localStorage.getItem("find_me_token");

export default function ProductDetail() {
  const [ProductDetail, setProductDetail] = useState();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URI}api/product_details/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setProductDetail(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return (
    <Grid
      container
      spacing={2}
      style={{
        position: "relative",
        padding: "100px 60px",
        minHeight: "calc(100vh - 120px)",
      }}
      justifyContent="center"
    >
      <Grid item xs={6}>
        <Box bgcolor="#fff"></Box>
      </Grid>
      <Grid item xs={6}>
        <Box></Box>
      </Grid>
    </Grid>
  );
}
