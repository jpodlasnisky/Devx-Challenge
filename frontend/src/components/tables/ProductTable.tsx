import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import api from '../../services/api';
import Popup from '../popup';


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

interface PropsProducts {
  productsData: ProductsData[]
}

const ProductTable: React.FC<PropsProducts> = ({ productsData }) => {

  const { createToasty, handleLogout } = useContext(AuthContext);
  
  function convertDate(date: string) {
    const dtConvert = new Date(date)

    return `${dtConvert.getHours() < 10 ? '0'+ dtConvert.getHours(): dtConvert.getHours()}:${dtConvert.getMinutes() < 10 ? '0'+dtConvert.getMinutes() : dtConvert.getMinutes()} - 
            ${dtConvert.getUTCDate()}/${dtConvert.getUTCMonth()}/${dtConvert.getFullYear()}
           `
  }

  async function handleDeleteProduct(idProduct: number){

      await api.delete('/products', { data: {id: idProduct} })
        .then(() => createToasty('Product deleted successfully.'))
        .catch(handleLogout)

      window.location.reload(false);
  }
    
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Released at</th>
        </tr>
      </thead>
      <tbody>
        {productsData.length > 0 ? (
          productsData.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{convertDate(product.published_at)}</td>
              <td>
                <Popup productEdit={product}></Popup>
                <button className="button danger-button" onClick={() => handleDeleteProduct(product.id)} style={{marginLeft: '5px'}}>Delete</button>
                
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>No products</td>
          </tr>
        )}

      </tbody>
    </table>
  )
}

export default ProductTable;