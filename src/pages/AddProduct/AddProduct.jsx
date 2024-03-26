import React from 'react'
import axios from 'axios';
import { useState } from 'react';
const AddProduct = () => {
    
  const [productName, setProductName] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [rating, setRating] = useState('');
  const [totalCustomerRev, setTotalCustomerRev] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantityAvailable, setQuantityAvailable] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('');
  const [image, setImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('shortDescription', shortDescription);
      formData.append('rating', rating);
      formData.append('totalCustomerRev', totalCustomerRev);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('quantityAvailable', quantityAvailable);
      formData.append('brand', brand);
      formData.append('category', category);
      formData.append('color', color);
      formData.append('image', image);

      /*const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/product/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });*/

      setUploadStatus('Product uploaded successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error.response.data);
      setUploadStatus('Failed to upload product.');
    }
  };
  //write code here for api to strore
  
  return (
    <div>
    <h1>AddProduct</h1>
    
    <h2>Upload Product</h2>
    
      <h2>Upload Product</h2>
      <form onSubmit={handleSubmit}>
      <label>Product Name:</label>
        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required />
        <br />
        <label>Short Description:</label>
        <textarea value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} required/>
        <br />
        <label>Rating:</label>
        <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} required />
        <br />
        <label>Total Customer Reviews:</label>
        <input type="number" value={totalCustomerRev} onChange={(e) => setTotalCustomerRev(e.target.value)} required />
        <br />
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        <br />
        <label>Price:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <br />
        <label>Quantity Available:</label>
        <input type="text" value={quantityAvailable} onChange={(e) => setQuantityAvailable(e.target.value)} />
        <br />
        <label>Brand:</label>
        <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} required />
        <br />
        <label>Category:</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
        <br />
        <label>Color:</label>
        <input type="text" value={color} onChange={(e) => setColor(e.target.value)} required />
        <br />
        <label>Product Image:</label>
        <input type="file"
         onChange={handleImageChange}
         required />
        <br />
        <button type="submit">Upload</button>
      </form>
      {uploadStatus && <p>{uploadStatus}</p>}
    
  </div>
  )
}

export default AddProduct