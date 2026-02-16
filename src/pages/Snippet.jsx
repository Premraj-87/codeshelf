import { useState, useEffect } from "react";
import { loadData, saveData } from "../utils/localStorage";
import snippetsData from "../data/snippets.json";
import Skeleton from "../components/Skeleton";
import { Card } from "../components/DashboardComponents";

const Snippets = () => {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const existing = loadData("snippets", []);
    if (existing.length === 0) {
      saveData("snippets", snippetsData);
      setSnippets(snippetsData);
    } else {
      setSnippets(existing);
    }

    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const languages = ["All", ...new Set(snippets.map(s => s.language))];

  const filtered = snippets.filter(
    (s) => {
      const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
      const matchesLanguage = selectedLanguage === "All" || s.language === selectedLanguage;
      return matchesSearch && matchesLanguage;
    }
  );

  const copyToClipboard = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-white pt-6 md:pt-4">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1">Code Snippets</h1>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        <div className="lg:col-span-3">
          <input
            type="text"
            placeholder="Search snippets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
        <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-3 md:px-4 py-2 rounded-lg font-medium whitespace-nowrap text-sm md:text-base transition-colors ${
                selectedLanguage === lang
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Snippets Grid */}
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array(6).fill(0).map((_, i) => (
            <Skeleton key={i} height="250px" className="rounded-lg" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-2xl text-gray-500">No snippets found</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {filtered.map((snippet) => (
            <Card key={snippet.id} className="flex flex-col hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <span className="text-xs md:text-sm font-bold px-2 md:px-3 py-1 bg-gray-200 text-gray-900 rounded uppercase">
                  {snippet.language}
                </span>
              </div>

              <h3 className="font-bold text-base md:text-lg text-gray-900 mb-3 line-clamp-2">{snippet.title}</h3>

              <pre className="bg-gray-900 text-gray-100 p-3 md:p-4 rounded mb-4 overflow-x-auto text-xs md:text-sm flex-1">
                <code>{snippet.code}</code>
              </pre>

              <div className="flex flex-wrap gap-2 mb-4">
                {snippet.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => copyToClipboard(snippet.code, snippet.id)}
                className={`w-full py-2 px-4 rounded font-medium text-sm md:text-base transition-colors ${
                  copiedId === snippet.id
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                }`}
              >
                {copiedId === snippet.id ? 'Copied' : 'Copy'}
              </button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Snippets;
