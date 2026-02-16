import React, { useState, useEffect } from 'react';
import { Card, StatCard } from '../components/DashboardComponents';
import { loadData } from '../utils/localStorage';

const Home = () => {
  const [stats, setStats] = useState({
    totalNotes: 0,
    totalSnippets: 0,
    totalResources: 0,
    bookmarks: 0,
  });

  useEffect(() => {
    const notes = loadData('notes', []);
    const snippets = loadData('snippets', []);
    const resources = loadData('resources', []);
    const bookmarks = loadData('bookmarks', []);

    setStats({
      totalNotes: notes.length,
      totalSnippets: snippets.length,
      totalResources: resources.length,
      bookmarks: bookmarks.length,
    });
  }, []);

  return (
    <div className="p-4 md:p-8 min-h-screen bg-white pt-6 md:pt-4">
      {/* Header */}
      <div className="mb-8 md:mb-12">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1 md:mb-2">CodeShelf</h1>
        <p className="text-sm md:text-base text-gray-500">Your knowledge management hub</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-12">
        <StatCard label="Notes" value={stats.totalNotes} />
        <StatCard label="Snippets" value={stats.totalSnippets} />
        <StatCard label="Resources" value={stats.totalResources} />
        <StatCard label="Bookmarks" value={stats.bookmarks} />
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <Card>
          <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">Notes</h3>
          <p className="text-gray-500 text-xs md:text-sm">Organize and categorize your knowledge.</p>
        </Card>
        
        <Card>
          <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">Code Snippets</h3>
          <p className="text-gray-500 text-xs md:text-sm">Store reusable code with metadata.</p>
        </Card>
        
        <Card>
          <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">Resources</h3>
          <p className="text-gray-500 text-xs md:text-sm">Save learning materials and tools.</p>
        </Card>
      </div>
    </div>
  );
};

export default Home;

