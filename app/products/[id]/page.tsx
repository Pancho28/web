import Box from '@mui/material/Box';
import { ProductCard } from '../../../components';
import { getProductById } from '../../../lib/api';

export default async function ProductsDetail({ params }: { params: { id: string } }) {
    const { id } = await params;

    const product = await getProductById(id);

    if (!product) {
      return <div>Producto no encontrado.</div>;
    }
    return (
      <Box sx={{ flexGrow: 1 }}>
        <ProductCard product={product} />
      </Box>
    );
} 