import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './TeacherEvents.css';

const TeacherEvents = () => {
    const { teacherID } = useParams();
    const [events, setEvents] = useState([]);
    const [sectionId, setSectionId] = useState(null);
    const [teacher, setTeacher] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch section ID based on teacher ID
                const response = await axios.get(`http://localhost:8080/getbyteacherid/${teacherID}`);
                const responseData = response.data;
                if (responseData.length > 0) {
                    const sectionId = responseData[0].section.id;
                    setSectionId(sectionId);
                    console.log(sectionId);

                    // Fetch events based on section ID
                    const eventsResponse = await axios.get(`http://localhost:8080/sectionevents/${sectionId}`);
                    setEvents(eventsResponse.data);
                } else {
                    console.log('Teacher not found');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [teacherID]);


    return (
        <div className="table-wrapper">
            <h1>Event List</h1>
            <table className="fl-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Description</th>
                        <th>View Student Records</th>
                    </tr>
                </thead>
                <tbody>
                    {events.slice().reverse().map(event => (
                        <tr key={event.eventID}>
                            <td>{event.event.eventTitle}</td>
                            <td>{event.event.eventStart}</td>
                            <td>{event.event.eventEnd}</td>
                            <td>{event.event.description}</td>
                            <td>
                                {/* Link to TeacherAttendance with teacherID and eventID */}
                                <Link to={`/Teacher/Attendance/${teacherID}/${event.event.eventID}`}>
                                    ICON
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TeacherEvents;