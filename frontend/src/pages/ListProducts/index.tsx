import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import ProductTable from '../../components/tables/ProductTable';
import api from '../../services/api';

interface ProductsData {
  id: number
  name: string
  description: string
  created_by: number
  price: string
  product_images: ImagesData
  published_at: string
}

interface ImagesData {
  images_url: string[]
}

function ListProducts() {
  const [products, setProducts] = useState<ProductsData[]>([]);

  useEffect(() => {
    async function getProducts() {
      const { data } = await api.get<ProductsData[]>('/products');
      setProducts(data);
    }
    getProducts();
  }, [])

  return (
    <div>
      <Navbar navigation={'list'} />
      <div className="flex-row">
      <div className="styled-container medium-container">
          <h2 className="title">View products</h2>
          <ProductTable productsData={products} />
        </div>
      </div>
    </div>
  );
}

export default ListProducts;