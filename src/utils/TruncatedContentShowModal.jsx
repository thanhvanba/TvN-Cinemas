import React, { useState } from 'react';
import Modal from './Modal';

function TruncatedContentShowModal({ content, maxLength }) {
    if (!content) {
        return null; // Hoặc bạn có thể trả về chuỗi trống hoặc thông báo lỗi khác nếu thích
    }
    const [isTruncated, setIsTruncated] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const toggleTruncate = () => {
        setIsTruncated(!isTruncated);
        openModal
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            {isTruncated ? (
                <p>{content.slice(0, maxLength)} <br />...</p>
            ) : (
                <p>{content}</p>
            )}
            {isTruncated && (
                <button onClick={toggleTruncate}>
                    Xem thêm
                </button>
            )}
            {showModal && (
                <Modal content={content} onClose={closeModal} />
            )}
        </div>
    );
}

export default TruncatedContentShowModal;