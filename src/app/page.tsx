import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Button } from "@mui/material";

//data
import { items } from "./utils/mock-Items";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-row items-center justify-between p-24">
      <Grid container spacing={4}>
        {items.map((item) => (
          <Grid key={item.id}>
            <Card sx={{ height: "400px", width: "300px" }}>
              <CardMedia
                component="img"
                image={item.imageUrl}
                alt={item.name}
                sx={{
                  height: "60%",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
                <Typography variant="h6" color="primary">
                  {item.price} Bath
                </Typography>
                <Button variant="outlined" startIcon={<AddShoppingCartIcon />}>
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </main>
  );
}
