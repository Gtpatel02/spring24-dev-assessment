import React from 'react';
import VolunteerNotesModal from './VolunteerNotesModal';

const VolunteerClicker = ({
  volunteer,
  onRowClick,
  index,
  onEditClick,
  onDeleteClick,
  onViewClick,
  clickCount,
}) => {
  return (
    <tr onClick={() => onRowClick(volunteer)}>
      <td>{volunteer.name}</td>
      <td>
        {volunteer.avatar && <img src={volunteer.avatar} alt="Profile" />}
        {!volunteer.avatar && 'No Image'}
      </td>
      <td>{volunteer.phone}</td>
      <td>{volunteer.email}</td>
      <td>{volunteer.rating}</td>
      <td>{volunteer.status ? 'Active' : 'Inactive'}</td>
      <td>{volunteer.hero_project}</td>
      <td>
        <button onClick={() => onEditClick(index)}>Edit</button>
        <button onClick={() => onDeleteClick(volunteer.id)}>Delete</button>
        <button onClick={() => onViewClick(volunteer)}>View Notes</button>
      </td>
      <td>{clickCount}</td>
    </tr>
  );
};

export default VolunteerClicker;