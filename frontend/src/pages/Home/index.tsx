import React, { useContext, useEffect, useState } from 'react';
import { FcBusinessman, FcMultipleSmartphones, FcPaid, FcRedo, FcTwoSmartphones } from 'react-icons/fc';
import Navbar from '../../components/navbar';
import { AuthContext } from '../../contexts/AuthContext';
import api from '../../services/api';
import './styles.css';


interface ProductsData {
  id: number;
  name: string;
  description: string;
  price: number;
  created_by?: string;
  published_at: string;
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

const Home: React.FC = () => {

  const [users, setUsers] = useState('');
  const [user, setUser] = useState<UsersData[]>([]);
  const [products, setProducts] = useState<ProductsData[]>([]);
  const [myProducts, setMyProducts] = useState<ProductsData[]>([]);
  const [update, setUpdate] = useState('');
  const { handleLogout } = useContext(AuthContext);

  function convertDate(date: string) {
    const dtConvert = new Date(date)

    return `Last updated ${dtConvert.getHours() < 10 ? '0'+ dtConvert.getHours()
      : dtConvert.getHours()}:${dtConvert.getMinutes() < 10 ? '0'+dtConvert.getMinutes() 
      : dtConvert.getMinutes()}`
  }

  useEffect(() => {
    const userStorage = localStorage.getItem('user')
    setUser(JSON.parse(String(userStorage)));
  }, [])

  useEffect(() => {
    async function getProducts() {   
      await api.get<ProductsData[]>('/products')
      .then(dataProductAll => setProducts(dataProductAll.data))
      .catch(handleLogout)     
    
      if(user.length >= 1) {
            await api.get<ProductsData[]>(`/products?user_id=${user[0]?.id}`)
              .then(dataMyProduct => setMyProducts(dataMyProduct.data))
              .catch(handleLogout)
      }
    
    }
    getProducts();
    
  }, [user, handleLogout])

  useEffect(() => {
    if(products.length >= 1) {
      const productsSize = ((products.length) - 1)
      const updatedString = convertDate(products[productsSize].published_at);
      setUpdate(updatedString);
    
   }
     
  }, [products])

  useEffect(() => {
    async function getUsers() {
      await api.get('/users')
        .then(dataUsers => setUsers(dataUsers.data))
        .catch(handleLogout)
    }
  getUsers()
  }, [handleLogout])

  return (
    <>
      <Navbar navigation={'home'} />
      <div className="container home">
        {user ? (
          <h1 className="user"> Dear, { user[0]?.name } </h1>
        ): (<h1>''</h1>)}
        
        <div className="dashboard">
          <div className="dashboard-item">
            <section className="dashboard-section">
              <FcMultipleSmartphones size={80} />

              <div>
                <h3>All Products</h3>
                <h1>{products.length}</h1>
              </div>
            </section>
            <hr />
            <div className="dashboard-info">
              <FcRedo />
              <span>{ update }</span>
            </div>
          </div>

          <div className="dashboard-item">
            <section className="dashboard-section">
              <FcTwoSmartphones size={80} />
              <div>
                <h3>My Products</h3>
                <h1>{myProducts.length}</h1>
              </div>
            </section>
            <hr />
            <div className="dashboard-info">
              <FcRedo />
              <span>{ update }</span>
            </div>
          </div>

          <div className="dashboard-item">
            <section className="dashboard-section">
              <FcBusinessman size={80} />
              <div>
                <h3>Users</h3>
                <h1>{ users.length }</h1>
              </div>
            </section>
            <hr />
            <div className="dashboard-info">
              <FcRedo />
              <span>{ update }</span>
            </div>
          </div>

          <div className="dashboard-item">
            <section className="dashboard-section">
              <FcPaid size={80} />
              <div>
                <h3>Products on Sale</h3>
                <h1>{ products.length }</h1>
              </div>
            </section>
            <hr />
            <div className="dashboard-info">
              <FcRedo />
              <span>{ update }</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;