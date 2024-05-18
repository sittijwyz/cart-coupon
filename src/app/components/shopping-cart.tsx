import React, { useCallback, useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  TextField,
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
  selectShoppingCartState,
} from "../store/reducers/shopping-cart.slice";
import {
  applyCoupon,
  removeCoupon,
  incrementDiscount,
  decrementDiscount,
  selectCouponState,
} from "../store/reducers/coupon.slice";
import { calculateDiscount } from "../utils/calculate-coupon";

import { users } from "../mocks/mock-user";

interface ShoppingCartProps {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
}

const ShoppingCart = (props: ShoppingCartProps) => {
  const { isDrawerOpen, toggleDrawer } = props;
  const [coupon, setCoupon] = useState<string | null>(null);
  const [disCountBycoupon, setDisCountBycoupon] = useState<any>([])

  const { items, totalPrice } = useSelector(selectShoppingCartState);
  const { appliedCoupons, discount } = useSelector(selectCouponState);
  const dispatch = useDispatch<AppDispatch>();

  const handleApplyCoupon = useCallback(() => {
    if (coupon) {
      dispatch(applyCoupon(coupon));
    }
  }, [coupon, dispatch]);

  const handleRemoveCoupon = (couponCode:string) => {
    if (couponCode) {
      dispatch(removeCoupon(couponCode));
      dispatch(decrementDiscount(55))
    }
  }

  const calculateCouponDiscount = useCallback(() => {
    const user = users.find((user) => user.name === "Sittichai");
    if (user) {
      const disc = calculateDiscount(appliedCoupons, items, user, totalPrice);
      dispatch(incrementDiscount(disc));

      appliedCoupons.forEach(element => {
        setDisCountBycoupon({code:element.code,discount:disc})
        
      });
    } else {
      console.log("ไม่พบผู้ใช้ชื่อ Sittichai");
    }
  }, [appliedCoupons, totalPrice, dispatch]);

  useEffect(() => {
    calculateCouponDiscount();
  }, [calculateCouponDiscount]);

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
            textDecoration: "none",
          }}
        >
          MY CART
        </Typography>
        {items.length === 0 ? (
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
            {items.map((item) => (
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
                      <Box sx={{ position: "absolute", right: 0 }}>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => dispatch(removeFromCart(item))}
                          sx={{
                            minWidth: 35,
                            height: 35,
                            position: "relative",
                            top: -15,
                            p: 0,
                          }}
                        >
                          X
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid md={1} />
              </>
            ))}
            <Grid md={10}>
              <Box
                sx={{
                  mx: "3.5rem",
                  width: "100%",
                  height: "auto",
                  p: 3,
                  boxShadow:
                    "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
                }}
              >
                <Box display="flex" alignItems="center" height="3rem" mb={2}>
                  <TextField
                    label="Promotion Code"
                    id="promotion-code"
                    onChange={(e) => setCoupon(e.target.value)}
                    sx={{
                      "& .MuiInputBase-root": {
                        height: "3rem",
                        borderRadius: "5px 0px 0px 5px",
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={() => handleApplyCoupon()}
                    sx={{
                      bgcolor: "black",
                      height: "100%",
                      borderRadius: "0px 5px 5px 0px",
                      "&:hover": {
                        backgroundColor: "#696969",
                      },
                    }}
                  >
                    Apply
                  </Button>
                  {appliedCoupons.length !== 0 && (
                    <Box>
                      {appliedCoupons.map((coupon) => (
                        <Typography
                          component="span"
                          variant="subtitle2"
                          key={coupon.code}
                        >
                          {coupon.code}{" "}
                          <Typography
                          component="span"
                          variant="subtitle2"
                            sx={{ cursor: "pointer" }}
                            onClick={() => handleRemoveCoupon(coupon.code)}
                          >
                            x
                          </Typography>
                        </Typography>
                      ))}
                    </Box>
                  )}
                </Box>
                <Typography variant="subtitle2">
                  Subtotal : {totalPrice}{" "}
                </Typography>
                <Typography variant="subtitle2">
                  Discount : {discount}
                </Typography>
                <Typography variant="subtitle2">
                  Total : {totalPrice - discount}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    </Drawer>
  );
};

export default ShoppingCart;
