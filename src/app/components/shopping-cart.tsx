import React from "react";
import Drawer from "@mui/material/Drawer";

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
        width: '20%',
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '20%' },
      }}
    >
      5555
    </Drawer>
  );
};

export default ShoppingCart;
