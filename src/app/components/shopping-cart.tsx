import React from "react";
import Drawer from "@mui/material/Drawer";
import { Typography } from "@mui/material";

interface ShoppingCartProps {
    isDrawerOpen: boolean;
    toggleDrawer: () => void;
  }

const ShoppingCart = (props: ShoppingCartProps) => {
  const { isDrawerOpen, toggleDrawer } = props;
  return (
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      onClose={toggleDrawer}
      sx={{
        width: '40%',
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '40%' },
      }}
    >
      <Typography
              variant="h6"
              noWrap
              component="a"
              fontSize={40}
              sx={{
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
    </Drawer>
  );
};

export default ShoppingCart;
