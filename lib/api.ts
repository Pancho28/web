const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE;

export async function getProducts(params?: URLSearchParams) {
  try {
    const url = `${API_BASE_URL}/api/v1/products?${params?.toString() || ''}`;
    console.log("Fetching products from:", url);
    const response = await fetch(url, {
      cache: 'no-store'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return null;
  }
}

export async function getProductById(id: string) {
  try {
    const url = `${API_BASE_URL}/api/v1/products/${id}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch product with ID: ${id}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return null;
  }
}