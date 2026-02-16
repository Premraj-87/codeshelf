import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/notes', label: 'Notes' },
    { path: '/snippets', label: 'Code' },
    { path: '/resources', label: 'Resources' },
    { path: '/bookmarks', label: 'Bookmarks' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-700 bg-white border border-gray-200"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed md:sticky left-0 top-0 h-screen md:h-auto bg-white border-r border-gray-200 transition-transform duration-300 z-40 w-64 md:relative md:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-gray-200 flex items-center justify-between">
          <h1 className="text-lg md:text-xl font-bold text-gray-900 whitespace-nowrap">CodeShelf</h1>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 md:space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => isMobile && setIsOpen(false)}
              className={`flex items-center space-x-3 px-3 md:px-4 py-2 md:py-3 rounded-lg transition-colors text-sm md:text-base ${
                isActive(item.path)
                  ? 'bg-gray-100 text-gray-900 font-semibold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Admin Link */}
        <div className="p-3 md:p-4 border-t border-gray-200">
          <Link
            to="/admin-login"
            onClick={() => isMobile && setIsOpen(false)}
            className="flex items-center space-x-3 px-3 md:px-4 py-2 md:py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-xs md:text-sm font-medium"
          >
            <span>Admin</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
