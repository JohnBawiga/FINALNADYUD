import React from 'react'
import StudentContent from './StudentContent';
import './page.css';

function StudentHomepage() {
  return (
    <div>
      <div className='title'>
      <h1> ANNOUNCEMENTS</h1>
      </div>
      <div>
      <StudentContent/>
      </div>
    </div>

  )
}

export default StudentHomepage