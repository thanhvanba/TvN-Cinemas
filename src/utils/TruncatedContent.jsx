import React, { useState } from 'react';

const TruncatedContent = ({ content, maxLength }) => {
    if (!content) {
        return null; // Hoặc bạn có thể trả về chuỗi trống hoặc thông báo lỗi khác nếu thích
    }
    const [isTruncated, setIsTruncated] = useState(true);

    const toggleTruncate = () => {
        setIsTruncated(!isTruncated);
    };

    return (
        <div className='flex'>
            {isTruncated ? (
                <p>{content?.slice(0, maxLength)} </p>
            ) : (
                <p>{content}</p>
            )}
            {content.length > maxLength &&
                <button onClick={toggleTruncate}>
                    {isTruncated ? '...' : '<<'}
                </button>}
        </div>
    );
}

export default TruncatedContent;