import React from 'react';
import './ContactDetailsModal.css';

const ContactDetailsModal = ({ contact, onClose, onEdit, onDelete }) => {
    if (!contact) return null;

    return (
        <div className="cdm-overlay">
            <div className="cdm-card">
                <div className="cdm-header">Contact Details</div>
                <div className="cdm-body">
                    <div className="cdm-left">
                        <div className="avatar">
                            {contact.image ? (
                                <img src={contact.image} alt={contact.name} />
                            ) : (
                                <div className="avatar-placeholder">
                                    {contact.name ? contact.name.charAt(0).toUpperCase() : 'C'}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="cdm-right">
                        <h2 className="cdm-name">{contact.name}</h2>
                        <ul className="cdm-info">
                            <li><span className="icon">📞</span> {contact.phone}</li>
                            <li><span className="icon">📧</span> {contact.email}</li>
                            <li><span className="icon">📍</span> {contact.address || '—'}</li>
                        </ul>
                        <div className="cdm-actions">
                            <button className="cdm-edit" onClick={onEdit}>Edit</button>
                            <button className="cdm-delete" onClick={() => onDelete(contact._id)}>Delete</button>
                        </div>
                    </div>
                </div>
                <button className="cdm-close" onClick={onClose}>×</button>
            </div>
        </div>
    );
};

export default ContactDetailsModal;
