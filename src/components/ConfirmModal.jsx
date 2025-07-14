import React, { useEffect, useRef } from 'react';
import './ConfirmModal.css';

const ConfirmModal = ({ onConfirm, onCancel }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onCancel(); // Close the modal
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onCancel]);

  return (
    <div className="confirm-overlay">
      <div className="confirm-modal" ref={modalRef}>
        <h3>Are you sure you want to mark this task as completed?</h3>
        <div className="confirm-buttons">
          <button className="confirm-btn" onClick={onConfirm}>Yes</button>
          <button className="cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
