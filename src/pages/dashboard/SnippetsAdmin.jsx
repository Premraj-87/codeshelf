import React, { useState, useEffect } from 'react'
import { loadData, saveData } from "../../utils/localStorage";
import snippetsData from "../../data/snippets.json";

const SnippetsAdmin = () => {
  const [snippets, setSnippets] = useState([]);
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [tags, setTags] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const existing = loadData("snippets", []);
    if (existing.length === 0) {
      saveData("snippets", snippetsData);
      setSnippets(snippetsData);
    } else {
      setSnippets(existing);
    }
  }, []);

  const handleAddOrEdit = () => {
    const tagArray = tags.split(",").map((t) => t.trim()).filter(Boolean);
    if (editId) {
      const updated = snippets.map((s) =>
        s.id === editId
          ? { ...s, title, code, language, tags: tagArray }
          : s
      );
      setSnippets(updated);
      saveData("snippets", updated);
      setEditId(null);
    } else {
      const newSnippet = {
        id: Date.now(),
        title,
        code,
        language,
        tags: tagArray,
        createdAt: new Date().toISOString().slice(0, 10),
      };
      const updated = [newSnippet, ...snippets];
      setSnippets(updated);
      saveData("snippets", updated);
    }
    setTitle("");
    setCode("");
    setLanguage("javascript");
    setTags("");
  };

  const handleEdit = (snippet) => {
    setTitle(snippet.title);
    setCode(snippet.code);
    setLanguage(snippet.language);
    setTags(snippet.tags.join(", "));
    setEditId(snippet.id);
  };

  const handleDelete = (id) => {
    const updated = snippets.filter((s) => s.id !== id);
    setSnippets(updated);
    saveData("snippets", updated);
  };

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 font-semibold tracking-tight">Manage Snippets</h2>

      {/* Add/Edit Snippet Form */}
      <div className="mb-6 border border-gray-200 p-4 md:p-6 rounded-lg bg-white">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 px-3 md:px-4 py-2 w-full mb-3 text-sm md:text-base rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <textarea
          placeholder="Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border border-gray-300 px-3 md:px-4 py-2 w-full mb-3 text-sm md:text-base rounded focus:outline-none focus:ring-2 focus:ring-gray-400 font-mono"
          rows="6"
        />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border border-gray-300 px-3 md:px-4 py-2 w-full mb-3 text-sm md:text-base rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <option>javascript</option>
          <option>python</option>
          <option>html</option>
          <option>css</option>
          <option>react</option>
          <option>sql</option>
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
            {editId ? "Update" : "Add"} Snippet
          </button>
          {editId && (
            <button
              onClick={() => {
                setEditId(null);
                setTitle("");
                setCode("");
                setLanguage("javascript");
                setTags("");
              }}
              className="flex-1 bg-gray-200 text-gray-900 p-2 rounded font-medium hover:bg-gray-300 transition-colors text-sm md:text-base"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Snippets List */}
      <div className="space-y-3">
        {snippets.map((snippet) => (
          <div key={snippet.id} className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg text-gray-900 mb-2">{snippet.title}</h3>
            <p className="text-gray-600 text-sm mb-2">Language: <span className="font-medium text-gray-900">{snippet.language}</span></p>
            <pre className="bg-gray-100 p-3 rounded mb-3 text-sm overflow-x-auto font-mono">
              <code className="text-gray-800">{snippet.code}</code>
            </pre>
            <div className="mb-3">
              {snippet.tags.length > 0 ? (
                snippet.tags.map((tag) => (
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
                onClick={() => handleEdit(snippet)}
                className="bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(snippet.id)}
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

export default SnippetsAdmin
