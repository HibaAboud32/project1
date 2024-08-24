import { CardContent, CardMedia, Grid, Typography,Button, Card, Container } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function SimilarShop({ similarShop, setSimilarShop }) {
  return (
    <Container style={{ padding: "20px" }}>
      <Grid container spacing={2} columns={18}>
        {similarShop &&
          similarShop.map((element, index) => (
            <Grid item lg={6} md={9} sm={18}>
              <Card
                sx={{ maxWidth: 345, borderRadius: "30px", maxHeight: 600 }}
                key={index}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={`${process.env.REACT_APP_API_URI}${element.image}`}
                  alt="main image"
                  sx={{ objectFit: "cover" }}
                />

                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    style={{ color: "#fdb26a" }}
                  >
                    {element.name_en}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {element.bio}
                  </Typography>
                 
                </CardContent>
                <CardContent>
                <Button style={{ color: "#fdb26a" }}>
                    <VisibilityIcon />
                    <Typography>{element.views}</Typography>
                  </Button>
                  <Button style={{ color: "#fdb26a" }}>
                  <LocationCityIcon/>
                    <Typography>{element.city}</Typography>
                  </Button>
                  <Button style={{ color: "#fdb26a" }}>
                  <LocationOnIcon/>
                    <Typography>{element.address}</Typography>
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
