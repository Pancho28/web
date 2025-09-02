'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const Footer = () => {
  return (
    <Box component="footer" sx={{ p: 2, mt: 'auto', textAlign: 'center' }}>
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Mini-Market.
      </Typography>
    </Box>
  );
};