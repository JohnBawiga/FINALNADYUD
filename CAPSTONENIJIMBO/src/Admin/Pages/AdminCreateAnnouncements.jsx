import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';
import './adminAnnouncement.css'

function AdminCreateAnnouncements() {
  const { adminID } = useParams(); // Extract studentID from URL params

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [date, setDate] = useState('');
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  
  const handleCloseModal = () => {
    setSuccessModalOpen(false);
  };

  const handleDate = (event) =>{
    const date = new Date(event.target.value);
    const formattedDate = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    console.log(formattedDate)
    setDate(formattedDate);
  }

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('image', image);
      formData.append('date', date);
      formData.append('adminID', adminID); // Static adminID

      const response = await axios.post(
        'http://localhost:8080/announcements/createann',
        formData,
        
      );

      const createdAnnouncement = response.data; // Assuming the server returns the created announcement object
      console.log(createdAnnouncement);
      // Reset form fields
      setTitle('');
      setDescription('');
      setImage(null);
      setErrorMessage('');
      // Open success modal
      setSuccessModalOpen(true);
    } catch (error) {
      console.error('Error creating announcement:', error);
      // Access specific properties of the error object to render error message
      setErrorMessage(error.response.data.message); // Assuming 'message' holds the error message
    }
  };

  const modules = {
    toolbar: [
      [{ 'header':[1,2,3,4,5,6, false]}],
      [ 'bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];





  return (
    <section className='create-announcement'> 
    <div className='container'>
      <h2>Create Announcement</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form className='form create-announcement_form' onSubmit={handleSubmit}>
        <div className="form-row">
          <input type="text" value={title} placeholder='  Announcement Title' onChange={handleTitleChange} required />
          <input type="date" value={date} onChange={handleDate} required/>
        </div>
          <ReactQuill defaultValue={description} onChange={setDescription} modules={modules} formats={formats} autofocus/>
          <input type="file" accept="image/png, image/jpeg" onChange={handleImageChange} required />
          <button className='createbtn' type="submit">Create Announcement</button>
      </form>
      
      {successModalOpen && (
      <div className="modal1">
          <div className="modal-content1">
          <Link to="/Admin/Announcements/:adminID">
          <span className="close1" onClick={handleCloseModal}>&times;</span>
          </Link>
          <p className='message'>Announcement successfully created!</p>
      </div>
</div>
)}
    </div>
    </section>
  );
}

export default AdminCreateAnnouncements;

{/* <div>
<h1>Create Announcement</h1>
{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
<form onSubmit={handleSubmit}>
  
  <div className='createanntitle'>
    <label>Title:</label>
    <input type="text" value={title} onChange={handleTitleChange} required />
  </div>
  <div>
    <label>Date:</label>
    <input type="date" value={date} onChange={handleDate} required/>
  </div>
  <div>
    <ReactQuill value={description} onChange={handleDescriptionChange} modules={modules} formats={formats}  required/>
  </div>
  <div className='addimage'>
    <input type="file" accept="image/png, image/jpeg" onChange={handleImageChange} />
  </div>
  <button className='createbtn' type="submit">Create Announcement</button>
</form>

{successModalOpen && (
<div className="modal1">
<div className="modal-content1">
<span className="close1" onClick={handleCloseModal}>&times;</span>
<p className='message'>Announcement successfully created!</p>
</div>
</div>
)}
</div> */}

