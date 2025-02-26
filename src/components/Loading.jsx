import React from 'react'
import {LoadingLogo} from '../assets/SvgFile';

const Loading = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
       <div aria-label="Loading..." role="status" className="flex items-center space-x-2">
       <LoadingLogo/>
        <span className="text-4xl font-medium text-gray-500">Loading...</span>
      </div>
    </div>
  )
}

export default Loading
