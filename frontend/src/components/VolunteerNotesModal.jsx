import React from 'react';

const VolunteerNotesModal = ({ volunteer, onClose }) => {
  // Check if volunteer.notes is an array; if not, provide an empty array as the default
  const volunteerNotes = Array.isArray(volunteer.notes) ? volunteer.notes : [];

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Volunteer Notes for {volunteer.name}</h2>
        <ul>
          {volunteerNotes.map((note) => (
            <li key={note.id}>{note.text}</li>
          ))}
        </ul>
        <p>{volunteer.name} is a great volunteer</p>
      </div>
    </div>
  );
};

export default VolunteerNotesModal;