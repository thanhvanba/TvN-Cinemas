import React from 'react';
const getSrcYoutube = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    const ID = (match && match[2].length === 11) ? match[2] : null
    return 'https://www.youtube.com/embed/' + ID
}
export default getSrcYoutube