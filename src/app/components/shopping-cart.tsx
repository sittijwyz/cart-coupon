import React from "react";
import Drawer from "@mui/material/Drawer";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

//redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import {
  removeFromCart,
  increment,
  decrement,
} from "../store/reducers/shopping-cart.slice";

interface ShoppingCartProps {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
}

const ShoppingCart = (props: ShoppingCartProps) => {
  const { isDrawerOpen, toggleDrawer } = props;
  const shoppingCartState = useSelector(
    (state: RootState) => state.shoppingCart.items
  );
  const dispatch = useDispatch<AppDispatch>();

  console.log("shoppingCartState:", shoppingCartState);

  return (
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      onClose={toggleDrawer}
      sx={{
        width: "40%",
        "& .MuiDrawer-paper": { width: "40%" },
      }}
    >
      <Box width="100%">
        <Typography
          variant="h6"
          fontSize={40}
          sx={{
            pl: 5,
            mr: 5,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: "0.1rem",
            textDecoration: "none",
          }}
        >
          CART
        </Typography>
        {shoppingCartState.length === 0 ? (
          <Typography
            variant="h6"
            sx={{
              pl: 5,
              mt: 5,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
            }}
          >
            Your cart is empty
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {shoppingCartState.map((item) => (
              <>
                <Grid md={1} />
                <Grid key={item.id} md={10}>
                  <Card
                    sx={{ display: "flex", height: "100px", width: "100%" }}
                  >
                    <CardMedia
                      component="img"
                      image={item.imageUrl}
                      alt={item.name}
                      sx={{
                        height: "90%",
                        width: "20%",
                        objectFit: "cover",
                      }}
                    />
                    <CardContent
                      sx={{
                        display: "flex",
                        flex: 1,
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Typography
                          gutterBottom
                          variant="body1"
                          fontWeight={600}
                        >
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.description}
                        </Typography>
                      </Box>
                      <Box
                        display="flex"
                        sx={{ flexDirection: "column", alignItems: "center" }}
                      >
                        <Typography variant="h6" color="black">
                          {item.quantity * item.price}
                        </Typography>
                        <Grid display="flex">
                          <Button
                            variant="outlined"
                            onClick={() => dispatch(decrement(item))}
                            sx={{
                              minWidth: 25,
                              height: 25,
                              borderRadius: 2,
                              p: 0,
                            }}
                          >
                            -
                          </Button>
                          <Typography
                            variant="subtitle1"
                            color="black"
                            sx={{ mx: 1 }}
                          >
                            {item.quantity}
                          </Typography>
                          <Button
                            variant="outlined"
                            onClick={() => dispatch(increment(item))}
                            sx={{
                              minWidth: 25,
                              height: 25,
                              borderRadius: 2,
                              p: 0,
                            }}
                          >
                            +
                          </Button>
                        </Grid>
                      </Box>
                    </CardContent>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => dispatch(removeFromCart(item))}
                      sx={{
                        minWidth: 35,
                        height: 35,
                        position: "absolute",
                        right: 0,
                        p: 0,
                        mr: 1,
                      }}
                    >
                      X
                    </Button>
                  </Card>
                </Grid>
                <Grid md={1} />
              </>
            ))}
          </Grid>
        )}
      </Box>
    </Drawer>
  );
};

export default ShoppingCart;
