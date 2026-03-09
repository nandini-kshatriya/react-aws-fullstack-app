import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUserToken } from "../../services/cognitoAuth";

const Dashboard = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const token = await getCurrentUserToken();

        const res = await fetch(
          "https://j8741kd7m8.execute-api.ap-south-1.amazonaws.com/orders",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#f5f6fa" }}>
      <nav
        style={{
          background: "#2f3640",
          padding: "15px 40px",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h3>AWS Serverless App</h3>
        <button
          onClick={logout}
          style={{
            background: "#e84118",
            border: "none",
            padding: "8px 15px",
            color: "white",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </nav>

      <div style={{ padding: "40px" }}>
        <h2>Dashboard</h2>
        <p>Orders from secured AWS API</p>

        {loading ? (
          <p>Loading...</p>
        ) : orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          <table
            style={{
              width: "100%",
              background: "white",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr style={{ background: "#273c75", color: "white" }}>
                <th style={{ padding: "10px" }}>Order</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td style={{ padding: "10px" }}>{order.name}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;