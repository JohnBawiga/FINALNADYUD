import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for accessibility

function AddSection() {
    const [sectionName, setSectionName] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newSectionId, setNewSectionId] = useState(null);
    const [teacherId, setTeacherId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/getallteachers')
            .then(response => {
                setTeachers(response.data);
            })
            .catch(error => {
                console.error('Error fetching teachers:', error);
            });
    }, []);

    const handleChange = (event) => {
        setSectionName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const newSection = {
            sectionName: sectionName
        };

        axios.post('http://localhost:8080/createSection', newSection)
            .then(response => {
                console.log('Section created:', response.data);
                setNewSectionId(response.data.id);
                setModalIsOpen(true);
            })
            .catch(error => {
                console.error('Error creating section:', error);
                // Optionally, you can show an error message to the user
            });

        // Reset the input field after submission
        setSectionName('');
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setNewSectionId(null);
        setTeacherId('');
        setIsLoading(false);
    };

    const handleSubmitAssignTeacher = () => {
        setIsLoading(true);

        const teacherSectionData = {
            teacher: {
                userid: parseInt(teacherId) // Assuming teacherId is a string, convert it to an integer
            },
            section: {
                id: newSectionId
            }
        };

        axios.post('http://localhost:8080/assignTeacherToSection', teacherSectionData)
            .then(response => {
                console.log('Teacher assigned to section:', response.data);
                // Optionally, you can show a success message to the user
                setIsLoading(false);
                closeModal();
            })
            .catch(error => {
                console.error('Error assigning teacher to section:', error);
                // Optionally, you can show an error message to the user
                setIsLoading(false);
            });
    };

    return (
        <div>
            <h1>Add Section</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Section Name:
                    <input
                        type="text"
                        value={sectionName}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="New Section ID Modal"
            >
                <h2>New Section ID</h2>
                <p>Section ID: {newSectionId}</p>
                <label>
                    Teacher:
                    <select
                        value={teacherId}
                        onChange={(e) => setTeacherId(e.target.value)}
                        required
                    >
                        <option value="">Select Teacher</option>
                        {teachers.map(teacher => (
                            <option key={teacher.userid} value={teacher.userid}>
                                {teacher.firstName}  {teacher.lastName}
                            </option>
                        ))}
                    </select>
                </label>
                <button onClick={handleSubmitAssignTeacher} disabled={isLoading}>
                    {isLoading ? 'Assigning Teacher...' : 'Assign Teacher'}
                </button>
                <button onClick={closeModal} disabled={isLoading}>Close</button>
            </Modal>
        </div>
    );
}

export default AddSection;
