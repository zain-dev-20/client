import React from 'react'
import { steps } from '../../constant/index.js'

const StepProgress = ({currentStep}) => {
    const per = ((currentStep * 100) / 6).toFixed(0)
  return (
    <div className='md:w-[50vw] w-[80vw] mb-4'>
        <div className="flex justify-between mb-1">
            <div>
            <span className="text-base font-medium text-blue-700 ">Step {currentStep}: </span>
            <span className="text-base font-medium text-blue-700 ">{steps[currentStep-1]}</span>
            </div>
            <span className="text-sm font-medium text-blue-700">{per}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1 ">
            <div className="bg-blue-600 h-1 rounded-full transition-all ease-in-out duration-1000" style={{width: `${per}%`}}></div>
        </div>
    </div>
  )
}

export default StepProgress