const ConvertStringFollowFormat = (str) => {
  if (typeof str === 'undefined') {
    return '0';
} else {
    return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
}

export default ConvertStringFollowFormat
