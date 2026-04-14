import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Modal from '../components/Modal';
import { ArrowLeft, Upload, X, Camera } from 'lucide-react';

const TAGS = ['work', 'family', 'friend', 'emergency', 'other'];

const TAG_COLORS = {
  work: { active: 'bg-blue-600 text-white border-blue-600', inactive: 'bg-white text-blue-700 border-blue-200 hover:bg-blue-50' },
  family: { active: 'bg-green-600 text-white border-green-600', inactive: 'bg-white text-green-700 border-green-200 hover:bg-green-50' },
  friend: { active: 'bg-purple-600 text-white border-purple-600', inactive: 'bg-white text-purple-700 border-purple-200 hover:bg-purple-50' },
  emergency: { active: 'bg-red-600 text-white border-red-600', inactive: 'bg-white text-red-700 border-red-200 hover:bg-red-50' },
  other: { active: 'bg-gray-600 text-white border-gray-600', inactive: 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50' }
};

export default function AddContact() {
  const navigate = useNavigate();
  const { token, API_URL } = useAuth();
  const toast = useToast();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [duplicateModal, setDuplicateModal] = useState({ open: false, contact: null });
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', address: '',
    company: '', title: '', tags: [], notes: '', image: null
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTagToggle = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be under 5MB');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setFormData(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const input = { target: { files: [file] } };
      handleImageUpload(input);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData(prev => ({ ...prev, image: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/contact/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (res.status === 409) {
        setDuplicateModal({ open: true, contact: data.duplicate });
      } else if (res.ok) {
        toast.success('Contact added successfully!');
        navigate('/contacts');
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error('Failed to add contact');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-sahara-800 mb-6">
        <Link to="/contacts" className="hover:text-sienna-600 transition-colors">Contacts</Link>
        <span>/</span>
        <span className="text-sahara-950 font-medium">New Contact</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-4xl text-sahara-950 mb-2">New Contact</h1>
        <p className="text-sahara-800 text-sm">Enter the details of your new professional contact below.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Photo */}
        <div className="bg-white rounded-xl p-6 shadow-sahara border border-sahara-300/50">
          <h3 className="font-heading text-lg text-sahara-950 mb-4">Profile Photo</h3>
          <div
            className="border-2 border-dashed border-sahara-600 rounded-xl p-8 text-center cursor-pointer hover:border-sienna-600 hover:bg-sienna-600/5 transition-all"
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {imagePreview ? (
              <div className="relative inline-block">
                <img src={imagePreview} alt="Preview" className="w-24 h-24 rounded-full object-cover mx-auto" />
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeImage(); }}
                  className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <>
                <div className="w-14 h-14 rounded-full bg-sahara-200 flex items-center justify-center mx-auto mb-3">
                  <Camera size={22} className="text-sahara-800" />
                </div>
                <p className="text-sm text-sahara-950 font-medium">Drag and drop or click to upload photo</p>
                <p className="text-xs text-sahara-800 mt-1">Supported formats: JPG, PNG. Max 5MB.</p>
              </>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {/* Primary Information */}
        <div className="bg-white rounded-xl p-6 shadow-sahara border border-sahara-300/50">
          <h3 className="font-heading text-lg text-sahara-950 mb-4">Primary Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-sahara-950 mb-1.5">Full Name *</label>
              <input
                type="text" name="name" value={formData.name} onChange={handleChange} required
                placeholder="e.g. Sarah Miller"
                className="w-full px-4 py-2.5 bg-white border border-sahara-600 rounded-lg text-sm placeholder:text-sahara-800/50 focus:outline-none focus:border-sienna-600 focus:ring-2 focus:ring-sienna-600/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-sahara-950 mb-1.5">Phone Number *</label>
              <input
                type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                placeholder="e.g. 9876543210"
                className="w-full px-4 py-2.5 bg-white border border-sahara-600 rounded-lg text-sm placeholder:text-sahara-800/50 focus:outline-none focus:border-sienna-600 focus:ring-2 focus:ring-sienna-600/20 transition-all"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-sahara-950 mb-1.5">Email Address *</label>
              <input
                type="email" name="email" value={formData.email} onChange={handleChange} required
                placeholder="e.g. sarah@company.com"
                className="w-full px-4 py-2.5 bg-white border border-sahara-600 rounded-lg text-sm placeholder:text-sahara-800/50 focus:outline-none focus:border-sienna-600 focus:ring-2 focus:ring-sienna-600/20 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Professional Context */}
        <div className="bg-white rounded-xl p-6 shadow-sahara border border-sahara-300/50">
          <h3 className="font-heading text-lg text-sahara-950 mb-4">Professional Context</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-sahara-950 mb-1.5">Company</label>
              <input
                type="text" name="company" value={formData.company} onChange={handleChange}
                placeholder="e.g. Acme Corp"
                className="w-full px-4 py-2.5 bg-white border border-sahara-600 rounded-lg text-sm placeholder:text-sahara-800/50 focus:outline-none focus:border-sienna-600 focus:ring-2 focus:ring-sienna-600/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-sahara-950 mb-1.5">Job Title</label>
              <input
                type="text" name="title" value={formData.title} onChange={handleChange}
                placeholder="e.g. Marketing Director"
                className="w-full px-4 py-2.5 bg-white border border-sahara-600 rounded-lg text-sm placeholder:text-sahara-800/50 focus:outline-none focus:border-sienna-600 focus:ring-2 focus:ring-sienna-600/20 transition-all"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-sahara-950 mb-1.5">Address</label>
              <input
                type="text" name="address" value={formData.address} onChange={handleChange}
                placeholder="e.g. 123 Main Street, City, State"
                className="w-full px-4 py-2.5 bg-white border border-sahara-600 rounded-lg text-sm placeholder:text-sahara-800/50 focus:outline-none focus:border-sienna-600 focus:ring-2 focus:ring-sienna-600/20 transition-all"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-sahara-950 mb-2">Tags</label>
            <div className="flex flex-wrap gap-2">
              {TAGS.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagToggle(tag)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium border capitalize transition-all ${
                    formData.tags.includes(tag) ? TAG_COLORS[tag].active : TAG_COLORS[tag].inactive
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white rounded-xl p-6 shadow-sahara border border-sahara-300/50">
          <h3 className="font-heading text-lg text-sahara-950 mb-4">Private Notes</h3>
          <textarea
            name="notes" value={formData.notes} onChange={handleChange}
            placeholder="Add any personal notes about this contact..."
            rows={4}
            className="w-full px-4 py-2.5 bg-white border border-sahara-600 rounded-lg text-sm placeholder:text-sahara-800/50 focus:outline-none focus:border-sienna-600 focus:ring-2 focus:ring-sienna-600/20 transition-all resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pb-4">
          <button
            type="button"
            onClick={() => navigate('/contacts')}
            className="px-6 py-2.5 border border-sahara-600 rounded-lg text-sm font-medium text-sahara-950 hover:bg-sahara-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-sienna-600 text-white rounded-lg text-sm font-medium hover:bg-sienna-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Save Contact'}
          </button>
        </div>
      </form>

      {/* Duplicate Modal */}
      <Modal
        isOpen={duplicateModal.open}
        onClose={() => setDuplicateModal({ open: false, contact: null })}
        title="Duplicate Contact Detected"
      >
        <p className="text-sm text-sahara-800 mb-4">A contact with similar phone or email already exists:</p>
        <div className="bg-sahara-100 rounded-lg p-4 mb-5 space-y-1">
          <p className="text-sm"><strong>Name:</strong> {duplicateModal.contact?.name}</p>
          <p className="text-sm"><strong>Phone:</strong> {duplicateModal.contact?.phone}</p>
          <p className="text-sm"><strong>Email:</strong> {duplicateModal.contact?.email}</p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => setDuplicateModal({ open: false, contact: null })}
            className="px-4 py-2 bg-sienna-600 text-white rounded-lg text-sm font-medium hover:bg-sienna-700 transition-colors"
          >
            Got it
          </button>
        </div>
      </Modal>
    </div>
  );
}