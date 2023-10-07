import React from 'react'
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate('/')
    }
  return (
    <div>
      <h1>Ooops</h1>
      <h2>Page Not Found</h2>
      <button onClick={handleNavigate}>
        Back To Home Page
      </button>
    </div>
  )
}

export default PageNotFound;
