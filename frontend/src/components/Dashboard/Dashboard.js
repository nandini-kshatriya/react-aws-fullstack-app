import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
  };

  const fakeData = [
    { id: 1, name: "Order #123", status: "Processed" },
    { id: 2, name: "Order #456", status: "Shipped" },
    { id: 3, name: "Order #789", status: "Delivered" },
  ];

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
          <h5 className="mb-3">Your Data (from API)</h5>
          <ul className="list-group">
            {fakeData.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between">
                {item.name}
                <span className="badge bg-primary">{item.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
