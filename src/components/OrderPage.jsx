import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OrderPage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:1337/api/orders');
      setOrders(response.data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Orders List</h1>
      {orders.length === 0 ? (
        <p>Loading orders...</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <h3>Order ID: {order.id}</h3>
              <p>Product: {order.product?.name}</p>
              <p>Status: {order.status}</p>
              <p>Total Price: ${order.totalPrice}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrderPage;
