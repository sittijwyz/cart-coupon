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

interface disCountBycouponType {
  couponCode: string;
  couponDiscount: number;
}

const ShoppingCart = (props: ShoppingCartProps) => {
  const { isDrawerOpen, toggleDrawer } = props;
  const [coupon, setCoupon] = useState<string | null>(null);
  const [disCountBycoupon, setDisCountBycoupon] = useState<
    disCountBycouponType[]
  >([]);

  console.log("disCountBycoupon", disCountBycoupon);

  const { items, totalPrice } = useSelector(selectShoppingCartState);
  const { appliedCoupons, discount } = useSelector(selectCouponState);
  const dispatch = useDispatch<AppDispatch>();

  const handleApplyCoupon = useCallback(() => {
    if (coupon) {
      dispatch(applyCoupon(coupon));
    }
  }, [coupon, dispatch]);

  const handleRemoveCoupon = (couponCode: string) => {
    const matchingCoupon = appliedCoupons.find(
      (coupon) => coupon.code === couponCode
    );

    if (matchingCoupon) {
      const matchingDiscount = disCountBycoupon.find(
        (discount) => discount.couponCode === matchingCoupon.code
      );

      if (matchingDiscount) {
        dispatch(removeCoupon(couponCode));
        // dispatch(decrementDiscount(matchingDiscount.couponDiscount));
      }
    }
  };

  const calculateCouponDiscount = useCallback(() => {
    const user = users.find((user) => user.name === "Sittichai");
    if (user) {
      const { totalDiscount, couponDiscounts } = calculateDiscount(
        appliedCoupons,
        items,
        user,
        totalPrice
      );
      dispatch(incrementDiscount(totalDiscount));
      setDisCountBycoupon(couponDiscounts);
    } else {
      console.log("ไม่พบผู้ใช้ชื่อ Sittichai");
    }
  }, [appliedCoupons]);

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
                          {(item.quantity * item.price).toLocaleString("th-TH")}
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
                      "& .MuiOutlinedInput-root": {
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#bebebe",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#bebebe",
                        },
                        "&.Mui-focused": {
                          backgroundColor: "white",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        "&.Mui-focused": {
                          color: "black",
                        },
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
                    <Box height="100%" ml={2} flex={1}>
                      <Grid container flexDirection="column">
                        {appliedCoupons.map((coupon) => (
                          <Grid key={coupon.id} md={12} color="red">
                            <Typography
                              component="span"
                              variant="subtitle2"
                              fontSize={12}
                              key={coupon.code}
                            >
                              {coupon.code}{" "}
                              <Typography
                                component="span"
                                variant="subtitle2"
                                fontSize={14}
                                fontWeight={700}
                                sx={{ cursor: "pointer" }}
                                onClick={() => handleRemoveCoupon(coupon.code)}
                              >
                                x
                              </Typography>
                            </Typography>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )}
                </Box>
                <Typography variant="subtitle2">
                  Subtotal : ฿{totalPrice.toLocaleString("th-TH")}{" "}
                </Typography>
                <Typography variant="subtitle2" color="red">
                  Discount : -฿{discount.toLocaleString("th-TH")}
                </Typography>
                <Typography variant="subtitle2" fontSize={25} fontWeight={700}>
                  Total : ฿{(totalPrice - discount).toLocaleString("th-TH")}
                </Typography>
                <Box display="flex" justifyContent="center">
                  <Button
                    variant="contained"
                    sx={{
                      justifySelf: "center",
                      mt: "1rem",
                      bgcolor: "black",
                      width: "80%",
                      height: "2.8rem",
                      borderRadius: "8px",
                      "&:hover": {
                        backgroundColor: "#696969",
                      },
                    }}
                  >
                    Check out
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    </Drawer>
  );
};

export default ShoppingCart;
