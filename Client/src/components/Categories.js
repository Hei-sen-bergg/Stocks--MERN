import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import './Categories.css'
import { baseurl } from '../baseurl';

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${baseurl}/categories`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDelete = async (categoryId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this category?');
    if (confirmDelete) {
      try {
        await fetch(`${baseurl}/categories/${categoryId}`, {
          method: 'DELETE',
        });
        fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  return (
    <div className="container">
      <div className='row'>
      <div className="col-md-8  mt-3" > {/* Use Bootstrap's grid system to allocate 2/3 of the container width */}
      <h3 style={{ fontWeight: '800' , textDecoration:'none', fontSize:'30px'}}>Welcome to Upstocks,</h3>
      <p style={{   fontWeight: '500',textDecoration:'none', fontSize:'18px', marginBottom:'8px'}}>your platform for managing, updating, and removing categories and products.</p>
      <h3 style={{  fontWeight: '500', textDecoration:'none', fontSize:'18px', marginBottom:'20px', }}>Explore the categories here....</h3>
    </div>
      <div className='col-md-4 d-flex justify-content-end'>  
      <DropdownButton title="Click to add" id="bg-nested-dropdown"   className=" mt-3" >
        <Dropdown.Item eventKey="1"><Link to="/add-category">
        <Button style={{ fontWeight: 'bold' }} variant="primary">Add Category</Button>
      </Link></Dropdown.Item>
        <Dropdown.Item eventKey="2"><Link to="/products">
        <Button style={{ fontWeight: 'bold' }} variant="primary">Add Product</Button>
      </Link></Dropdown.Item>
      </DropdownButton>
      </div>
      </div>

      
      <Row xs={1} md={3} className="g-4">
        {categories.map((category) => (
          <Col key={category._id}>
            <Card className='fixed-card mb-3'>
              <Card.Img variant="top" src={`${baseurl}${category.image}`} alt={category.name} />
              <Card.Body className="text-center">
              <Link to={`/products/category/${category._id}`} style={{ fontWeight: 'bold' , textDecoration:'none', fontSize:'25px'}}>
                  {category.name}
                </Link>
                <Card.Text style={{  fontSize:'15px', fontWeight: '700' }}>{category.description}</Card.Text>
                <Link to={`/update-category/${category._id}`} className="mr-2">
                  <Button style={{  fontWeight: '500'}} variant="warning" className='mb-3'>Edit</Button>
                </Link>
                <Button style={{  fontWeight: '500'}} variant="danger" onClick={() => handleDelete(category._id)} className="ml-2">
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Category;
