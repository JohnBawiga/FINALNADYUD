import React from 'react'
import './page.css';
import StudentArticleContent from './StudentArticleContent';

function StudentArticles() {
  return (
    <div>
    <div className='title'>
    <h1> ARTICLES</h1>
    </div>
    <div>
    <StudentArticleContent/>
    </div>
  </div>
    
    )
}

export default StudentArticles