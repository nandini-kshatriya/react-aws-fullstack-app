import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    navigate("/");
  };

  useEffect(() => {
    fetch("https://j8741kd7m8.execute-api.ap-south-1.amazonaws.com/orders")
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-4">
        <h2>Dashboard</h2>
        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="mb-3">Orders from AWS API</h5>

          {loading ? (
            <p>Loading orders...</p>
          ) : (
            <ul className="list-group">
              {orders.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between">
                  {item.name}
                  <span className="badge bg-success">{item.status}</span>
                </li>
              ))}
            </ul>
          )}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;