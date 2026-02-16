import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(password)) {
      navigate("/dashboard");
    } else {
      setError("Invalid password");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">CodeShelf</h1>
          <h2 className="text-base md:text-xl text-gray-600 font-semibold">Admin Portal</h2>
        </div>

        <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-lg shadow-sm">
          <div className="mb-6">
            <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
            />
          </div>

          {error && <p className="text-red-600 text-xs md:text-sm mb-4 text-center font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 md:py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors text-sm md:text-base"
          >
            Login
          </button>
        </div>

        <p className="text-center text-gray-500 text-xs md:text-sm mt-6">
          Back to <a href="/" className="text-gray-900 hover:underline font-semibold">CodeShelf</a>
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;
