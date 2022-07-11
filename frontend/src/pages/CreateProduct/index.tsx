import React from 'react';
import AddProductForm from '../../components/forms/AddProductForm';
import Navbar from '../../components/navbar';

const CreateProduct: React.FC = () => {
  return (
    <div className="flex-large">
      <Navbar navigation={'create'} />
      <div className="styled-container small-container">
        <h2 className="title">Add product</h2>
        <AddProductForm />
      </div>
    </div>
  );
}

export default CreateProduct;