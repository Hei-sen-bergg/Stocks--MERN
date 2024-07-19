import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { baseurl } from '../baseurl';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [barcode, setBarcode] = useState('');
  const [category, setCategory] = useState('');
  const [count, setCount] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${baseurl}/categories`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleCountChange = (e) => {
    const value = e.target.value;
    // Ensure that the value is a positive number or an empty string
    if (value === '' || (Number(value) >= 0 && /^[0-9]*$/.test(value))) {
      setCount(value);
    }
  };

  const handleAddProduct = async () => {
    if (name === '' || price === '') {
      alert('All fields are required');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('barcode', barcode);
      formData.append('category', category);
      formData.append('count', count);
      if (image) {
        formData.append('image', image);
      }

      const response = await fetch(`${baseurl}/products`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add product');
      }

      const product = await response.json();
      alert('Product added successfully');
      navigate(`/products/category/${product.category}`);
    } catch (error) {
      console.error('Error adding product:', error);
      alert(`Error adding product: ${error.message}`);
    }
  };

  return (
    <div className="container" style={{ backgroundColor: '#F1FAFF', width: '80vh', borderRadius: '20px' }}>
      <h3 className='text-center mt-3 mb-4'>Add a new product</h3>
      <Form>
        <Form.Group controlId="formProductName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formProductPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formProductBarcode">
          <Form.Label>Barcode</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product barcode"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formProductCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select category</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formProductCount">
          <Form.Label>Count</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product count"
            value={count}
            onChange={handleCountChange}
            min="0" // Prevent negative values through the UI
          />
        </Form.Group>
        <Form.Group controlId="formProductImage">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" onChange={handleImageChange} />
        </Form.Group>
        <Button className="mt-4 mb-4" variant="primary" onClick={handleAddProduct}>
          Add
        </Button>
      </Form>
    </div>
  );
};

export default AddProduct;
