import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './page.css';

const StudentContent = () => {
  const [announcements, setAnnouncements] = useState([]);
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
    <div className="admin-announcements" >
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
    </div>
  );
};

export default StudentContent;
