import React, { useState, useEffect } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { baseurl } from '../baseurl';

const AdminProfile = () => {
  const [admin, setAdmin] = useState({ name: '', email: '' });
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  

  useEffect(() => {
    fetchAdminDetails();
  }, []);

  const fetchAdminDetails = async () => {
    try {
      const response = await fetch(`${baseurl}/admin/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch admin details');
      }
      const data = await response.json();
      setAdmin(data);
    } catch (error) {
      console.error('Error fetching admin details:', error);
    }
  };

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('All password fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${baseurl}/admin/changepassword`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ oldPassword, newPassword, confirmPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to change password');
      }

      alert('Password changed successfully');
      navigate('/');
    } catch (error) {
      console.error('Error changing password:', error);
      setError(error.message);
    }
  };

  return (
    <div className="container" style={{ backgroundColor: '#F1FAFF', width: '100vh', marginTop: '5vh', borderRadius: '20px' }}>
      <h1 className='text-center' style={{ fontSize: '30px', fontWeight: '900', marginBottom: '8px' }}>Hey {admin.name} !</h1>
      <div>
        <p  className='text-center' style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>This is your admin dashboard and</p>
        <p className='text-center' style={{ fontSize: '20px', fontWeight: '500', marginBottom: '12px', }}>the email you've used to sign in is {admin.email}</p>
      </div>
      <h4 className='text-center' style={{ marginBlock: '10px' }}>Would you like to change your password?</h4>
      <Form >
        <Form.Group controlId="formOldPassword"  style={{ marginBlock: '20px' }}>
        
          <Form.Control
            type="password"
            placeholder="Enter old password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formNewPassword"  style={{ marginBlock: '20px' }}>
          
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formConfirmPassword"  style={{ marginBlock: '20px' }}>
          
          <Form.Control
            type="password"
            placeholder="Re-enter new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        {error && <Alert className='mt-3' variant="danger">{error}</Alert>}
        <Button className=' mt-2 mb-4' variant="primary" onClick={handleChangePassword}>
          Confirm
        </Button>
      </Form>

      <Button className=' mb-4'> <Link to="/" className="navbar-link">Logout</Link></Button>
    </div>
  );
};

export default AdminProfile;
