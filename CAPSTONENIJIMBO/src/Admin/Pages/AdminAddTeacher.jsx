import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import './AdminAddTeachers.css'
function AdminAddTeacher() {
    const [formData, setFormData] = useState({
        teacherID: '',
        firstName: '',
        lastName: '',
        assignedYear: '',
        email: '',
        password: '',
        profile:null
      });
    
       // Define state for email and teacherID existence checks
    const [emailExists, setEmailExists] = useState(false);
    const [teacherIDExists, setTeacherIDExists] = useState(false);
      const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      
        if (name === 'email') {
          try {
            const response = await axios.get(`http://localhost:8080/checkEmail/${value}`);
            setEmailExists(response.data);
          } catch (error) {
            console.error('Error checking email:', error);
          }
        } else if (name === 'teacherID') {
          try {
            const response = await axios.get(`http://localhost:8080/checkTeacherID/${value}`);
            setTeacherIDExists(response.data);
          } catch (error) {
            console.error('Error checking teacherID:', error);
          }
        }
      };
      const handleFileChange = (e) => {
        setFormData(prevState => ({
          ...prevState,
          profile: e.target.files[0] // Update profile state with selected file
        }));
      };
    
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          if (emailExists) {
            alert('Email already exists. Please choose different credentials.');
            return;
        }
        if(teacherIDExists){
          alert('Teacher ID already exists. Please choose different credentials.');
          return;
        }
          const formDataToSend = new FormData();
          formDataToSend.append('teacherID', formData.teacherID);
          formDataToSend.append('firstName', formData.firstName);
          formDataToSend.append('lastName', formData.lastName);
          formDataToSend.append('assignedYear', formData.assignedYear);
          formDataToSend.append('email', formData.email);
          formDataToSend.append('password', formData.password);
          formDataToSend.append('profile', formData.profile);
      
          // Send POST request with FormData
          await axios.post('http://localhost:8080/createTeacher', formDataToSend);
      
          // Reset form after successful submission
          setFormData({
            teacherID: '',
            firstName: '',
            lastName: '',
            assignedYear: '',
            email: '',
            password: '',
            profile: null
          });
          alert('Teacher added successfully');
        } catch (error) {
          console.error('Failed to add teacher: ', error);
          alert('Failed to add teacher. Please try again.');
        }
      };
  return (
    <div className="container">
      <div className="title">Add Teacher</div>
      <div className="content">
        <form onSubmit={handleSubmit}>
          <div className="user-details">
            <div className="input-box">
              <span className="details">First Name</span>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter Firstname"
                required
              />
            </div>
            <div className="input-box">
              <span className="details"> Last Name</span>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter Lastname"
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Teacher ID</span>
              <input
                type="text"
                name="teacherID"
                value={formData.teacherID}
                onChange={handleChange}
                placeholder="Enter Teacher ID"
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Assigned Year</span>
              <input
                type="text"
                name="assignedYear"
                value={formData.assignedYear}
                onChange={handleChange}
                placeholder="Assigned Year"
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
           
            <div className="input-box">
              <span className="details">Password</span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Profile Picture</span>
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/png, image/jpeg"// Allow only image files
                required
              />
            </div>
            
          </div>
          <div className="button">
            <input type="submit" value="Register" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminAddTeacher;