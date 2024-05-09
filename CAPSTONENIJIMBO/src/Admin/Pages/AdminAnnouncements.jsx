import React from 'react'
import AdminContent from './AdminContent'
import { Link, useParams } from 'react-router-dom';
import './Admin.css';



function AdminAnnouncements() {
  const {adminID} = useParams();
  return (
    <div>
      <div className='title'>
      <h1> ANNOUNCEMENTS</h1>
      <Link to={`/Admin/CreateAnnouncement/${adminID}`} className='linkad'>Create Announcement</Link>
      </div>
      <div>
      <AdminContent/>
      </div>
    </div>

  )
}

export default AdminAnnouncements