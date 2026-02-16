import { Link, Routes, Route } from "react-router-dom";
import NotesAdmin from "./dashboard/NotesAdmin";
import SnippetsAdmin from "./dashboard/SnippetsAdmin";
import ResourcesAdmin from "./dashboard/ResourcesAdmin";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-gray-200 min-h-auto md:min-h-screen p-4 md:p-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 tracking-tight">Admin</h2>
        <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible">
          <Link to="notes" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors whitespace-nowrap md:whitespace-normal text-sm md:text-base font-medium">
            Notes
          </Link>
          <Link to="snippets" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors whitespace-nowrap md:whitespace-normal text-sm md:text-base font-medium">
            Snippets
          </Link>
          <Link to="resources" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors whitespace-nowrap md:whitespace-normal text-sm md:text-base font-medium">
            Resources
          </Link>
          <button onClick={logout} className="mt-4 bg-gray-200 text-gray-900 px-4 py-2 rounded hover:bg-gray-300 transition-colors w-full md:w-auto font-medium text-sm md:text-base">
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <Routes>
          <Route path="notes" element={<NotesAdmin />} />
          <Route path="snippets" element={<SnippetsAdmin />} />
          <Route path="resources" element={<ResourcesAdmin />} />
          <Route path="/" element={<div className="text-gray-500 text-sm md:text-base">Select an item to manage</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
