import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { confirmSignUp } from "../../services/cognitoAuth";

const VerifyAccount = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await confirmSignUp(email, code);
      alert("Account verified! You can login now.");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h3>Verify your account</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleVerify}>
        <input
          type="email"
          placeholder="Enter email"
          className="form-control mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Enter verification code"
          className="form-control mb-3"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />

        <button className="btn btn-primary">Verify</button>
      </form>
    </div>
  );
};

export default VerifyAccount;