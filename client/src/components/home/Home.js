import React from 'react';
import './Home.css';

const Home = () => {
  const features = [
    { title: 'Upload Notes', description: 'Easily upload your notes to share with peers.' },
    { title: 'Download Notes', description: 'Download notes from other students.' },
    { title: 'Search Notes', description: 'Find notes quickly with our search feature.' },
    { title: 'Create Notes', description: 'Create notes directly on a canvas.' },
    { title: 'Find Profiles', description: 'Connect with peers and find their profiles.' },
  ];

  return (
    <div className="App">
      <div className="hero">
        <h1 className="hero-heading">Welcome to Student Notes Hub</h1>
      </div>
      <div className="features-container">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
