import { useState } from "react";
import axios from "axios";
import { errorToast, successToast } from "../utils/Toast";
import { Input } from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../utils/Api";

export const Signup = () => {
  const [formData, setFormData] = useState({
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isFormDataFilled = Object.values(formData).every((value) => value.trim() !== "");
    if (!isFormDataFilled) {
      errorToast("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/users/admin/register`, formData);

      if (response?.data?.status === 200) {
        successToast("Successfully signed up");

        setFormData({
          id: "",
          firstname: "",
          lastname: "",
          email: "",
          password: "",
        });

        const token = response?.data?.data?.access_token;
        localStorage.setItem("token", token);
        navigate("/dashboard");

        setLoading(false);
      } else {
        errorToast(response?.data?.message || "Error occurred while signing up");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      errorToast(error?.response?.data?.message || "An error occurred");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="pb-12">
      <h1 className="text-xl text-[#2272C3] font-extrabold text-center my-12">
        LIBRARY MANAGEMENT SYSTEM
      </h1>
      <div className="flex flex-col items-center mt-8 border w-full md:w-[35vw] mx-auto py-8 px-16">
        <h1 className="font-black text-black mb-4 text-xl">Sign Up</h1>
        <p className="text-xs font-light text-gray-400 mb-8">
          To start using lIBRARY MANAGEMENT SYSTEM, you need to create an account.
        </p>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-6">
            <Input
              type="text"
              name="id"
              placeholder="Student ID"
              value={formData.id}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <Input
              type="text"
              name="firstname"
              placeholder="First Name"
              value={formData.firstname}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <Input
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full mb-6 flex justify-center mx-auto text-base px-4 py-3 text-white rounded-md"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
          <p className="text-xs font-light text-gray-400 mb-8">
            Already have an account?{" "}
            <Link to="/login" className="text-[#2272C3]">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
