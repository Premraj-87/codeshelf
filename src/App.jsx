import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Notes from "./pages/Notes";
import NoteDetail from "./pages/NoteDetail";
import Snippets from "./pages/Snippet";
import Resources from "./pages/Resources";
import Bookmarks from "./pages/Bookmarks";
import Sidebar from "./components/Sidebar";

// Admin Dashboard
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <div className="flex h-screen bg-white">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto w-full pt-16 md:pt-0">
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/notes/:id" element={<NoteDetail />} />
            <Route path="/snippets" element={<Snippets />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/bookmarks" element={<Bookmarks />} />

            {/* Admin Pages */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Fallback route */}
            <Route path="*" element={<p className="p-6">Page Not Found</p>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
