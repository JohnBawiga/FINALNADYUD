import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';
import * as MdIcon from "react-icons/md";
import * as FaIcon from "react-icons/fa";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'


const AdminArticleContent = () => {
  const [articles, setArticles] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [deleteNoticeOpen, setDeleteNoticeOpen] = useState(false);
  const [deletedArticleId, setDeletedArticleId] = useState(null);
  const [editedArticle, setEditedArticle] = useState({
    articleID: null,
    title: '',
    description: '',
    date: null,
    image: null,
    adminID: null
  });
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  


  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:8080/articles/getall');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();

    return () => {
      setArticles([]);
    };
  }, []);

  const handleDelete = (articleID) => {
    setDeleteNoticeOpen(true);
    setDeletedArticleId(articleID);
    closeModal();
  };

  const handleEdit = (article) => {
    setEditMode(true);
    setEditedArticle(article);
    closeModal();
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/articles/deleteart/${deletedArticleId}`);
      setArticles(articles.filter(article => article.articleID !== deletedArticleId));
      setDeleteNoticeOpen(false);
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedArticle(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      console.log('Image base64:', reader.result);
      setEditedArticle(prevState => ({
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
      const updatedArticle = {
        ...editedArticle,
        date: new Date().toISOString(),
      };

      await axios.put(
        `http://localhost:8080/articles/updateart/${editedArticle.articleID}`,
        updatedArticle
      );

      setArticles(prevArticles => {
        return prevArticles.map(article => {
          if (article.articleID === editedArticle.articleID) {
            return updatedArticle;
          } else {
            return article;
          }
        });
      });

      setEditMode(false);
      console.log('Article successfully updated'); // Add this line
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  if (articles.length === 0) {
    return <div className='notice'>No Article Created</div>;
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

  const openModal = (article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedArticle(null);
    setIsModalOpen(false);
  };

  const modalContent = selectedArticle && (
    <div className='modal'>
      <span className='closeButton' onClick={closeModal}>&times;</span>
      <div className='btntop'>
          <button className='deletebtn' onClick={() => handleDelete(selectedArticle.articleID)}style={{ backgroundColor: '#ff0000', color: '#ffffff', fontSize: '16px' }} >
            <MdIcon.MdOutlineDeleteForever />
          </button>
          <button className='editbtn' onClick={() => handleEdit(selectedArticle)} style={{ backgroundColor: '#00ff00', color: '#ffffff', fontSize: '16px' }}>
            <FaIcon.FaEdit />
          </button>
        </div>
      <div className='modalContentz'>
        <div className='announcement-image'>
          {selectedArticle.image && (
            <img src={`data:image/png;base64,${selectedArticle.image}`} alt="Article" />
          )}
        </div>
        <div className='announcement-content'>
          <h3>{selectedArticle.title}</h3>
          <p>Date Created: {new Date(selectedArticle.date).toLocaleDateString()}</p>
          <p dangerouslySetInnerHTML={{ __html: selectedArticle.description }}></p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="admin-announcements">
      {articles.map((article) => (
        <article key={article.articleID} className="announcement" onClick={() => openModal(article)}>
          <div className='announcement-image'>
            {article.image && (
              <img src={`data:image/png;base64,${article.image}`} alt="Article" />
            )}
          </div>
          <div className='announcement-content'>
            <h3>{article.title}</h3>
            <p>Article Posted: {new Date(article.date).toLocaleDateString()}</p>
            <p dangerouslySetInnerHTML={{ __html: truncateDescription(article.description, 500) }}></p>
          </div>
        </article>
      ))}

    {isModalOpen && modalContent}

      {editMode && (
        <div className='modal'>
          <h2 className='edittitle'>Edit Article</h2>
          <span className='closeButton' onClick={() => setEditMode(false)}>&times;</span>
          <div className='modalContent'>
            <div className='inputs'>
              <h4>Article Title</h4>
              <input className='anntitle' type="text" name="title" value={editedArticle.title || ''} onChange={handleChange} />
              <h4>Description</h4>
              <ReactQuill value={editedArticle.description || ''} onChange={(value) => handleChange({ target: { name: 'description', value } })} modules={modules} formats={formats} required />
              <div className='addfile'>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              </div>
              <button className='savebtn' onClick={handleUpdate} style={{ backgroundColor: '#E1AC00', color: '#ffffff', fontSize: '16px' }}>Save</button>
            </div>
          </div>
        </div>
      )}

      {deleteNoticeOpen && (
        <div className='modalD'>
          <div className='modalContentD'>
            <span className='closeButtonD' onClick={() => setDeleteNoticeOpen(false)}>&times;</span>
            <h2 className='deleteTitle'>Delete Notice</h2>
            <p>Are you sure you want to delete this Article?</p>
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

export default AdminArticleContent;
