import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { prevStep } from '../../redux/slice.js';

const FormButton = ({onNext,loading=false}) => {
    const step = useSelector((state) => state.form.step);
    const dispatch = useDispatch();

    const onPrevious = () => {
        dispatch(prevStep());
    }
    return (
        <div className='flex items-center justify-end gap-2'>
            {step !== 1 && <button disabled={loading} onClick={onPrevious} className="text-white bg-gray-400 hover:bg-gray-500 cursor-pointer font-medium rounded-lg text-sm  mt-2 px-5 py-2.5 text-center">Previous</button>}
            {onNext ? <button disabled={loading} onClick={onNext} className="text-white bg-blue-700 hover:bg-blue-800 cursor-pointer font-medium rounded-lg text-sm  mt-2 px-5 py-2.5 text-center">{ step === 6 ? "Submit" : "Next"}</button>
            : <button disabled={loading} type='submit' className="text-white bg-blue-700 hover:bg-blue-800 cursor-pointer font-medium rounded-lg text-sm  mt-2 px-5 py-2.5 text-center">{ step === 6 ? "Submit" : "Next"}</button>}
        </div>
    )
}

export default FormButton