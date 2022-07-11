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

interface UsersData {
    confirmation_token?: string
    created_at?: string
    email?: string
    id?: number
    is_active?: boolean
    is_admin?: boolean
    name?: string
    pending?: boolean
  }



const ListMyProducts: React.FC = () => {
  
  const [user, setUser] = useState<UsersData[]>([]);
  const [products, setProducts] = useState<ProductsData[]>([]);
  
  useEffect(() => {
    const userStorage = localStorage.getItem('user')
    setUser(JSON.parse(String(userStorage))); 
  }, [])

  useEffect(() => {
    async function getProducts() {
        if(user.length >= 1) {
            const { data } = await api.get<ProductsData[]>(`/products?user_id=${user[0]?.id}`);
            setProducts(data);
        }
     
    }
    getProducts();
  }, [user])

  return (
    <div>
      <Navbar navigation={'mylist'} />
      <div className="flex-row">
      <div className="styled-container medium-container">
          <h2 className="title">View my products</h2>
          <ProductTable productsData={products} />
        </div>
      </div>
    </div>
  );
}

export default ListMyProducts;