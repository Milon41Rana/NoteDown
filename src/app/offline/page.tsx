import React from 'react';

const OfflinePage = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      textAlign: 'center', 
      backgroundColor: '#f8f9fa' 
    }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>You are offline</h1>
      <p style={{ marginTop: '1rem' }}>Please check your internet connection.</p>
    </div>
  );
};

export default OfflinePage;
