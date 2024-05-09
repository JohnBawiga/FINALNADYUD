import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';
import * as MdIcon from "react-icons/md";
import * as FaIcon from "react-icons/fa";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AdminContent = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [deleteNoticeOpen, setDeleteNoticeOpen] = useState(false);
  const [deletedAnnouncementId, setDeletedAnnouncementId] = useState(null);
  const [editedAnnouncement, setEditedAnnouncement] = useState({
    announcementID: null,
    title: '',
    description: '',
    date: null,
    image: null,
    adminID: null
  });
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get('http://localhost:8080/announcements/getall');
        setAnnouncements(response.data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchAnnouncements();

    // Clean up function
    return () => {
      setAnnouncements([]);
    };
  }, []);

  const handleDelete = (announcementID) => {
    setDeleteNoticeOpen(true);
    setDeletedAnnouncementId(announcementID);
    closeModal();
  };

  const handleEdit = (announcement) => {
    setEditMode(true);
    setEditedAnnouncement(announcement);
    closeModal();
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/announcements/deleteann/${deletedAnnouncementId}`);
      setAnnouncements(announcements.filter(announcement => announcement.announcementID !== deletedAnnouncementId));
      setDeleteNoticeOpen(false);
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedAnnouncement(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setEditedAnnouncement(prevState => ({
        ...prevState,
        image: reader.result
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedAnnouncement = { ...editedAnnouncement };
  
      await axios.put(
        `http://localhost:8080/announcements/updateann/${editedAnnouncement.announcementID}`,
        updatedAnnouncement
      );
  
      setAnnouncements(prevAnnouncements => {
        return prevAnnouncements.map(announcement => {
          if (announcement.announcementID === editedAnnouncement.announcementID) {
            return updatedAnnouncement;
          } else {
            return announcement;
          }
        });
      });
  
      setEditMode(false);
      console.log('Announcement successfully updated');
    } catch (error) {
      console.error('Error updating announcement:', error);
    }
  };

  if (announcements.length === 0) {
    return <div className='notice'>No Announcement Created</div>;
  }

    const modules = {
    toolbar: [
      [{ 'header':[1,2,3,4,5,6, false]}],
      [ 'bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    }
    return description;
  };

  const openModal = (announcement) => {
    setSelectedAnnouncement(announcement);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedAnnouncement(null);
    setIsModalOpen(false);
  };

  const modalContent = selectedAnnouncement && (
    <div className='modal'>
      <span className='closeButton' onClick={closeModal}>&times;</span>
      <div className='btntop'>
          <button className='deletebtn' onClick={() => handleDelete(selectedAnnouncement.announcementID)}style={{ backgroundColor: '#ff0000', color: '#ffffff', fontSize: '16px' }} >
            <MdIcon.MdOutlineDeleteForever />
          </button>
          <button className='editbtn' onClick={() => handleEdit(selectedAnnouncement)} style={{ backgroundColor: '#00ff00', color: '#ffffff', fontSize: '16px' }}>
            <FaIcon.FaEdit />
          </button>
        </div>
      <div className='modalContentz'>
        <div className='announcement-image'>
          {selectedAnnouncement.image && (
            <img src={`data:image/png;base64,${selectedAnnouncement.image}`} alt="Announcement" />
          )}
        </div>
        <div className='announcement-content'>
          <h3>{selectedAnnouncement.title}</h3>
          <p>Date Created: {new Date(selectedAnnouncement.date).toLocaleDateString()}</p>
          <p dangerouslySetInnerHTML={{ __html: selectedAnnouncement.description }}></p>
        </div>
      </div>
    </div>
  );
  

  return (
    <div className="admin-announcements">
      {announcements.map((announcement) => (
        <article key={announcement.announcementID} className="announcement" onClick={() => openModal(announcement)}>
          <div className='announcement-image'>
            {announcement.image && (
              <img src={`data:image/png;base64,${announcement.image}`} alt="Announcement" />
            )}
          </div>
          <div className='announcement-content'>
            <h3>{announcement.title}</h3>
            <p>Announcement Created: {new Date(announcement.date).toLocaleDateString()}</p>
            <p dangerouslySetInnerHTML={{ __html: truncateDescription(announcement.description, 200) }}></p>
          </div>
        </article>
      ))}

      {isModalOpen && modalContent}

      {editMode && (
        <div className='modal'>
          <span className='closeButton' onClick={() => setEditMode(false)}>&times;</span>
            <h2 className='edittitle1'>Edit Announcement</h2>
          <div className='modalContent'>
            <div className='inputs'>
              <h4>Announcement Title</h4>
              <input className='anntitle' type="text" name="title" value={editedAnnouncement.title || ''} onChange={handleChange} />
              <h4>Description</h4>
              <ReactQuill value={editedAnnouncement.description || ''} onChange={(value) => handleChange({ target: { name: 'description', value } })} modules={modules} formats={formats} required />
              <div className='addfile'>
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </div>
              <button className='savebtn' onClick={handleUpdate} style={{ backgroundColor: '#E1AC00', color: '#ffffff', fontSize: '16px' }}>Save </button >
            </div>
          </div>
        </div>
      )}

      {deleteNoticeOpen && (
        <div className='modalD'>
          <div className='modalContentD'>
            <span className='closeButtonD' onClick={() => setDeleteNoticeOpen(false)}>&times;</span>
            <h2 className='deleteTitle'>Delete Notice</h2>
            <p>Are you sure you want to delete this announcement?</p>
            <div className="deleteOptions">
              <button className="confirmDelete" onClick={handleConfirmDelete}>Yes, Delete</button>
              <button className="cancelDelete" onClick={() => setDeleteNoticeOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminContent;
