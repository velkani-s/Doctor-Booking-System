import Header from "../Header/Header";
import React, { useState } from "react";
// import axios from 'axios';
import supabase from "../../config/supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const DoctorRegister = () => {
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    age: "",
    gender: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email))
      newErrors.email = "Invalid email format.";

    if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone number must be 10 digits.";

    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    if (!formData.age || parseInt(formData.age) < 1)
      newErrors.age = "Valid age is required.";

    if (!formData.gender) newErrors.gender = "Gender is required.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  // console.error("Registration failed:");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) {
      Object.values(errors).forEach((msg) => toast.error(msg));
      return;
    }
    try {
      const { data, error } = await supabase
        .from("DoctorData")
        .insert([formData])
        .select();
      if (error) throw error;
      toast.success("Registration successful!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        age: "",
        gender: "",
      });
      console.log(data);
      
   setTimeout(() => {
    navigate("/DoctorLogin");
   },1000)
      setErrors({});
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Something went wrong. Try again.");
    }
  };
  return (
    <>
      <Header />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
      <div className="register-container">
        <h2>Doctor Registration</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            value={formData.name}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Mobile number"
            onChange={handleChange}
            value={formData.phone}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            onChange={handleChange}
            value={formData.age}
            required
          />
          <select
            name="gender"
            onChange={handleChange}
            value={formData.gender}
            required
          >
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
};

export default DoctorRegister;
