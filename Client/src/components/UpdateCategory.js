import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { baseurl } from '../baseurl';

const UpdateCategoryPage = ({ fetchCategories }) => {
  const { categoryId } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategoryDetails();
  }, []);

  const fetchCategoryDetails = async () => {
    try {
      const response = await fetch(`${baseurl}/categories/${categoryId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setName(data.name);
      setDescription(data.description);
      setImage(data.image);
    } catch (error) {
      console.error('Error fetching category details:', error);
    }
  };

  const handleUpdateCategory = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      if (image instanceof File) {
        formData.append('image', image);
      }

      await fetch(`${baseurl}/categories/${categoryId}`, {
        method: 'PUT',
        body: formData,
      });

      navigate(`/home`);
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  return (
    <div className="container">
      <h1>Update Category</h1>
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
        <Button variant="primary" onClick={handleUpdateCategory}>
          Update
        </Button>
      </Form>
    </div>
  );
};

export default UpdateCategoryPage;
