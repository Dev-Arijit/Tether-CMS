import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Modal from '../components/Modal';
import { ArrowLeft, Phone, Mail, MapPin, Building2, Briefcase, Pencil, Trash2, Tag, FileText, Clock } from 'lucide-react';

const TAG_COLORS = {
  work: 'bg-blue-50 text-blue-700 border-blue-200',
  family: 'bg-green-50 text-green-700 border-green-200',
  friend: 'bg-purple-50 text-purple-700 border-purple-200',
  emergency: 'bg-red-50 text-red-700 border-red-200',
  other: 'bg-gray-50 text-gray-700 border-gray-200'
};

export default function ContactDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, API_URL } = useAuth();
  const toast = useToast();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    fetchContact();
  }, [id]);

  const fetchContact = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Contact not found');
      const data = await res.json();
      setContact(data);
    } catch (err) {
      toast.error('Failed to load contact');
      navigate('/contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`${API_URL}/api/auth/contact/delete/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Contact deleted');
      navigate('/contacts');
    } catch {
      toast.error('Failed to delete contact');
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <p className="text-sahara-800">Loading contact...</p>
      </div>
    );
  }

  if (!contact) return null;

  const createdDate = new Date(contact.createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="p-8 max-w-5xl">
      {/* Back button */}
      <button
        onClick={() => navigate('/contacts')}
        className="inline-flex items-center gap-1.5 text-sm text-sahara-800 hover:text-sienna-600 transition-colors mb-6"
      >
        <ArrowLeft size={16} /> Back to Contacts
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — Profile */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sahara border border-sahara-300/50 text-center">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-sienna-600/10 flex items-center justify-center text-sienna-600 font-heading text-3xl font-semibold mx-auto mb-4 overflow-hidden">
              {contact.image ? (
                <img src={contact.image} alt={contact.name} className="w-24 h-24 rounded-full object-cover" />
              ) : (
                contact.name?.charAt(0)?.toUpperCase()
              )}
            </div>
            <h2 className="font-heading text-2xl text-sahara-950 mb-1">{contact.name}</h2>
            {(contact.title || contact.company) && (
              <p className="text-sm text-sahara-800">
                {contact.title}{contact.title && contact.company ? ' at ' : ''}{contact.company}
              </p>
            )}

            {/* Tags */}
            {contact.tags?.length > 0 && (
              <div className="flex items-center justify-center gap-2 mt-3 flex-wrap">
                {contact.tags.map(tag => (
                  <span key={tag} className={`text-xs px-3 py-1 rounded-full border font-medium capitalize ${TAG_COLORS[tag] || TAG_COLORS.other}`}>
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 mt-5">
              <Link
                to={`/edit-contact/${contact._id}`}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-sienna-600 text-white rounded-lg text-sm font-medium hover:bg-sienna-700 transition-colors"
              >
                <Pencil size={14} /> Edit
              </Link>
              <button
                onClick={() => setDeleteModal(true)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-red-300 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        </div>

        {/* Right — Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <div className="bg-white rounded-xl p-6 shadow-sahara border border-sahara-300/50">
            <h3 className="font-heading text-xl text-sahara-950 mb-5 flex items-center gap-2">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-sahara-200 flex items-center justify-center text-sahara-800 shrink-0">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-xs text-sahara-800 mb-0.5">Phone</p>
                  <p className="text-sm font-medium text-sahara-950">{contact.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-sahara-200 flex items-center justify-center text-sahara-800 shrink-0">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-xs text-sahara-800 mb-0.5">Email</p>
                  <p className="text-sm font-medium text-sahara-950">{contact.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-sahara-200 flex items-center justify-center text-sahara-800 shrink-0">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-xs text-sahara-800 mb-0.5">Address</p>
                  <p className="text-sm font-medium text-sahara-950">{contact.address || '—'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-sahara-200 flex items-center justify-center text-sahara-800 shrink-0">
                  <Building2 size={16} />
                </div>
                <div>
                  <p className="text-xs text-sahara-800 mb-0.5">Company</p>
                  <p className="text-sm font-medium text-sahara-950">{contact.company || '—'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          {contact.notes && (
            <div className="bg-white rounded-xl p-6 shadow-sahara border border-sahara-300/50">
              <h3 className="font-heading text-xl text-sahara-950 mb-3 flex items-center gap-2">
                <FileText size={18} className="text-sienna-600" /> Notes
              </h3>
              <p className="text-sm text-sahara-800 leading-relaxed whitespace-pre-wrap">{contact.notes}</p>
            </div>
          )}

          {/* Activity Timeline */}
          <div className="bg-white rounded-xl p-6 shadow-sahara border border-sahara-300/50">
            <h3 className="font-heading text-xl text-sahara-950 mb-5 flex items-center gap-2">
              <Clock size={18} className="text-sienna-600" /> Activity Timeline
            </h3>
            <div className="relative pl-6 border-l-2 border-sahara-300 space-y-6">
              <div className="relative">
                <div className="absolute -left-[25px] w-3 h-3 rounded-full bg-sienna-600 border-2 border-white" />
                <p className="text-xs text-sahara-800 mb-1">
                  {createdDate}
                </p>
                <p className="text-sm text-sahara-950 font-medium">Contact Created</p>
                <p className="text-xs text-sahara-800 mt-0.5">Profile was added to your network.</p>
              </div>
              {contact.updatedAt !== contact.createdAt && (
                <div className="relative">
                  <div className="absolute -left-[25px] w-3 h-3 rounded-full bg-sahara-500 border-2 border-white" />
                  <p className="text-xs text-sahara-800 mb-1">
                    {new Date(contact.updatedAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </p>
                  <p className="text-sm text-sahara-950 font-medium">Profile Updated</p>
                  <p className="text-xs text-sahara-800 mt-0.5">Contact information was modified.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        title="Delete Contact"
      >
        <p className="text-sm text-sahara-800 mb-5">
          Are you sure you want to delete <strong className="text-sahara-950">{contact.name}</strong>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setDeleteModal(false)}
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
