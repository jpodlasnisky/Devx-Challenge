import React, { useContext, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { AuthContext } from '../../contexts/AuthContext';
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

interface PropsPopup {
    productEdit: ProductsData;
}


const PopupEdit: React.FC<PropsPopup> = ({ productEdit }) => {

    const { createToasty } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    async function handleUpdateProduct(idProduct: number ){
        
        const nameEdit = name.length >= 1 ? name : productEdit.name
        const descriptionEdit = description.length >= 1 ? description : productEdit.description
        const priceEdit = price.length >= 1 ? price : productEdit.price
        
        await api.put('/products', {       
                    id: idProduct,
                    name: nameEdit,
                    description: descriptionEdit,
                    price: priceEdit   
        })
          .then(() => createToasty('Product updated successfully.'))
          .catch(console.log)


        window.location.reload(false);
        
    }

    return (
    <Popup
      trigger={<button className="button accent-button"> More info </button>}
      modal
      nested
    >
      {(close: any) => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header"> { productEdit.name } </div>
          <div className="content">
          <form>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={name}
              placeholder={productEdit.name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={description}
              placeholder={productEdit.description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label>Price</label>
            <input
              type="number"
              name="price"
              placeholder={productEdit.price}
              value={price}
              onChange={(e) => setPrice(e.target.value)}           
            />
            
  
          </form>
          <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
          {productEdit.product_images.images_url.map((image, index) => (
            
              <img src={image} key={index} alt="alt" style={{width: "100px", margin: '15px'}} />
            
          ))}
          </div>
          </div>
          <div className="actions">
            <button className="button" onClick={() => handleUpdateProduct(productEdit.id)}> Save Changes </button>
            <button
              className="button danger-button"
              style={{marginLeft: '10px'}}
              onClick={() => close() }
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Popup>
    )
};

export default PopupEdit;