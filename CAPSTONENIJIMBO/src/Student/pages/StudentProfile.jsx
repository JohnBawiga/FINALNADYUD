import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import QRCode from 'react-qr-code';
import './StudentProfile.css';

const StudentProfile = () => {
  const { studentID } = useParams();
  const [student, setStudent] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [allTeachers, setAllTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [updatingTeacher, setUpdatingTeacher] = useState(null);
  const [qrVisible, setQrVisible] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [assignedSections, setAssignedSections] = useState([]);
  const [selectedSectionName, setSelectedSectionName] = useState('');


  const onClickFunction = () => {
   assignSection();
   assignSectionName();

  };
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/teacherstudent/${studentID}`);
        setTeachers(response.data.map(item => item.teacher));
      } catch (error) {
        console.error('Error fetching student or teacher data:', error);
      }
    };

    fetchData();
  }, [studentID]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getByStudentID/${studentID}`);
        setStudent(response.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData();
  }, [studentID]);

  useEffect(() => {
    const fetchAllTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getallteachers');
        setAllTeachers(response.data);
      } catch (error) {
        console.error('Error fetching all teachers:', error);
      }
    };

    fetchAllTeachers();
  }, []);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getAllSections');
        setSections(response.data);
      } catch (error) {
        console.error('Error fetching sections:', error);
      }
    };

    fetchSections();
  }, []);

  useEffect(() => {
    const fetchAssignedSections = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/studentsection/${student.userid}`);
      
        setAssignedSections(response.data);

      } catch (error) {
        console.error('Error fetching assigned sections:', error);
      }
    };

    fetchAssignedSections();
  }, [student.userid]);

  const assignTeacher = async () => {
    try {
      const response = await axios.post('http://localhost:8080/assign', null, {
        params: {
          studentID: studentID,
          userid: selectedTeacher
        }
      });
      setShowModal(true); // Show modal upon successful assignment
    } catch (error) {
      console.error('Error assigning teacher:', error);
    }
  };

  const assignSectionName = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/students/${studentID}/section`, null, {
        params: {
          section: selectedSection
        }
      });
      setShowModal(true); // Show modal upon successful section name assignment
    } catch (error) {
      console.error('Error assigning section name:', error);
    }
  };
  const assignSection = async () => {
    try {
      const response = await axios.post('http://localhost:8080/assignStudentToSection', {
        student: { userid: student.userid },
        section: { id: selectedSection }
      });
      console.log(selectedSectionName );
      setShowModal(true); // Show modal upon successful section assignment
    } catch (error) {
      console.error('Error assigning section:', error);
    }
  };
 
 



  const closeModal = () => {
    setShowModal(false);
    window.location.reload();

  };

  const handleFileChange = (event) => {
    setProfilePicture(event.target.files[0]);
  };

  const updateProfilePicture = async () => {
    try {
      const formData = new FormData();
      formData.append('profile', profilePicture);
      const response = await axios.put(`http://localhost:8080/addpicture/${studentID}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setShowModal(true); // Show modal upon successful picture update
    } catch (error) {
      console.error('Error updating profile picture:', error);
    }
  };

  return (
    <div className='student-profile'>
      <h2>Student Profile</h2>
      <div className="profile-details">
        <div className='student-profile-picture'>
          <div className='profile'>
            {student.profile && <p><img src={`data:image/png;base64,${student.profile}`} alt={student.firstName} /></p>}
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button className='updatephoto' onClick={updateProfilePicture}>Update Profile Picture</button>
          </div>
        </div>
        <div className="student-profile-credentials">
          <p><strong>Student ID:</strong> {student.studentID}</p>
          <p><strong>Name:</strong> {student.firstName} {student.lastName}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Course:</strong> {student.course}</p>
          
          <div className="student-section-dropdown">
  <p>Select Section:</p>
  {assignedSections.length > 0 ? (
    <p>{assignedSections[0].section.sectionName}</p>
  ) : (
    <select onChange={(e) => {
      setSelectedSection(e.target.value);
      setSelectedSectionName(e.target.options[e.target.selectedIndex].text);
    }}>
      <option value="">Select Section</option>
      {sections.map((section) => (
        <option key={section.id} value={section.id}>
          {section.sectionName}
        </option>
      ))}
    </select>
  )}
  {assignedSections.length === 0 && (
    <button onClick={onClickFunction}>Assign Section</button>
  )}
</div>

          {showModal && (
            <div className="modal-overlay">
              <div className="modal">
                <h3>Section Assigned!</h3>
                <button onClick={closeModal}>Close</button>
              </div>
            </div>
          )}
        </div>

        <div className="student-profile-btns">
          <button onClick={() => setQrVisible(!qrVisible)}>
            {qrVisible ? 'Hide QR Code' : 'Show QR Code'}
          </button>
          {qrVisible && (
            <div className="modal-overlay">
              <div className="modal">
                <h3>QR Code for Student ID</h3>
                <QRCode value={student.studentID} />
                <button onClick={closeModal}>Close</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
