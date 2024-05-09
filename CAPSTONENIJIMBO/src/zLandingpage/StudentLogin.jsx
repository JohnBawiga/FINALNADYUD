import React, { useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../zComponents/images/logo.png';
import './LoginSignup.css';

const StudentLogin = () => {
  const [studentID, setStudentID] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    try {
      const response = await axios.get('http://localhost:8080/getByUserid', {
        params: { studentID, password },
      });

      // Assuming your API returns the user data on success
      const user = response.data;

      // TODO: Handle successful login, e.g., store user data in state or context
      console.log('Login successful', user);
      // Redirect to the homepage after successful login
      navigate(`/Student/Homepage/${studentID}`);

    } catch (error) {
      setError('Invalid credentials. Please try again.');
      console.error('Login error', error);
    }
  };

  return (
    <div>
      <div className="splitL leftL">
        <div className="centeredL">
          <div className="forms-container">
            <div className="signin">
              <form action="#" className="sign-in-form" onSubmit={handleLogin}>
                <h2 className="title">Log in</h2>
                
                <div className="input-field">
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    value={studentID}
                    placeholder="Student ID no."
                    onChange={(e) => setStudentID(e.target.value)}
                  />
                </div>
                
                <div className="input-field">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <input type="submit" value="Login" className="btnL" />
              </form>
            </div>
          </div>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
      </div>

      <div className="split rightL">
        <div className="centeredL">
          <img src={Logo} alt="logo" />
          <p>
            The NSTP is a program aimed at enhancing civic consciousness and defense preparedness in the youth by
            developing the ethics of service and patriotism while undergoing training in any of its program components.
            Under the NSTP law, state universities are required to offer ROTC and at least one other NSTP component.
          </p>
          <button className="btnL transparent2" id="sign-up-btn">
            <Link to="/Student/Signup" className='linkas'>Sign Up</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentLogin;
