import * as React from 'react';
import Box from '@mui/material/Box';
import { ProductGrid } from '../../components';


export default function Products() {
  return (
    <Box sx={{ flexGrow: 1 }}>
        <ProductGrid />
    </Box>
  );
} 