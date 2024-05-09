import React from 'react'
import AdminEventContent from './AdminEventContent'
import { Link, useParams } from 'react-router-dom';
import './Admin.css';



function AdminEvents() {
  const {adminID} = useParams();
  return (
    <div>
      <div className='title'>
      <h1> EVENTS</h1>
      <Link to={`/Admin/CreateEvent/${adminID}`} className='linkad'>Create Event</Link>
      </div>
      <div>
      <AdminEventContent/>
      </div>
    </div>

  )
}

export default AdminEvents