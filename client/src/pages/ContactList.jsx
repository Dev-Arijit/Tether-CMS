import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Modal from '../components/Modal';
import { Search, Plus, ChevronLeft, ChevronRight, Eye, Pencil, Trash2, Users, Activity, Filter, ArrowUpDown } from 'lucide-react';

const TAG_COLORS = {
  work: 'bg-blue-50 text-blue-700 border-blue-200',
  family: 'bg-green-50 text-green-700 border-green-200',
  friend: 'bg-purple-50 text-purple-700 border-purple-200',
  emergency: 'bg-red-50 text-red-700 border-red-200',
  other: 'bg-gray-50 text-gray-700 border-gray-200'
};

export default function ContactList() {
  const navigate = useNavigate();
  const { token, API_URL } = useAuth();
  const toast = useToast();
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ open: false, contact: null });

  useEffect(() => {
    fetchContacts();
  }, [search, tagFilter, sortBy, currentPage]);

  const fetchContacts = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: 8,
        sort: sortBy,
        ...(search && { search }),
        ...(tagFilter && { tag: tagFilter })
      });

      const res = await fetch(`${API_URL}/api/auth/contacts?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setContacts(data.contacts || []);
      setTotalPages(data.totalPages || 1);
      setTotal(data.total || 0);
    } catch (err) {
      console.error('Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.contact) return;
    try {
      await fetch(`${API_URL}/api/auth/contact/delete/${deleteModal.contact._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Contact deleted');
      setDeleteModal({ open: false, contact: null });
      fetchContacts();
    } catch {
      toast.error('Failed to delete contact');
    }
  };

  const startIdx = (currentPage - 1) * 8 + 1;
  const endIdx = Math.min(currentPage * 8, total);

  return (
    <div className="p-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <p className="text-sm text-sienna-600 font-medium mb-1">Contacts</p>
          <h1 className="font-heading text-4xl text-sahara-950">Your Network</h1>
          <p className="text-sahara-800 text-sm mt-1">Manage and monitor {total} active connections.</p>
        </div>
        <Link
          to="/add-contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-sienna-600 text-white rounded-lg text-sm font-medium hover:bg-sienna-700 transition-colors shadow-sahara self-start"
        >
          <Plus size={16} /> Add Contact
        </Link>
      </div>

      {/* Stats mini */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl px-5 py-4 shadow-sahara border border-sahara-300/50 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-sienna-600/10 flex items-center justify-center text-sienna-600">
            <Users size={18} />
          </div>
          <div>
            <p className="text-xs text-sahara-800">Total Contacts</p>
            <p className="font-heading text-xl font-semibold text-sahara-950">{total}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl px-5 py-4 shadow-sahara border border-sahara-300/50 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-sienna-600/10 flex items-center justify-center text-sienna-600">
            <Activity size={18} />
          </div>
          <div>
            <p className="text-xs text-sahara-800">Showing</p>
            <p className="font-heading text-xl font-semibold text-sahara-950">{contacts.length}</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sahara-800" />
          <input
            type="text"
            placeholder="Search by name, phone, email, company..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-sahara-600 rounded-lg text-sm placeholder:text-sahara-800/50 focus:outline-none focus:border-sienna-600 focus:ring-2 focus:ring-sienna-600/20 transition-all"
          />
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-sahara-800 pointer-events-none" />
            <select
              value={tagFilter}
              onChange={(e) => { setTagFilter(e.target.value); setCurrentPage(1); }}
              className="pl-8 pr-8 py-2.5 bg-white border border-sahara-600 rounded-lg text-sm appearance-none cursor-pointer focus:outline-none focus:border-sienna-600 focus:ring-2 focus:ring-sienna-600/20 transition-all"
            >
              <option value="">All Tags</option>
              <option value="work">Work</option>
              <option value="family">Family</option>
              <option value="friend">Friend</option>
              <option value="emergency">Emergency</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="relative">
            <ArrowUpDown size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-sahara-800 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="pl-8 pr-8 py-2.5 bg-white border border-sahara-600 rounded-lg text-sm appearance-none cursor-pointer focus:outline-none focus:border-sienna-600 focus:ring-2 focus:ring-sienna-600/20 transition-all"
            >
              <option value="name">A → Z</option>
              <option value="-name">Z → A</option>
              <option value="-createdAt">Newest</option>
              <option value="createdAt">Oldest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contact Cards */}
      {loading ? (
        <div className="text-center py-20 text-sahara-800">Loading contacts...</div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-20">
          <Users size={40} className="mx-auto text-sahara-500 mb-4" />
          <h3 className="font-heading text-xl text-sahara-950 mb-2">No contacts found</h3>
          <p className="text-sahara-800 text-sm mb-4">
            {search || tagFilter ? 'Try adjusting your search or filters.' : 'Get started by adding your first contact.'}
          </p>
          {!search && !tagFilter && (
            <Link to="/add-contact" className="inline-flex items-center gap-2 px-5 py-2.5 bg-sienna-600 text-white rounded-lg text-sm font-medium hover:bg-sienna-700 transition-colors">
              <Plus size={16} /> Add Contact
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {contacts.map(contact => (
            <div
              key={contact._id}
              className="bg-white rounded-xl p-4 shadow-sahara border border-sahara-300/50 hover:shadow-sahara-md hover:border-sienna-600/20 transition-all duration-200 group"
            >
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-11 h-11 rounded-full bg-sienna-600/10 flex items-center justify-center text-sienna-600 font-heading text-lg font-semibold shrink-0 overflow-hidden">
                  {contact.image ? (
                    <img src={contact.image} alt={contact.name} className="w-11 h-11 rounded-full object-cover" />
                  ) : (
                    contact.name?.charAt(0)?.toUpperCase()
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm font-semibold text-sahara-950 truncate">{contact.name}</h3>
                    {contact.tags?.map(tag => (
                      <span key={tag} className={`text-[10px] px-2 py-0.5 rounded-full border font-medium capitalize ${TAG_COLORS[tag] || TAG_COLORS.other}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-sahara-800 truncate">
                    {contact.title && contact.company
                      ? `${contact.title} at ${contact.company}`
                      : contact.title || contact.company || contact.email}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    to={`/contacts/${contact._id}`}
                    className="p-2 rounded-lg text-sahara-800 hover:bg-sahara-200 hover:text-sienna-600 transition-colors"
                    title="View"
                  >
                    <Eye size={16} />
                  </Link>
                  <Link
                    to={`/edit-contact/${contact._id}`}
                    className="p-2 rounded-lg text-sahara-800 hover:bg-sahara-200 hover:text-sienna-600 transition-colors"
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </Link>
                  <button
                    onClick={() => setDeleteModal({ open: true, contact })}
                    className="p-2 rounded-lg text-sahara-800 hover:bg-red-50 hover:text-red-600 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-sahara-300/40">
          <p className="text-xs text-sahara-800">
            Showing {startIdx} to {endIdx} of {total} results
          </p>
          <div className="flex items-center gap-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="p-2 rounded-lg text-sahara-800 hover:bg-sahara-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-sienna-600 text-white'
                    : 'text-sahara-800 hover:bg-sahara-200'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="p-2 rounded-lg text-sahara-800 hover:bg-sahara-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, contact: null })}
        title="Delete Contact"
      >
        <p className="text-sm text-sahara-800 mb-5">
          Are you sure you want to delete <strong className="text-sahara-950">{deleteModal.contact?.name}</strong>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setDeleteModal({ open: false, contact: null })}
            className="px-4 py-2 border border-sahara-600 rounded-lg text-sm font-medium text-sahara-950 hover:bg-sahara-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}