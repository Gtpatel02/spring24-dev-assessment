import React from 'react';

const VolunteerNotes = ({ volunteer }) => {

  
  const volunteerNotes = [
    { id: 1, text: 'Note 1' },
    { id: 2, text: 'Note 2' },
  ];

  return (
    <div>
      <h2>Volunteer Notes for {volunteer.name}</h2>
      <ul>
        {volunteerNotes.map((note) => (
          <li key={note.id}>{note.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default VolunteerNotes;