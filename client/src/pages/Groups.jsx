import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Tag, Users, ChevronRight } from 'lucide-react';

const TAG_STYLES = {
  work: 'bg-blue-50 text-blue-700 border-blue-200',
  family: 'bg-green-50 text-green-700 border-green-200',
  friend: 'bg-purple-50 text-purple-700 border-purple-200',
  emergency: 'bg-red-50 text-red-700 border-red-200',
  other: 'bg-gray-50 text-gray-700 border-gray-200'
};

const ALL_TAGS = ['work', 'family', 'friend', 'emergency', 'other'];

export default function Groups() {
  const { token, API_URL } = useAuth();
  const [tagCounts, setTagCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTagCounts();
  }, []);

  const fetchTagCounts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      const counts = {};
      data.tagDistribution?.forEach(item => {
        counts[item._id] = item.count;
      });
      setTagCounts(counts);
    } catch (err) {
      console.error('Failed to fetch tag counts');
    } finally {
      setLoading(false);
    }
  };

  const totalTagged = Object.values(tagCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <p className="text-sm text-sienna-600 font-medium mb-1">Groups</p>
        <h1 className="font-heading text-4xl text-sahara-950">Contact Groups</h1>
        <p className="text-sahara-800 text-sm mt-1">Browse your contacts organized by tags.</p>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-xl p-5 shadow-sahara border border-sahara-300/50 mb-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-sienna-600/10 flex items-center justify-center text-sienna-600">
          <Tag size={20} />
        </div>
        <div>
          <p className="text-sm font-medium text-sahara-950">{totalTagged} tagged contacts</p>
          <p className="text-xs text-sahara-800">Across {Object.keys(tagCounts).length} categories</p>
        </div>
      </div>

      {/* Tag Cards */}
      {loading ? (
        <p className="text-sahara-800">Loading groups...</p>
      ) : (
        <div className="space-y-3">
          {ALL_TAGS.map(tag => (
            <Link
              key={tag}
              to={`/contacts?tag=${tag}`}
              className="group flex items-center justify-between bg-white rounded-xl p-5 shadow-sahara border border-sahara-300/50 hover:shadow-sahara-md hover:border-sienna-600/20 transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <span className={`px-4 py-1.5 rounded-full text-sm font-medium border capitalize ${TAG_STYLES[tag]}`}>
                  {tag}
                </span>
                <div className="flex items-center gap-1.5 text-sahara-800">
                  <Users size={14} />
                  <span className="text-sm">{tagCounts[tag] || 0} contacts</span>
                </div>
              </div>
              <ChevronRight size={16} className="text-sahara-600 group-hover:text-sienna-600 transition-colors" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
