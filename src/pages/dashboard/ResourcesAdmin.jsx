import React, { useState, useEffect } from 'react'
import { loadData, saveData } from "../../utils/localStorage";
import resourcesData from "../../data/resources.json";

const ResourcesAdmin = () => {
  const [resources, setResources] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [type, setType] = useState("link");
  const [tags, setTags] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const existing = loadData("resources", []);
    if (existing.length === 0) {
      saveData("resources", resourcesData);
      setResources(resourcesData);
    } else {
      setResources(existing);
    }
  }, []);

  const handleAddOrEdit = () => {
    const tagArray = tags.split(",").map((t) => t.trim()).filter(Boolean);
    if (editId) {
      const updated = resources.map((r) =>
        r.id === editId
          ? { ...r, title, url, type, tags: tagArray }
          : r
      );
      setResources(updated);
      saveData("resources", updated);
      setEditId(null);
    } else {
      const newResource = {
        id: Date.now(),
        title,
        url,
        type,
        tags: tagArray,
        createdAt: new Date().toISOString().slice(0, 10),
      };
      const updated = [newResource, ...resources];
      setResources(updated);
      saveData("resources", updated);
    }
    setTitle("");
    setUrl("");
    setType("link");
    setTags("");
  };

  const handleEdit = (resource) => {
    setTitle(resource.title);
    setUrl(resource.url);
    setType(resource.type);
    setTags(resource.tags.join(", "));
    setEditId(resource.id);
  };

  const handleDelete = (id) => {
    const updated = resources.filter((r) => r.id !== id);
    setResources(updated);
    saveData("resources", updated);
  };

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 font-semibold tracking-tight">Manage Resources</h2>

      {/* Add/Edit Resource Form */}
      <div className="mb-6 border border-gray-200 p-4 md:p-6 rounded-lg bg-white">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 px-3 md:px-4 py-2 w-full mb-3 text-sm md:text-base rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <input
          type="text"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border border-gray-300 px-3 md:px-4 py-2 w-full mb-3 text-sm md:text-base rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border border-gray-300 px-3 md:px-4 py-2 w-full mb-3 text-sm md:text-base rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <option>link</option>
          <option>pdf</option>
          <option>video</option>
          <option>article</option>
          <option>course</option>
        </select>
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="border border-gray-300 px-3 md:px-4 py-2 w-full mb-3 text-sm md:text-base rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <div className="flex gap-2">
          <button
            onClick={handleAddOrEdit}
            className="flex-1 bg-gray-900 text-white p-2 rounded font-medium hover:bg-gray-800 transition-colors text-sm md:text-base"
          >
            {editId ? "Update" : "Add"} Resource
          </button>
          {editId && (
            <button
              onClick={() => {
                setEditId(null);
                setTitle("");
                setUrl("");
                setType("link");
                setTags("");
              }}
              className="flex-1 bg-gray-200 text-gray-900 p-2 rounded font-medium hover:bg-gray-300 transition-colors text-sm md:text-base"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Resources List */}
      <div className="space-y-3">
        {resources.map((resource) => (
          <div key={resource.id} className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg text-gray-900 mb-2">{resource.title}</h3>
            <p className="text-gray-600 text-sm mb-2">Type: <span className="font-medium text-gray-900">{resource.type}</span></p>
            <a 
              href={resource.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-900 hover:text-gray-600 text-sm mb-3 inline-block font-medium break-all"
            >
              {resource.url}
            </a>
            <div className="mb-3">
              {resource.tags.length > 0 ? (
                resource.tags.map((tag) => (
                  <span key={tag} className="bg-gray-100 text-gray-900 px-2 py-1 rounded text-xs mr-2 inline-block">
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-gray-400 text-xs">No tags</span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(resource)}
                className="bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(resource.id)}
                className="bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ResourcesAdmin
