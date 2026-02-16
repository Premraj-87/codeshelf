import React, { useState } from 'react'
import NotesAdmin from "../dashboard/NotesAdmin";
import SnippetsAdmin from "../dashboard/SnippetsAdmin";
import ResourcesAdmin from "../dashboard/ResourcesAdmin";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('notes');

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="tabs">
        <button 
          className={activeTab === 'notes' ? 'active' : ''} 
          onClick={() => setActiveTab('notes')}
        >
          Notes
        </button>
        <button 
          className={activeTab === 'snippets' ? 'active' : ''} 
          onClick={() => setActiveTab('snippets')}
        >
          Snippets
        </button>
        <button 
          className={activeTab === 'resources' ? 'active' : ''} 
          onClick={() => setActiveTab('resources')}
        >
          Resources
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'notes' && <NotesAdmin />}
        {activeTab === 'snippets' && <SnippetsAdmin />}
        {activeTab === 'resources' && <ResourcesAdmin />}
      </div>
    </div>
  )
}

export default Dashboard