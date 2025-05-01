import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PatientLogin.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../Header/Header";
import supabase from "../../../config/supabaseClient";
import Footer from "../../footer/Footer";


const PatientLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      toast.error("Please enter email and password.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("formData")
        .select("*")
        .eq("email", credentials.email)
        .eq("password", credentials.password)
        .single();

      if (error || !data) {
        toast.error("Invalid email or password.");
        return;
      }

      toast.success("Login successful!");

      // You can store user session in localStorage if needed
      localStorage.setItem("patient", JSON.stringify(data));

      setTimeout(() => {
        navigate("/patientDashboard"); // Change to your actual dashboard route
      }, 1000);
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Login failed. Try again.");
    }
  };
  return (
    <>
      <Header />
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="login-container">
        <h2>Patient Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default PatientLogin;
