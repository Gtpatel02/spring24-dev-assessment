// Volunteers.js
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import EditWindow from './EditWindow';
import VolunteerClicker from './VolunteerClicker';
import VolunteerNotesModal from './VolunteerNotesModal.jsx';

const Volunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [newVolunteer, setNewVolunteer] = useState({
    name: '',
    avatar: null,
    phone: '',
    email: '',
    rating: '',
    status: true,
    hero_project: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const volunteersPerPage = 10;
  const [editIndex, setEditIndex] = useState(null);
  const [clickCounts, setClickCounts] = useState({});
  const [showEditWindow, setShowEditWindow] = useState(false);
  const [editWindowTarget, setEditWindowTarget] = useState(null);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [selectedVolunteerForNotes, setSelectedVolunteerForNotes] = useState(null);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  useEffect(() => {
    const fetchVolunteers = () => {
      fetch('http://localhost:5000/api/bog/users')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => setVolunteers(data))
        .catch((error) => {
          console.error('Error fetching volunteers:', error);
        });
    };

    fetchVolunteers();
  }, []);

  useEffect(() => {
    const renderEditWindow = () => {
      if (showEditWindow && editIndex !== null) {
        const newWindow = window.open('', '_blank');

        if (newWindow) {
          newWindow.document.write('<div id="edit-modal"></div>');

          ReactDOM.render(
            <EditWindow
              volunteer={volunteers[editIndex]}
              onSave={(updatedVolunteer) => saveEdits(updatedVolunteer, editIndex)}
              onClose={closeEditWindow}
            />,
            newWindow.document.getElementById('edit-modal')
          );
        }
      }
    };

    renderEditWindow();
  }, [showEditWindow, editIndex]);

  const addVolunteer = () => {
    const newVolunteerWithFile = {
      ...newVolunteer,
      avatar: newVolunteer.avatar ? URL.createObjectURL(newVolunteer.avatar) : null,
      id: volunteers.length + 1,
      
    };



    setClickCounts((prevCounts) => ({
      ...prevCounts,
      [newVolunteerWithFile.id]: 0, // Initialize click count to 0 for the new volunteer
    }));

    setVolunteers([...volunteers, newVolunteerWithFile]);

    // Reset the form fields
    setNewVolunteer({
      name: '',
      avatar: null,
      phone: '',
      email: '',
      rating: '',
      status: true,
      hero_project: '',
    });

    setEditIndex(null);
  };

  const handleRowClick = (volunteer) => {
    // Update the click count for the volunteer
    setClickCounts((prevCounts) => ({
      ...prevCounts,
      [volunteer.id]: (prevCounts[volunteer.id] || 0) + 1,
    }));
  };

  const showNotes = (volunteer) => {
    setSelectedVolunteerForNotes(volunteer);
    openNotesModal(volunteer); // Open the notes modal when clicking "View Notes"
  };


  const openNotesModal = (volunteer) => {
    setSelectedVolunteerForNotes(volunteer);
    setShowNotesModal(true);
  };

  const closeNotesModal = () => {
    setSelectedVolunteerForNotes(null);
    setShowNotesModal(false);
  };

  const openEditWindow = (index) => {
    setEditIndex(index);
    setShowEditWindow(true);
  };

  const closeEditWindow = () => {
    setEditIndex(null);
    setShowEditWindow(false);
  };

  const saveEdits = (updatedVolunteer, index) => {
    const updatedVolunteers = [...volunteers];
    updatedVolunteers[index] = updatedVolunteer;
    setVolunteers(updatedVolunteers);
    closeEditWindow();
  };

  const deleteVolunteer = (id) => {
    const updatedVolunteers = volunteers.filter((volunteer) => volunteer.id !== id);
    setVolunteers(updatedVolunteers);
  };

  const indexOfLastVolunteer = currentPage * volunteersPerPage;
  const indexOfFirstVolunteer = indexOfLastVolunteer - volunteersPerPage;
  const currentVolunteers = volunteers.slice(indexOfFirstVolunteer, indexOfLastVolunteer);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderEditWindow = () => {
    if (showEditWindow && editWindowTarget !== null) {
      const newWindow = window.open('', '_blank');

      if (newWindow) {
        newWindow.document.write('<div id="edit-modal"></div>');

        ReactDOM.render(
          <EditWindow
            volunteer={volunteers[editWindowTarget]}
            onSave={(updatedVolunteer) => saveEdits(updatedVolunteer, editWindowTarget)}
            onClose={closeEditWindow}
          />,
          newWindow.document.getElementById('edit-modal')
        );
      }
    }
  };

  useEffect(() => {
    renderEditWindow();
  }, [showEditWindow, editWindowTarget]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Profile Picture</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Rating</th>
            <th>Status</th>
            <th>Hero Project</th>
            <th>Actions</th>
            <th>Click Count</th>
          </tr>
        </thead>
        <tbody>
          {currentVolunteers.map((volunteer, index) => (
            <VolunteerClicker
              key={volunteer.id}
              volunteer={volunteer}
              onRowClick={handleRowClick}
              index={index}
              onEditClick={openEditWindow}
              onDeleteClick={deleteVolunteer}
              onViewClick={showNotes}
              clickCount={clickCounts[volunteer.id] || 0}
            />
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{currentPage}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastVolunteer >= volunteers.length}
        >
          Next
        </button>
      </div>

      <div className="add-volunteer-section">
        <h3>Add Volunteer</h3>
        <form>
          <div>
            <label>
              Name:
              <input
                type="text"
                value={newVolunteer.name}
                onChange={(e) => setNewVolunteer({ ...newVolunteer, name: e.target.value })}
              />
            </label>
          </div>
          <div>
            <label>
              Avatar:
              <input
                type="file"
                onChange={(e) => setNewVolunteer({ ...newVolunteer, avatar: e.target.files[0] })}
              />
            </label>
          </div>
          <div>
            <label>
              Phone:
              <input
                type="text"
                value={newVolunteer.phone}
                onChange={(e) => setNewVolunteer({ ...newVolunteer, phone: e.target.value })}
              />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input
                type="text"
                value={newVolunteer.email}
                onChange={(e) => setNewVolunteer({ ...newVolunteer, email: e.target.value })}
              />
            </label>
          </div>
          <div>
            <label>
              Rating:
              <input
                type="text"
                value={newVolunteer.rating}
                onChange={(e) => setNewVolunteer({ ...newVolunteer, rating: e.target.value })}
              />
            </label>
          </div>
          <div>
            <label>
              Status:
              <input
                type="checkbox"
                checked={newVolunteer.status}
                onChange={(e) => setNewVolunteer({ ...newVolunteer, status: e.target.checked })}
              />
            </label>
          </div>
          <div>
            <label>
              Hero Project:
              <input
                type="text"
                value={newVolunteer.hero_project}
                onChange={(e) =>
                  setNewVolunteer({ ...newVolunteer, hero_project: e.target.value })
                }
              />
            </label>
          </div>
          <div>
            <button type="button" onClick={addVolunteer}>
              Add Volunteer
            </button>
          </div>
        </form>

        {showNotesModal && selectedVolunteerForNotes && (
          <VolunteerNotesModal
          volunteer={selectedVolunteerForNotes}
          onClose={closeNotesModal}
          />
          )}

      {showEditWindow && editWindowTarget !== null && (
        <EditWindow
        volunteer={volunteers[editWindowTarget]}
        onSave={(updatedVolunteer) => saveEdits(updatedVolunteer, editWindowTarget)}
        onClose={closeEditWindow}
        />
        )}
      </div>
    </div>
  );
};

export default Volunteers;

    