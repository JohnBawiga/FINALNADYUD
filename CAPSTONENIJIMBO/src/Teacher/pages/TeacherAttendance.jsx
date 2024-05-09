import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import QrReader from 'react-qr-scanner';
import axios from 'axios';
import './TeacherAttendance.css';

function TeacherAttendance() {
  const { eventID } = useParams();
  const { teacherID } = useParams();
  const [delay] = useState(100);
  const [result, setResult] = useState('No result');
  const [sections, setSections] = useState([]);
  const [teacherSections, setTeacherSections] = useState([]);
  const [selectedSectionID, setSelectedSectionID] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchSections();
    getByTeacherID();
  }, []);

  const fetchSections = () => {
    axios.get(`http://localhost:8080/sectionevent/${eventID}`)
      .then(response => {
        setSections(response.data.map(section => section.section));
      })
      .catch(error => {
        console.error('Error fetching sections:', error);
      });
  } 

  const getByTeacherID = () => {
    axios.get(`http://localhost:8080/getbyteacherid/${teacherID}`)
      .then(response => {
        setTeacherSections(response.data.map(section => section.section));
      })
      .catch(error => {
        console.error('Error fetching teacher sections:', error);
      });
  }

  const handleScan = (data) => {
    if (data) {
      setResult(data.text);
      fetchSections();
    }
  }

  const handleError = (err) => {
    console.error(err);
  }

  const handleSectionClick = (sectionID) => {
    setSelectedSectionID(sectionID);
    fetchStudents(sectionID);
  }

  const closeModal = () => {
    setSelectedSectionID(null);
    setStudents([]);
  }

  const fetchStudents = (sectionID) => {
    axios.get(`http://localhost:8080/students/section/${sectionID}`)
      .then(response => {
        const studentsData = response.data;
        const promises = studentsData.map(student => {
          // Update the student data with registration status, time in, and time out
          return axios.get(`http://localhost:8080/getstatus/${student.userid}/${eventID}`)
          .then(statusResponse => {
            // Update the student data with registration status, time in, and time out
            student.isRegistered = statusResponse.data.length > 0;
            if (student.isRegistered) {
              student.timeIN = student.isRegistered && statusResponse.data[0].timeIN ? formatDate(statusResponse.data[0].timeIN) : '-';
              student.timeOUT = student.isRegistered && statusResponse.data[0].timeOUT ? formatDate(statusResponse.data[0].timeOUT) : '-';
            }
            return student;
          })
          .catch(error => {
            console.error('Error fetching student status:', error);
            return student;
          });
      });
  
        // Resolve all promises
        Promise.all(promises)
          .then(updatedStudents => {
            setStudents(updatedStudents);
          });
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      });
}
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be considered as 12
    return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
  };
  
  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
  };

  const thTdStyle = {
    border: '1px solid #dddddd',
    textAlign: 'left',
    padding: '8px',
  };

  return (
    <div>
     

      <h2>SECTIONS:</h2>
      {sections.map(section => {
        if (teacherSections.find(teacherSection => teacherSection.id === section.id)) {
          return (
            <div key={section.id}>
              <h3 onClick={() => handleSectionClick(section.id)}>{section.sectionName}</h3>
              {/* Modal */}
              {selectedSectionID === section.id && (
                <div className="modal">
                  <div className="modal-content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <h4>Section:  {section.sectionName}</h4>
                    <table style={tableStyle}>
  <thead>
    <tr>
      <th style={thTdStyle}>Student ID</th>
      <th style={thTdStyle}>Name</th>
      <th style={thTdStyle}>Course</th>
      <th style={thTdStyle}>Email</th>
      <th style={thTdStyle}>Registered</th>
      <th style={thTdStyle}>Time In</th>
      <th style={thTdStyle}>Time Out</th>
    </tr>
  </thead>
  <tbody>
    {students.map(student => (
      <tr key={student.userid}>
        <td style={thTdStyle}>{student.studentID}</td>
        <td style={thTdStyle}>{student.firstName} {student.lastName}</td>
        <td style={thTdStyle}>{student.course}</td>
        <td style={thTdStyle}>{student.email}</td>
        <td style={thTdStyle}>{student.isRegistered ? 'Yes' : 'No'}</td>
        <td style={thTdStyle}>{student.isRegistered ? student.timeIN : '-'}</td>
        <td style={thTdStyle}>{student.isRegistered ? student.timeOUT : '-'}</td>
      </tr>
    ))}
  </tbody>
</table>
                  </div>
                </div>
              )}
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}

export default TeacherAttendance;