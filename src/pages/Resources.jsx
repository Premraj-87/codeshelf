import { useState, useEffect } from "react";
import { loadData, saveData } from "../utils/localStorage";
import resourcesData from "../data/resources.json";
import Skeleton from "../components/Skeleton";
import { Card } from "../components/DashboardComponents";

const Resources = () => {
  const [resources] = useState(() => {
    const existing = loadData("resources", []);
    if (existing.length === 0) {
      saveData("resources", resourcesData);
      return resourcesData;
    }
    return existing;
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const types = ["All", ...new Set(resources.map(r => r.type))];

  const filtered = resources.filter(
    (r) => {
      const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
      const matchesType = selectedType === "All" || r.type === selectedType;
      return matchesSearch && matchesType;
    }
  );

  return (
    <div className="p-4 md:p-8 min-h-screen bg-white pt-6 md:pt-4">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1">Resources</h1>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        <div className="lg:col-span-3">
          <input
            type="text"
            placeholder="Search resources..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
        <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 md:px-4 py-2 rounded-lg font-medium whitespace-nowrap text-sm md:text-base transition-colors ${
                selectedType === type
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Resources Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, i) => (
            <Skeleton key={i} height="200px" className="rounded-lg" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-2xl text-gray-500">No resources found</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filtered.map((resource) => (
            <Card key={resource.id} className="flex flex-col hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold px-3 py-1 bg-gray-100 text-gray-700 rounded capitalize">
                  {resource.type}
                </span>
              </div>

              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-lg text-gray-900 hover:text-gray-600 transition-colors mb-2 line-clamp-2"
              >
                {resource.title}
              </a>

              <p className="text-sm text-gray-600 mb-4 flex-1 line-clamp-2">
                {resource.url}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {resource.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-4 bg-gray-900 text-white rounded font-medium hover:bg-gray-800 transition-colors text-center text-sm md:text-base"
              >
                Open →
              </a>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Resources;
