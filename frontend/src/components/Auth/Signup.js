import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../services/cognitoAuth";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        try {
            await signUp(email, password, email);
            setMessage("Signup successful! Check your email for verification code.");
            setTimeout(() => navigate("/verify"), 1500);
        } catch (err) {
            setError(err.message || "Signup failed");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-sm border-0">
                        <div className="card-body p-4">
                            <h2 className="text-center mb-4">Signup</h2>

                            {error && (
                                <div className="alert alert-danger text-center">{error}</div>
                            )}

                            {message && (
                                <div className="alert alert-success text-center">{message}</div>
                            )}

                            <form onSubmit={handleSignup}>
                                <div className="mb-3">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <button className="btn btn-success w-100">
                                    Create Account
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;