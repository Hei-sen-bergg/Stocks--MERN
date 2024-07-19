import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { baseurl } from '../baseurl';

const AddCategoryPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleAddCategory = async () => {
    try {
      if (name === '' || description === '') {
        alert('Please enter category name and description');
        return;
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      if (image) formData.append('image', image);

      const response = await fetch(`${baseurl}/categories`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add category');
      }

      navigate('/home');
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Error adding category');
    }
  };

  return (
    <div className="container" style={{backgroundColor: '#F1FAFF', width: '80vh', borderRadius:'20px'}}                  >
      <h3 className='text-center mt-3 mb-4'>Add a new category</h3>
      <Form>
        <Form.Group controlId="formCategoryName">
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formCategoryDescription">
          <Form.Label>Category Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formCategoryImage">
          <Form.Label>Category Image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleAddCategory} className=' mt-4 mb-4'>
          Add
        </Button>
      </Form>
    </div>
  );
};

export default AddCategoryPage;
