'use client';
import { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Tooltip } from '@mui/material';
import Image from 'next/image';
import a from "./image/ac.jpg";
import { Product } from "../types";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  return (
     <Card sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      <Image
        src={product.image}
        alt={product.name}
        width={400}
        height={400}
      />
      <CardContent>
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontSize: '20px', fontWeight: 'bold' }}
        >
          {product.name}
        </Typography>
        <Typography
          variant="h5"
          component="div"
          color="text.secondary"
          sx={{ fontSize: '18px', mt: 1 }}
        >
          ${product.price}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: product.isAvailable ? 'green' : 'grey', mt: 2 }}
        >
          {product.isAvailable ? 'En stock' : 'Sin stock'}
        </Typography>
        <Tooltip title={isFavorite ? 'Eliminar de favoritos' : 'Agregar a favoritos'}>
          <IconButton onClick={handleFavoriteToggle} color="primary">
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Tooltip>
      </CardContent>
    </Card>
  );
};

export default ProductCard;