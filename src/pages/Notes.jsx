/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { loadData, saveData } from "../utils/localStorage";
import { Link } from "react-router-dom";
import notesData from "../data/notes.json";
import Skeleton from "../components/Skeleton";
import { Card } from "../components/DashboardComponents";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const existingNotes = loadData("notes", []);
    if (existingNotes.length === 0) {
      saveData("notes", notesData);
      setNotes(notesData);
    } else {
      setNotes(existingNotes);
    }

    const savedBookmarks = loadData("bookmarks", []);
    setBookmarks(savedBookmarks);

    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredNotes = notes.filter(
    (note) => {
      const matchesSearch = note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = selectedCategory === "All" || note.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }
  );

  const categories = ["All", ...new Set(notes.map(n => n.category))];

  const toggleBookmark = (note) => {
    let updated;
    if (bookmarks.some((b) => b.id === note.id)) {
      updated = bookmarks.filter((b) => b.id !== note.id);
    } else {
      updated = [note, ...bookmarks];
    }
    setBookmarks(updated);
    saveData("bookmarks", updated);
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-white pt-6 md:pt-4">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1">Notes</h1>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        <div className="lg:col-span-3">
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
        <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notes Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, i) => (
            <Skeleton key={i} height="200px" className="rounded-lg" />
          ))}
        </div>
      ) : filteredNotes.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-lg text-gray-500">No notes found</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredNotes.map((note) => {
            const isBookmarked = bookmarks.some((b) => b.id === note.id);
            return (
              <Card key={note.id} className="flex flex-col hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-bold px-3 py-1 bg-gray-200 text-black rounded-full">
                    {note.category}
                  </span>
                  <button
                    onClick={() => toggleBookmark(note)}
                    className={`text-2xl transition-transform hover:scale-125 ${isBookmarked ? 'text-black' : 'text-gray-400'}`}
                  >
                    {isBookmarked ? "★" : "☆"}
                  </button>
                </div>

                <Link to={`/notes/${note.id}`} className="flex-1">
                  <h3 className="font-bold text-lg text-black mb-2 hover:text-gray-700 transition-colors">
                    {note.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {note.content.slice(0, 100)}...
                  </p>
                </Link>

                <div className="flex flex-wrap gap-2">
                  {note.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                      {tag}
                    </span>
                  ))}
                  {note.tags.length > 2 && (
                    <span className="text-xs px-2 py-1 text-gray-500">+{note.tags.length - 2}</span>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Notes;
