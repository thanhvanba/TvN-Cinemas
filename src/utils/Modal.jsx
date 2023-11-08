import React, { useState } from 'react';

function Modal({ content, onClose }) {
    return (
        <div className="modal">
            <div className="modal-content">
                <p>{content}</p>
                <button onClick={onClose}>Đóng</button>
            </div>
        </div>
    );
}

export default Modal;
