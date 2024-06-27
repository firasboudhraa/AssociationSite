// pages/Profile.jsx

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/globals.css";

const Profile = () => {
  const [image, setImage] = useState(null);
  const [userData, setUserData] = useState(null); 
  const router = useRouter(); 

  useEffect(() => {
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else {
      router.push('/Connexion'); 
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/Connexion'); 
  };

  if (!userData) {
    return null; 
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          {/* User Image */}
          <div className="text-center mb-3">
            <label htmlFor="imageUpload" className="btn btn-primary">
              Upload Image
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                className="d-none"
                onChange={handleImageChange}
              />
            </label>
            {image && (
              <img
                src={image}
                alt="User"
                className="rounded-circle img-fluid mt-3"
                style={{ maxWidth: '150px' }}
              />
            )}
          </div>
          {/* User Details */}
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Name: {userData.name}</h5>
              <p className="card-text">Email: {userData.email}</p>
              {/* Add more user details here */}
              <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          {/* Main Content */}
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">About Me</h5>
              <p className="card-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet feugiat turpis. Nulla facilisi. Nullam in lectus ut turpis fermentum vehicula at et dui. Duis a ante vel eros posuere convallis. Mauris consequat ut nunc eget feugiat.
              </p>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-body">
              <h5 className="card-title">Activities</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Activity 1</li>
                <li className="list-group-item">Activity 2</li>
                <li className="list-group-item">Activity 3</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
