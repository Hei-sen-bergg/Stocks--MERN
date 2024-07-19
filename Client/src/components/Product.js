import React, { useState, useEffect } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "./Product.css";
import { baseurl } from "../baseurl";

const ProductCard = ({ product, handleDelete }) => {
  // Function to determine if the product count is zero
  const isCountZero = (count) => {
    return count === 0;
  };

  return (
    <Col key={product._id}>
      <Card className={`fixed-card mb-3 ${isCountZero(product.count) ? 'greyscale' : ''}`}>
        <Card.Img variant="top" src={`${baseurl}${product.image}`} alt={product.name} />
        <Card.Body className="text-center">
          <Card.Title style={{ color: '#007efc' }} className="fw-bold">{product.name}</Card.Title>
          <Card.Text style={{ marginBottom: '5px', fontWeight: 'bold' }}>Price : ${product.price}</Card.Text>
          <Card.Text style={{ marginBottom: '5px' }}>Barcode : {product.barcode}</Card.Text>
          <Card.Text style={{ marginBottom: '5px' }}>Category : {product.category.name}</Card.Text>
          <Card.Text style={{ marginBottom: '5px', fontWeight: 'bold' }}>Count: {product.count}</Card.Text>
          <Link to={`/products/${product._id}`} className="mr-2">
            <Button style={{ fontWeight: '500' }} variant="warning" className="mb-3">Edit</Button>
          </Link>
          <Button style={{ fontWeight: '500' }} variant="danger" onClick={() => handleDelete(product._id)} className="ml-2">
            Delete
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

const Products = () => {
  const { categoryId } = useParams(); // Use useParams to get categoryId from the route parameters
  const [categoryName, setCategoryName] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (categoryId) {
      fetchCategoryName();
      fetchProducts();
    }
  }, [categoryId]);

  const fetchCategoryName = async () => {
    try {
      const response = await fetch(`${baseurl}/categories/${categoryId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCategoryName(data.name);
    } catch (error) {
      console.error('Error fetching category name:', error);
    }
  };


  const fetchProducts = async () => {
    try {
      const response = await fetch(`${baseurl}/products/category/${categoryId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmDelete) {
      try {
        await fetch(`${baseurl}/products/${productId}`, {
          method: "DELETE",
        });
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div className="container">

      <div className='row'>
        <div className="col-md-8  mt-3" > {/* Use Bootstrap's grid system to allocate 2/3 of the container width */}
          <h3 style={{ textDecoration: 'none', fontSize: '30px' }}>Here is the list of all products in this "{categoryName}" category.</h3>
        </div>
        <div className='col-md-4 d-flex justify-content-end'>
          <Link to="/products" className="ml-auto d-flex justify-content-end">
            <Button style={{ height: '40px', marginTop: '15px' }} variant="primary">Add Product</Button>
          </Link>
        </div>
      </div>
      <Row xs={1} md={3} className="g-4 mt-1">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} handleDelete={handleDelete} />
        ))}
      </Row>
    </div>
  );
};

export default Products;
