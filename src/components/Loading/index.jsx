import React from 'react'
import bg from '../../images/025001-curve-bars.svg'

const Loading = () => {
    return (
        <div className='h-full'>
            <div className='flex justify-center items-center h-full'>
                <div style={{
                    backgroundImage: `url(${bg})`,
                    backgroundPosition: 'center', // Vị trí ảnh nền sẽ được căn giữa
                    backgroundRepeat: 'no-repeat', // Ngăn lặp lại ảnh nền 
                    // backgroundColor: 'rgba(0, 0, 0, 0.2)'
                }}
                    className=' w-20 h-20 z-50'
                >
                </div>
            </div>
        </div>
    )
}

export default Loading
