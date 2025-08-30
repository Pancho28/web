import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ProductTable } from '../components';


export default function Home() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              Products
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ py: 2 }}>
        <ProductTable />
      </Box>
    </Box>
  );
} 