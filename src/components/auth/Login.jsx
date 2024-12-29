import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, formData);
      console.log(res);
      if (res.status === 201) {
        toast.success(res.data.message);
        const token = res.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("activeUserId", res.data.user_id);
        setFormData({
          username: "",
          password: "",
        });

        if (token) {
          navigate("/");
        }
      }
    } catch (e) {
      if (e.response && e.response.status) {
        console.log(e);
        toast.error(e.response.data.error);
      } else {
        console.error(e);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen  bg-[#0A0A0A]">
      <Toaster />
        <h5 className="text-center text-xl font-bold dark:text-white mb-10">
          Log in{" "}
        </h5>
        <form className="max-w-sm mx-auto">
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              username
            </label>
            <input
              value={formData.username}
              onChange={handleChange}
              type="text"
              name="username"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              password
            </label>
            <input
              value={formData.password}
              onChange={handleChange}
              name="password"
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <a
            href="/signin"
            className="text-blue-600 underline dark:text-blue-500 ml-6"
          >
            create a new account
          </a>
        </form>
      </div>
  );
};

export default Login;
