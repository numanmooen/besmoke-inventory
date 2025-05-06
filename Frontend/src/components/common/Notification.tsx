import React, { useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

const Notification: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Clear notifications when route changes
    toast.dismiss();
  }, [location.pathname]);

  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 5000,
        style: {
          borderRadius: '4px',
          background: '#333',
          color: '#fff',
        },
      }}
    />
  );
};

export default Notification;