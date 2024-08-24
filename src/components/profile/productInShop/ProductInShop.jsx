import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, Grid } from "@mui/material";
import { Container } from "react-bootstrap";
// import VisibilityIcon from "@mui/icons-material/Visibility";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import styles from "./productInShop.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export default function MultiActionAreaCard({
  profileProducts,
  setProfileProducts,
}) {
  const [mainImages, setMainImages] = useState({});

  const handleImageClick = (productId, imageURL) => {
    setMainImages((prevImages) => ({ ...prevImages, [productId]: imageURL }));
  };
  const [expandedId, setExpandedId] = useState(null);

  const toggleDescription = (id) => {
    if (expandedId === id) {
      setExpandedId(null); // Click again to collapse
    } else {
      setExpandedId(id); // Expand the new one
    }
  };
  const navigate = useNavigate();
  const handleNavigate = useCallback(
    (id) => {
      navigate(`/ProductDetail/${id}`);
    },
    [navigate]
  );

  const renderDescription = (description, id) => {
    if (description.length > 20 && expandedId !== id) {
      return (
        <>
          {description.substring(0, 20)}...
          <Button
            onClick={() => toggleDescription(id)}
            style={{ color: "#fdb26a", padding: 0, minWidth: "auto" }}
          >
            Show More
          </Button>
        </>
      );
    } else {
      return (
        <>
          {description}
          {description.length > 20 && (
            <Button
              onClick={() => toggleDescription(id)}
              style={{ color: "#fdb26a", padding: 0, minWidth: "auto" }}
            >
              Show Less
            </Button>
          )}
        </>
      );
    }
  };
  return (
    <Container style={{ padding: "20px" }}>
      <Grid container spacing={2} columns={18}>
        {profileProducts &&
          profileProducts.map((element, index) => (
            <Grid item lg={6} md={9} sm={18}>
              <Card
                className={styles.hide_scrollbar}
                sx={{
                  maxWidth: 345,
                  borderRadius: "30px",
                  maxHeight: 600,
                  overflowY: "auto",
                }}
                key={index}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={
                    mainImages[element.id] ||
                    `${process.env.REACT_APP_API_URI}${element.main_image}`
                  }
                  alt="main image"
                  sx={{ objectFit: "fill" }}
                />
                <Grid container spacing={0.5} style={{ marginTop: "2px" }}>
                  {element.images.map((image, imageIndex) => (
                    <Grid item xs={3} key={imageIndex}>
                      <img
                        src={`${process.env.REACT_APP_API_URI}${image.URL}`}
                        alt={image.name}
                        style={{
                          width: "100%",
                          borderRadius: "5px",
                          cursor: "pointer",
                          height: "60px",
                        }}
                        onClick={() =>
                          handleImageClick(
                            element.id,
                            `${process.env.REACT_APP_API_URI}${image.URL}`
                          )
                        }
                      />
                    </Grid>
                  ))}
                </Grid>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    style={{ color: "#fdb26a" }}
                  >
                    {element.name_en}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{ fontSize: "12px" }}
                  >
                    {renderDescription(element.description_en, element.id)}
                  </Typography>
                </CardContent>

                <h5 style={{ color: "#fdb26a", textAlign: "center" }}>
                  Additional Fields
                </h5>

                <CardContent
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Grid container spacing={0.5} style={{ marginTop: "2px" }}>
                    {Object.entries(element.additional_fields).map(
                      ([key, value]) => (
                        <div key={key} className={styles.tooltip_container}>
                          <span
                            className={styles.tooltip}
                            style={{
                              backgroundColor:
                                key === "color" ? value : undefined,
                            }}
                          >
                            {value}
                          </span>
                          <span className={styles.text}>{key}</span>
                        </div>
                      )
                    )}
                  </Grid>
                </CardContent>

                <CardContent>
                  <Button style={{ color: "#fdb26a" }}>
                    <FontAwesomeIcon
                      icon={faMoneyBill}
                      style={{ padding: "5px" }}
                    />
                    <Typography>{element.current_price}</Typography>
                  </Button>
                  <Button style={{ color: "#fdb26a" }}>
                    {/* <FontAwesomeIcon icon={faMoneyBill} /> */}
                    <Typography
                      style={{
                        textAlign: "center",
                        textDecoration: "line-through",
                        color: "red",
                      }}
                    >
                      {element.old_price}
                    </Typography>
                  </Button>
                  <Button onClick={() => handleNavigate(element.id)}>
                    Show detail
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
