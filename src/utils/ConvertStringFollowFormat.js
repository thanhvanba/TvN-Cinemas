import React from 'react'

const ConvertStringFollowFormat = (str) => {
  return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export default ConvertStringFollowFormat
