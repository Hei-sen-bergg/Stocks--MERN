import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const About = () => {
  return (
  
    <Container className="mt-5">
      <Row>
        <Col md={12}>
          <h1 className="text-center mb-4">About Us</h1>
        </Col>
      </Row>
      <Row>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>About the Project</Card.Title>
              <Card.Text>
                Our Inventory Management System is designed to help businesses efficiently manage their stock and inventory. With features like product tracking, barcode scanning, and detailed reporting, our system ensures that you always have up-to-date information on your inventory levels.
              </Card.Text>
              <Card.Text>
                This project aims to streamline the inventory process, reduce human errors, and improve overall productivity. Whether you are a small business or a large enterprise, our solution is scalable to meet your needs.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>About the Developers</Card.Title>
              <Card.Text>
              This project was developed by me, Senraj. With a passion for creating innovative solutions to real-world problems, I have combined expertise in web development, database management, and user experience design to deliver a comprehensive inventory management system.
              </Card.Text>
              <Card.Text>
              I hope you find this service helpful and enjoy using it as much as I enjoyed creating it. If you have any questions or need support, feel free to contact me. Your feedback is valuable and helps in continuously improving the product.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};


export default About;
