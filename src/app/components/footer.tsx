import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "#E0E0E0", color: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box display="flex">
            <Typography
              variant="subtitle2"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 5,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 500,
                letterSpacing: "0.1rem",
                textDecoration: "none",
              }}
            >
              Contact : sittichai.wym@gmail.com
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Footer