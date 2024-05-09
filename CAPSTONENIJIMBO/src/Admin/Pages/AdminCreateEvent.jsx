import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AdminCreateEvent() {
  const { adminID } = useParams(); // Extract adminID from URL params

  const [eventTitle, setEventTitle] = useState('');
  const [eventStart, setEventStart] = useState('');
  const [eventEnd, setEventEnd] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [eventID, setEventID] = useState(null); // State to hold the event ID
  const [teachers, setTeachers] = useState([]); // State to store the list of teachers
  const [selectedTeacher, setSelectedTeacher] = useState(''); // State to store the selected teacher
  const [message, setMessage] = useState('');
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState('');
 

  useEffect(() => {
    // Fetch teachers when component mounts
    axios.get('http://localhost:8080/getAllSections')
      .then(response => {
        setSections(response.data);
      })
      .catch(error => {
        console.error('Error fetching sections:', error);
      });
  }, []);

  const assignedTeachersIds = []; // Store IDs of teachers already assigned

  const assignedSectionsIds=[];
 

  const handleEventTitleChange = (event) => {
    setEventTitle(event.target.value);
  };

  const handleEventStartChange = (event) => {
    const date = new Date(event.target.value);
    const formattedDate = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    setEventStart(formattedDate);
  };

  const handleEventEndChange = (event) => {
    const date = new Date(event.target.value);
    const formattedDate = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    setEventEnd(formattedDate);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('eventTitle', eventTitle);
      formData.append('eventStart', eventStart);
      formData.append('eventEnd', eventEnd);
      formData.append('image', image);
      formData.append('description', description);

      const response = await axios.post(
        'http://localhost:8080/events',
        formData,
      );

      setEventID(response.data.eventID); // Set the eventID from the response
      setEventTitle('');
      setEventStart('');
      setEventEnd('');
      setDescription('');
      setImage(null);
      setErrorMessage('');
    } catch (error) {
      console.error('Error creating event:', error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
    }
  };

  const EventIDModal = () => {
    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => setEventID(null)}>&times;</span>
          <p>Event ID: {eventID}</p>
          <div>
            <label htmlFor="sectionSelect">Select Section:</label>
            <select
              id="sectionSelect"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
            >
              <option value="">Select Section</option>
              {sections.map((section, index) => (
                !assignedSectionsIds.includes(section.id) && (
                  <option key={index} value={section.id}>
                    {section.sectionName} 
                  </option>
                )
              ))}
            </select>
          </div>
          <button onClick={handleSubmitEvent}>Assign Section</button>
          {message && <p>{message}</p>}
        </div>
      </div>
    );
  };

  const handleSubmitEvent = async () => {
    try {
      const requestData = {
        event: {
          eventID: eventID, // Assuming eventID is obtained from state
          eventTitle: eventTitle,
          eventStart: eventStart,
          eventEnd: eventEnd,
          image: null, // Assuming image is not handled in this part
          description: description
        },
        section: {
          id: selectedSection, // Assuming selectedTeacher is obtained from state
          sectionName: selectedSection, // Assuming selectedTeacher is obtained from state
        }
      };

      const response = await axios.post('http://localhost:8080/assignSectionToEvent', requestData);
      setMessage(response.data);
    } catch (error) {
      setMessage('Failed to assign teacher to event');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Create Event</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Event Title:</label>
          <input type="text" value={eventTitle} onChange={handleEventTitleChange} required />
        </div>
        <div>
          <label>Event Start:</label>
          <input type="date" value={eventStart} onChange={handleEventStartChange} required />
        </div>
        <div>
          <label>Event End:</label>
          <input type="date" value={eventEnd} onChange={handleEventEndChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={handleDescriptionChange} required />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" accept="image/png, image/jpeg" onChange={handleImageChange} />
        </div>
        <button type="submit">Create Event</button>
      </form>
      {eventID && <EventIDModal />}
    </div>
  );
}

export default AdminCreateEvent;
