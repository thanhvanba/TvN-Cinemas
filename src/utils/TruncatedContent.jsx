import React, { useState } from 'react';

function TruncatedContent({ content, maxLength }) {
    if (!content) {
        return null; // Hoặc bạn có thể trả về chuỗi trống hoặc thông báo lỗi khác nếu thích
    }
    const [isTruncated, setIsTruncated] = useState(true);

    const toggleTruncate = () => {
        setIsTruncated(!isTruncated);
    };

    return (
        <div>
            {isTruncated ? (
                <p>{content.slice(0, maxLength)} <br />...</p>
            ) : (
                <p>{content}</p>
            )}
            <button className='font-light text-base' onClick={toggleTruncate}>
                {isTruncated ? 'Xem thêm' : 'Thu gọn'}
            </button>
        </div>
    );
}

export default TruncatedContent;