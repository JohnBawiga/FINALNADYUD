import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './page.css';

const StudentContent = () => {
  const [articles, setArticles] = useState([]);
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

    // Clean up function
    return () => {
      setArticles([]);
    };
  }, []);


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
      <div className='modalContentz'>
        <div className='article-image1'>
          {selectedArticle.image && (
            <img src={`data:image/png;base64,${selectedArticle.image}`} alt="Article" />
          )}
        </div>
        <div className='article-content'>
          <h3>{selectedArticle.title}</h3>
          <p>Date Created: {new Date(selectedArticle.date).toLocaleDateString()}</p>
          <p dangerouslySetInnerHTML={{ __html: selectedArticle.description }}></p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="student-articles" >
      {articles.map((article) => (
        <article key={article.articleID} className="article" onClick={() => openModal(article)}>
          
          <div className='article-image'>
            {article.image && (
              <img src={`data:image/png;base64,${article.image}`} alt="Article" />
            )}
          </div>

          <div className='article-content'>
            <h3>{article.title}</h3>
            <p>Article Created: {new Date(article.date).toLocaleDateString()}</p>
            <p dangerouslySetInnerHTML={{ __html: truncateDescription(article.description, 700) }}></p>
          </div>

        </article>
      ))}
    {isModalOpen && modalContent}
    </div>
  );
};

export default StudentContent;
