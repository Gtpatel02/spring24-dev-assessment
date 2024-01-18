import React, { useState } from 'react';

const EditWindow = ({ volunteer, onSave, onClose }) => {
  const [editedName, setEditedName] = useState(volunteer.name);
  const [editedAvatar, setEditedAvatar] = useState(volunteer.avatar);
  const [editedPhone, setEditedPhone] = useState(volunteer.phone);
  const [editedEmail, setEditedEmail] = useState(volunteer.email);
  const [editedRating, setEditedRating] = useState(volunteer.rating);
  const [editedStatus, setEditedStatus] = useState(volunteer.status);
  const [editedHeroProject, setEditedHeroProject] = useState(volunteer.hero_project);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveEdits = () => {
    onSave({
      ...volunteer,
      name: editedName,
      avatar: editedAvatar,
      phone: editedPhone,
      email: editedEmail,
      rating: editedRating,
      status: editedStatus,
      hero_project: editedHeroProject,
    });
    onClose();
  };

  const cancelEdit = () => {
    onClose();
  };

  return (
    <div>
      <h2>Edit Volunteer</h2>
      <label>
        Name:
        <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
      </label>
      <label>
        Avatar:
        <input type="file" onChange={handleAvatarChange} />
        {editedAvatar && <img src={editedAvatar} alt="Avatar Preview" style={{ width: '50px' }} />}
      </label>
      <label>
        Phone:
        <input type="text" value={editedPhone} onChange={(e) => setEditedPhone(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="text" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} />
      </label>
      <label>
        Rating:
        <input type="text" value={editedRating} onChange={(e) => setEditedRating(e.target.value)} />
      </label>
      <label>
        Status:
        <input
          type="checkbox"
          checked={editedStatus}
          onChange={(e) => setEditedStatus(e.target.checked)}
        />
      </label>
      <label>
        Hero Project:
        <input
          type="text"
          value={editedHeroProject}
          onChange={(e) => setEditedHeroProject(e.target.value)}
        />
      </label>
      <button onClick={saveEdits}>Save</button>
    </div>
  );
};

export default EditWindow;