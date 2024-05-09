import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import Logo from '../zComponents/images/logo.png'
import './LoginSignup.css';

Modal.setAppElement('#root'); // Set the root element for accessibility

function StudentSignup() {
  const [user, setUser] = useState({
    studentID: '',
    firstName: '',
    lastName: '',
    course: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  //modal function, backend function
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
  
      if (response.ok) {
        setIsSuccessModalOpen(true);
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setError('An error occurred during signup. Please try again later.');
    }
  };

  const closeModal = () => {
    setIsSuccessModalOpen(false);
  };

  return (
    <div>
      <div class="split left">
        <div class="centered">
          <img src={Logo} alt="logo" />
          <p>
            The NSTP is a program aimed at enhancing civic consciousness and defense preparedness in the youth by developing the ethics of service and patriotism while undergoing training in any of its program components. Under the NSTP law, state universities are required to offer ROTC and at least one other NSTP component.
          </p>
          <button className="btnL transparent2" id="sign-up-btn">
            <Link to="/Student/Login" className='linkas'>Log in</Link>
          </button>
        </div>
      </div>
      <Modal
        isOpen={isSuccessModalOpen}
        onRequestClose={closeModal}
        contentLabel="Signup Success Modal"
        style={{
          overlay: {
            zIndex: 1000, // adjust the z-index as needed
          },
          content: {
            zIndex: 1001, // ensure content is above overlay
            backgroundColor: "#E1AC00",
            borderRadius: 20,
            height: 200,
            padding: 10,
          },
        }}
      >
        <h2>Signup Successful!</h2>
        <p>Your account has been created successfully.</p>
        <Link to="/Student/Login">
          <button className='modalbtn' onClick={closeModal}>Close</button>
        </Link>
      </Modal>
      <div class="split right">
        <div class="centered">
          <div className="signup">
            <form action="#" className="sign-up-form" onSubmit={handleSubmit}>
              <h2 className="title">Sign up</h2>
              {error && <div className="error-message">{error}</div>}

              <div className="input-field">
                <i className="fas fa-id-card"></i>
                <input
                  type="text"
                  name="studentID"
                  value={user.studentID}
                  onChange={handleChange}
                  required
                  placeholder="Student ID no."
                />
              </div>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleChange}
                  required
                  placeholder="First Name"
                />
              </div>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Last Name"
                />
              </div>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  name="course"
                  value={user.course}
                  onChange={handleChange}
                  required
                  placeholder="Course"
                />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  required
                  placeholder="Email"
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  required
                  placeholder="Password"
                />
              </div>
              <button type="submit" className="btnL">Sign up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentSignup;