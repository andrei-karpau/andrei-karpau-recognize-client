import React, { useState } from 'react';
import './Modal.scss';

// const Modal = ({ modalIsOpen, closeModal, id, children, deleteElement, ...props }) => {
const Modal = ({ modalIsOpen, closeModal, children, detected, ...props }) => {

    if (!modalIsOpen) {
      return null;
    }
  
    const deleteHandler = () => {
    //   deleteElement(props.elementType, id);
    }
  
    return (
      <div className="modal" onClick={closeModal}>
        <div className='modal-grid'>
          <div className="modal-grid__content" onClick={(e) => e.stopPropagation()}>
            <div className='modal-grid__content-wrapper'>
              {children}
            </div>
            <div className='modal-grid__button'>
              <button className='modal-grid__button-cancel' onClick={closeModal}>
                close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Modal;