
'use client';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { getProducts } from '../lib/api';
import { Product } from '../types';
import { useEffect, useState } from 'react';

const ProductTable: React.FC = (searchParams) => {

  const [products, setProducts] = useState<any[]>([]);


  const handlerButton: (product: any) => void = (product) => {
    console.log("Detalles del producto:", product);
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const fetchProducts = async () => {
      const response: any = await getProducts(params);
      setProducts(response.products);
    };
    fetchProducts();
  }, [searchParams]);

  return(
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell align="right">Precio</TableCell>
              <TableCell align="right">Disponibilidad</TableCell>
              <TableCell align="right">Categoría</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((product: any) => (
              <TableRow
                key={product.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell align="right">{product.price}</TableCell>
                <TableCell align="right">{product.isAvailable ? "En stock" : "Sin stock"}</TableCell>
                <TableCell align="right">{product.category}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => handlerButton(product)} variant="contained" color="primary">
                    Detalles
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}

export default ProductTable;