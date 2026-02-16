import { useState, useEffect } from "react";
import { loadData, saveData } from "../../utils/localStorage";
import notesData from "../../data/notes.json";

const NotesAdmin = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null); // ✅ edit state
  const [category, setCategory] = useState("General");
  const [tags, setTags] = useState("");

  useEffect(() => {
    const existing = loadData("notes", []);
    if (existing.length === 0) {
      saveData("notes", notesData);
      setNotes(notesData);
    } else {
      setNotes(existing);
    }
  }, []);

  const handleAddOrEdit = () => {
    const tagArray = tags.split(",").map((t) => t.trim()).filter(Boolean);
    if (editId) {
      // Edit existing note
      const updated = notes.map((n) =>
        n.id === editId
          ? { ...n, title, content, category, tags: tagArray }
          : n
      );
      setNotes(updated);
      saveData("notes", updated);
      setEditId(null);
    } else {
      // Add new note
      const newNote = {
        id: Date.now(),
        title,
        content,
        category,
        tags: tagArray,
        createdAt: new Date().toISOString().slice(0, 10),
      };
      const updated = [newNote, ...notes];
      setNotes(updated);
      saveData("notes", updated);
    }
    setTitle("");
    setContent("");
    setCategory("General");
    setTags("");
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setCategory(note.category);
    setTags(note.tags.join(", "));
    setEditId(note.id);
  };

  const handleDelete = (id) => {
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    saveData("notes", updated);
  };

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 font-semibold tracking-tight\">Manage Notes</h2>

      {/* Add/Edit Note Form */}
      <div className="mb-6 border border-gray-200 p-4 md:p-6 rounded-lg bg-white\">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 px-3 md:px-4 py-2 w-full mb-3 text-sm md:text-base rounded focus:outline-none focus:ring-2 focus:ring-gray-400\"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border border-gray-300 px-3 md:px-4 py-2 w-full mb-3 text-sm md:text-base rounded focus:outline-none focus:ring-2 focus:ring-gray-400\"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 px-3 md:px-4 py-2 w-full mb-3 text-sm md:text-base rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="border border-gray-300 px-3 md:px-4 py-2 w-full mb-3 text-sm md:text-base rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <button
          onClick={handleAddOrEdit}
          className="bg-gray-900 text-white p-2 rounded w-full font-medium hover:bg-gray-800 transition-colors text-sm md:text-base"
        >
          {editId ? "Update Note" : "Add Note"}
        </button>
      </div>

      {/* Notes List */}
      <div className="space-y-3">
        {notes.map((note) => (
          <div
            key={note.id}
            className="border border-gray-200 p-4 rounded-lg flex justify-between items-start hover:shadow-md transition-shadow"
          >
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-1">{note.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{note.content.slice(0, 100)}...</p>
              <div className="text-xs text-gray-500">
                <span className="inline-block mr-4">Category: <span className="text-gray-700 font-medium">{note.category}</span></span>
                <span>Tags: {note.tags.length > 0 ? note.tags.join(", ") : 'None'}</span>
              </div>
            </div>
            <div className="flex gap-2 ml-4">
              <button
                onClick={() => handleEdit(note)}
                className="bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(note.id)}
                className="bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesAdmin;
