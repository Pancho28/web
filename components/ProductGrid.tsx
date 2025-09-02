
'use client';
import { Grid, Typography, Box, CardActionArea, Container, TextField, Pagination } from '@mui/material';
import { ProductCard } from '.';
import { getProducts } from '../lib/api';
import { Product } from '../types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const ProductGrid: React.FC = () => {

  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 4;

  const handlerCard: (product: any) => void = (product) => {
    router.push(`/products/${product.id}`);
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        
        if (debouncedSearchTerm) {
          params.append('search', debouncedSearchTerm);
        }

        params.append('page', currentPage.toString());
        params.append('limit', itemsPerPage.toString());
        
        const response: any = await getProducts(params);
        if (response && response.products) {
          setProducts(response.products);
          setTotalPages(Math.ceil(response.total / itemsPerPage));
        } else {
          setError("Formato de datos inválido desde la API.");
        }
      } catch (e) {
        setError("Fallo al obtener los productos.");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [debouncedSearchTerm, currentPage]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  if (loading) {
    return <Typography>Cargando productos...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Container>
      <Box sx={{ my: 4, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        <TextField
          label="Buscar por nombre"
          variant="outlined"
          sx={{ flexGrow: 1 }}
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Box>
      
      <Grid container spacing={2}>
        {products.length > 0 ? (
          products.map((product) => (
            <Grid key={product.id} xs={12} sm={6} md={4} lg={3}>
              <CardActionArea onClick={() => handlerCard(product)}>
                <ProductCard product={product} />
              </CardActionArea>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" sx={{ mt: 4, textAlign: 'center', width: '100%' }}>
            No se encontraron productos.
          </Typography>
        )}
      </Grid>
      
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
}

export default ProductGrid;