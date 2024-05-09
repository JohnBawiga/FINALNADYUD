import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AdminTeachers.css';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUserXmark } from '@fortawesome/free-solid-svg-icons';

function AdminTeachers() {
    const [teachers, setTeachers] = useState([]);
    const [teachers1, setTeachers1] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [students, setStudents] = useState([]);
    const [sections, setSections] = useState([]);
    const [selectedSection, setSelectedSection] = useState(null);
    const [sectionName, setSectionName] = useState('');
    const { adminID } = useParams();

    useEffect(() => {
        axios.get('http://localhost:8080/getallteachers')
            .then(response => {
                setTeachers(response.data);
            })
            .catch(error => {
                console.error('Error fetching teachers:', error);
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/getAllSections')
            .then(response => {
                setSections(response.data);
            })
            .catch(error => {
                console.error('Error fetching sections:', error);
            });
    }, []);

    const deleteTeacher = (userid) => {
        axios.delete(`http://localhost:8080/deleteteacher/${userid}`)
            .then(response => {
                setTeachers(teachers.filter(teacher => teacher.userid !== userid));
            })
            .catch(error => {
                if (error.response && error.response.status === 500) {
                    alert("Student is assigned to the teacher. Teacher cannot be deleted.");
                } else {
                    console.error('Error deleting teacher:', error);
                }
            });
    };

    const handleTeacherClick = (teacher) => {
        setSelectedTeacher(teacher);
        setSelectedSection(null); // Reset selected section
        setModalOpen(true);
        // Fetch students associated with the selected teacher
        axios.get(`http://localhost:8080/byteacherid/${teacher.userid}`)
            .then(response => {
                setStudents([]); // Clear students list when a teacher is clicked
                // Set other teacher details if needed
            })
            .catch(error => {
                console.error('Error fetching students:', error);
            });
    };

    const handleSectionClick = (sectionId) => {
        axios.get(`http://localhost:8080/getbySectionid/${sectionId}`)
            .then(response => {
                setSectionName(response.data.sectionName);
            })
            .catch(error => {
                console.error('Error fetching section name:', error);
            });

        // Fetch students associated with the selected section
        axios.get(`http://localhost:8080/sections/${sectionId}`)
            .then(response => {
                setStudents(response.data);
                setSelectedSection(sectionId);
                setModalOpen(true);
                axios.get(`http://localhost:8080/teachersections/${sectionId}`)
                    .then(teacherResponse => {
                        setTeachers1(teacherResponse.data);
                        setSelectedSection(sectionId);
                        setModalOpen(true);
                    })
                    .catch(error => {
                        console.error('Error fetching teachers for section:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching students for section:', error);
            });
    };
    return (
        <div className="container">
            <div className="header">
                <h1>List of Teachers</h1>
                <Link to={`/Admin/AddTeacher/${adminID}`}>
                    <FontAwesomeIcon icon={faPlus} />
                </Link>
            </div>
            <ul>
                {teachers.map(teacher => (
                    <li key={teacher.userid} onClick={() => handleTeacherClick(teacher)}>
                        {teacher.firstName} {teacher.lastName} - ID: {teacher.teacherID}
                        <button onClick={(e) => { e.stopPropagation(); deleteTeacher(teacher.userid) }}>
                            <FontAwesomeIcon icon={faUserXmark} />
                        </button>
                    </li>
                ))}
            </ul>

            {modalOpen && (selectedTeacher || selectedSection) && (
    <div className="modal">
        <div className="modal-content">
            <span className="close" onClick={() => setModalOpen(false)}>&times;</span>
            <h2>Section: {sectionName}</h2> 
           
            {selectedTeacher && (
                <>
                    <div className="image">
                        <div className="circle-1"></div>
                        <div className="circle-2"></div>
                        <img src={`data:image/png;base64,${selectedTeacher.profile}`} alt={selectedTeacher.firstName} />
                    </div>
                    <p>Teacher ID: {selectedTeacher.teacherID}</p>
                    <p>Email: {selectedTeacher.email} </p>
                    <p>Assigned Year: {selectedTeacher.assignedYear}</p>
                </>
            )}
            {selectedSection && (
                <>
                    <h3>Teacher:</h3>
                    <ul>
        {teachers1.map(item => {
    const teacher = item.teacher; // Access the nested teacher object
    console.log(teacher); // Log the teacher object to verify its structure
    return (
        <li key={teacher.userid} >
            {teacher.firstName} {teacher.lastName}  (ID: {teacher.teacherID})
            
        </li>
    );
    
})}
        </ul>
                                <h3>Students:</h3>
                                <ul>
                                    {students.map(student => (
                                        <li key={student.student.userid}>
                                            {student.student.firstName} {student.student.lastName} (ID: {student.student.studentID})
                                        </li>
                                    ))}
                                </ul>
                               
                            </>
                        )}
                    </div>
                </div>
            )}

            <div className="container">
                <div className="header">
                    <h1>List of Sections</h1>
                    <Link to={`/Admin/AddSection/${adminID}`}>
                        <FontAwesomeIcon icon={faPlus} />
                    </Link>
                </div>
                <ul>
                    {sections.map(section => (
                        <li key={section.id} onClick={() => handleSectionClick(section.id)}>
                            {section.sectionName}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default AdminTeachers;
