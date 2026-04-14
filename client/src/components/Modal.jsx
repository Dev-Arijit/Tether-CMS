import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-md' }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-sahara-950/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className={`relative bg-white rounded-xl shadow-sahara-lg ${maxWidth} w-full p-6 page-enter`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-heading text-xl text-sahara-950">{title}</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-sahara-800 hover:bg-sahara-200 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  );
}
