import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AssignTeacherToEvent() {
  const [event, setEvent] = useState({
    eventID: '',
    eventTitle: '',
    eventStart: '',
    eventEnd: '',
    image: null,
    description: ''
  });
  const [teacher, setTeacher] = useState({
    userid: '', // Changed to userid for consistency
    teacherID: '',
    firstName: '',
    lastName: '',
    assignedYear: '',
    email: '',
    password: ''
  });
  const [events, setEvents] = useState([]); // State to store the list of events
  const [teachers, setTeachers] = useState([]); // State to store the list of teachers
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch events when component mounts
    axios.get('http://localhost:8080/getEvents')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });

    // Fetch teachers when component mounts
    axios.get('http://localhost:8080/getallteachers')
      .then(response => {
        setTeachers(response.data);
      })
      .catch(error => {
        console.error('Error fetching teachers:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/assignTeacherToEvent', {
        event,
        teacher
      });
      setMessage(response.data);
    } catch (error) {
      setMessage('Failed to assign teacher to event');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Assign Teacher to Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="eventID">Select Event:</label>
          <select
            id="eventID"
            value={event.eventID}
            onChange={(e) => setEvent({ ...event, eventID: e.target.value })}
          >
            <option value="">Select an event</option>
            {events.map(event => (
              <option key={event.eventID} value={event.eventID}>
                {event.eventTitle}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="userid">Select Teacher:</label>
          <select
            id="userid"
            value={teacher.userid}
            onChange={(e) => setTeacher({ ...teacher, userid: e.target.value })}
          >
            <option value="">Select a teacher</option>
            {teachers.map(teacher => (
              <option key={teacher.userid} value={teacher.userid}>
                {teacher.firstName} {teacher.lastName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Assign Teacher</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AssignTeacherToEvent;
