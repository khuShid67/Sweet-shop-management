import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DashboardPage() {
  const [sweets, setSweets] = useState([]);
  const token = localStorage.getItem('token');

  const fetchSweets = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/sweets/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSweets(res.data);
    } catch (err) {
      alert('Error fetching sweets.');
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const handlePurchase = async (id) => {
    try {
      await axios.post(`http://localhost:8000/api/sweets/${id}/purchase/`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Purchase successful!');
      fetchSweets(); // refresh list
    } catch (err) {
      alert('Purchase failed.');
    }
  };

  return (
    <div>
      <h2>Sweet Shop Dashboard</h2>
      <ul>
        {sweets.map(sweet => (
          <li key={sweet.id}>
            <strong>{sweet.name}</strong> ({sweet.category}) - ₹{sweet.price} — Qty: {sweet.quantity}
            <button
              style={{ marginLeft: '10px' }}
              disabled={sweet.quantity === 0}
              onClick={() => handlePurchase(sweet.id)}
            >
              {sweet.quantity === 0 ? 'Out of Stock' : 'Purchase'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DashboardPage;
