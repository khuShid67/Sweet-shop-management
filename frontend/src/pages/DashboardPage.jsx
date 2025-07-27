// 📁 File: frontend/src/pages/DashboardPage.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './DashboardPage.css'; // Create this CSS file for styling

function DashboardPage() {
  const [sweets, setSweets] = useState([]);
  const [filters, setFilters] = useState({ name: '', category: '', price_min: '', price_max: '' });
  const [isAdmin, setIsAdmin] = useState(false);
  const [editSweet, setEditSweet] = useState(null);
  const [newSweet, setNewSweet] = useState({ name: '', category: '', price: '', quantity: '' });
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const fetchSweets = async () => {
    try {
      const params = {};
      Object.keys(filters).forEach(key => {
        if (filters[key]) params[key] = filters[key];
      });

      const res = await axios.get('http://localhost:8000/api/sweets/search/', {
        headers: { Authorization: `Bearer ${token}` },
        params
      });
      setSweets(res.data);
    } catch (err) {
      alert('Error fetching sweets.');
    }
  };

  const checkAdmin = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/auth/user/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsAdmin(res.data.is_staff);
    } catch (err) {
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    if (!token) return navigate('/login');
    checkAdmin();
    fetchSweets();
  }, []);

  const handleChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });
  const handleSearch = (e) => { e.preventDefault(); fetchSweets(); };

  const handlePurchase = async (id) => {
    try {
      await axios.post(`http://localhost:8000/api/sweets/${id}/purchase/`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Purchase successful!');
      fetchSweets();
    } catch (err) {
      alert('Purchase failed.');
    }
  };

  const handleEdit = (sweet) => setEditSweet(sweet);
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this sweet?")) {
      try {
        await axios.delete(`http://localhost:8000/api/sweets/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Sweet deleted.');
        fetchSweets();
      } catch (err) {
        alert('Delete failed.');
      }
    }
  };

  return (
      <div className="dashboard">
    <Navbar />
    <h1>Sweet Shop Dashboard</h1>

      <form className="filter-form" onSubmit={handleSearch}>
        <input name="name" placeholder="Search by name" onChange={handleChange} />
        <input name="category" placeholder="Category" onChange={handleChange} />
        <input name="price_min" type="number" placeholder="Min price" onChange={handleChange} />
        <input name="price_max" type="number" placeholder="Max price" onChange={handleChange} />
        <button type="submit">Search</button>
      </form>

      {isAdmin && (
        <form className="sweet-form" onSubmit={async (e) => {
          e.preventDefault();
          try {
            await axios.post('http://localhost:8000/api/sweets/', newSweet, {
              headers: { Authorization: `Bearer ${token}` }
            });
            alert('Sweet added!');
            setNewSweet({ name: '', category: '', price: '', quantity: '' });
            fetchSweets();
          } catch (err) {
            alert('Failed to add sweet.');
          }
        }}>
          <h3>Add New Sweet</h3>
          <input placeholder="Name" value={newSweet.name} onChange={(e) => setNewSweet({ ...newSweet, name: e.target.value })} required />
          <input placeholder="Category" value={newSweet.category} onChange={(e) => setNewSweet({ ...newSweet, category: e.target.value })} required />
          <input type="number" placeholder="Price" value={newSweet.price} onChange={(e) => setNewSweet({ ...newSweet, price: e.target.value })} required />
          <input type="number" placeholder="Quantity" value={newSweet.quantity} onChange={(e) => setNewSweet({ ...newSweet, quantity: e.target.value })} required />
          <button type="submit">Add Sweet</button>
        </form>
      )}

      <ul className="sweet-list">
        {sweets.map(sweet => (
          <li key={sweet.id} className="sweet-item">
            <div>
              <strong>{sweet.name}</strong> ({sweet.category}) - ₹{sweet.price} — Qty: {sweet.quantity}
            </div>
            <div>
              <button disabled={sweet.quantity === 0} onClick={() => handlePurchase(sweet.id)}>
                {sweet.quantity === 0 ? 'Out of Stock' : 'Purchase'}
              </button>
              {isAdmin && (
                <>
                  <button onClick={() => handleEdit(sweet)}>Edit</button>
                  <button onClick={() => handleDelete(sweet.id)}>Delete</button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>

      {editSweet && (
        <form className="sweet-form" onSubmit={async (e) => {
          e.preventDefault();
          try {
            await axios.put(`http://localhost:8000/api/sweets/${editSweet.id}/`, editSweet, {
              headers: { Authorization: `Bearer ${token}` }
            });
            alert('Sweet updated!');
            setEditSweet(null);
            fetchSweets();
          } catch (err) {
            alert('Update failed.');
          }
        }}>
          <h3>Edit Sweet</h3>
          <input value={editSweet.name} onChange={(e) => setEditSweet({ ...editSweet, name: e.target.value })} />
          <input value={editSweet.category} onChange={(e) => setEditSweet({ ...editSweet, category: e.target.value })} />
          <input type="number" value={editSweet.price} onChange={(e) => setEditSweet({ ...editSweet, price: e.target.value })} />
          <input type="number" value={editSweet.quantity} onChange={(e) => setEditSweet({ ...editSweet, quantity: e.target.value })} />
          <button type="submit">Update</button>
          <button type="button" onClick={() => setEditSweet(null)}>Cancel</button>
        </form>
      )}
    </div>
  );
}

export default DashboardPage;