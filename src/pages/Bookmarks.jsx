import { useState, useEffect } from "react";
import { loadData, saveData } from "../utils/localStorage";
import { Card } from "../components/DashboardComponents";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const saved = loadData("bookmarks", []);
    setBookmarks(saved);
  }, []);

  const removeBookmark = (id) => {
    const updated = bookmarks.filter(b => b.id !== id);
    setBookmarks(updated);
    saveData("bookmarks", updated);
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-white pt-6 md:pt-4">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1">Bookmarks</h1>
      </div>

      {/* Bookmarks Grid */}
      {bookmarks.length === 0 ? (
        <Card className="text-center py-8 md:py-12">
          <p className="text-xl md:text-2xl text-gray-500 font-semibold">No bookmarks yet</p>
          <p className="text-gray-400 mt-2 text-sm md:text-base">Start bookmarking notes to see them here</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {bookmarks.map((note) => (
            <Card key={note.id} className="flex flex-col hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs md:text-sm font-bold px-2 md:px-3 py-1 bg-amber-100 text-amber-700 rounded-full">
                  {note.category}
                </span>
              </div>

              <h3 className="font-bold text-base md:text-lg text-gray-900 mb-2 line-clamp-2">
                {note.title}
              </h3>
              <p className="text-gray-600 text-xs md:text-sm mb-4 line-clamp-3 flex-1">
                {note.content.slice(0, 150)}...
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {note.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                    #{tag}
                  </span>
                ))}
                {note.tags.length > 2 && (
                  <span className="text-xs px-2 py-1 text-gray-500">+{note.tags.length - 2}</span>
                )}
              </div>

              <button
                onClick={() => removeBookmark(note.id)}
                className="mt-auto py-2 px-4 bg-red-100 text-red-700 rounded font-medium hover:bg-red-200 transition-colors"
              >
                Remove Bookmark
              </button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
