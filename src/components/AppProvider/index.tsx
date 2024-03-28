import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ModalComponent } from '@components/atoms/Modal';
import { ToastContainer } from '@components/atoms/Toast';

const AppProvider = () => {
  return (
    <>
      <ModalComponent />
      <ToastContainer />
    </>
  );
};

export default AppProvider;
