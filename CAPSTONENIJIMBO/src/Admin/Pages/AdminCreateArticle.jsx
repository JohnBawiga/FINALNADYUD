import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';
import './adminAnnouncement.css'

function AdminCreateArticle() {
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
        'http://localhost:8080/articles/createart',
        formData,
        
      );

      const createdArticle = response.data; 
      console.log(createdArticle);
      // Reset form fields
      setTitle('');
      setDescription('');
      setImage(null);
      setErrorMessage('');
      // Open success modal
      setSuccessModalOpen(true);
    } catch (error) {
      console.error('Error creating article:', error);
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
      <h2>Create Article</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form className='form create-announcement_form' onSubmit={handleSubmit}>
        <div className="form-row">
          <input type="text" value={title} placeholder='  Article Title' onChange={handleTitleChange} required />
          <input type="date" value={date} onChange={handleDate} required/>
        </div>
          <ReactQuill defaultValue={description} onChange={setDescription} modules={modules} formats={formats} autoFocus/>
          <input classname='addimg' type="file" accept="image/png, image/jpeg" onChange={handleImageChange} required />
          <button className='createbtn' type="submit">Create Article</button>
      </form>
      
      {successModalOpen && (
      <div className="modal1">
          <div className="modal-content1">
          <Link to="/Admin/Articles/:adminID">
          <span className="close1" onClick={handleCloseModal}>&times;</span>
          </Link>
          <p className='message'>Article successfully created!</p>
      </div>
</div>
)}
    </div>
    </section>
  );
}

export default AdminCreateArticle;