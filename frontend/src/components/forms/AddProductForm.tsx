import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import api from '../../services/api';
import Dropzone from '../dropzone/index.jsx';


const initialFormState = { id: null, name: '', description: '', price: '' }

const AddProductForm: React.FC = () => {
  const { createToasty } = useContext(AuthContext)
  const [product, setProduct] = useState(initialFormState);
  const [selectFiles, setSelectFiles] = useState([]);
  const [send, setSend] = useState(false);

  const [user, setUser] = useState<any>([]);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target
    setProduct({ ...product, [name]: value })
  }

  useEffect(() => {
    const userStorage = localStorage.getItem('user')

    if (userStorage) {
      setUser(JSON.parse(String(userStorage)));
    }
  }, [])

  async function handleCreateProduct(event: any) {
    event.preventDefault();

    const data = new FormData();

    const { name, description, price } = product;
    if (user) {
      data.append("name", name)
      data.append("description", description)
      data.append("price", price)
      data.append("created_by", String(user[0]?.id))

      selectFiles.forEach(file => {
        data.append("image", file);
      })

      await api.post("/products", data)
        .then(() => createToasty(`Product ${name} successfully created.`))
        .catch(e => {
          console.log(e)
        })

      setProduct(initialFormState);
      setSend(true);
    }

  }

  return (
    <form
      onSubmit={(event) => handleCreateProduct(event)}
    >
      <label>Name</label>
      <input
        type="text"
        name="name"
        required
        value={product.name}
        onChange={handleInputChange}
      />
      <label>Description</label>
      <input
        type="text"
        name="description"
        required
        value={product.description}
        onChange={handleInputChange}
      />
      <label>Price</label>
      <input
        type="number"
        name="price"
        required
        value={product.price}
        onChange={handleInputChange}
      />
      <Dropzone onSend={send} onFileUploaded={setSelectFiles} />
      <button>Add new product</button>
    </form>
  )
}



export default AddProductForm