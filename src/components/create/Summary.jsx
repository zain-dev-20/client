import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { storeStates } from '../../constant/index.js'
import FormButton from '../shareable/FormButton.jsx'
import { useCreateFormMutation, useUpdateFormMutation } from '../../redux/apiSlice.js'
import { useLocation, useNavigate } from 'react-router-dom'
import { resetForm } from '../../redux/slice.js'

const Summary = () => {
  const states = useSelector(state => state.form);
  const [createForm, { isLoading, data }] = useCreateFormMutation();
  const [updateForm, { isLoading: updateLoading }] = useUpdateFormMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useLocation().state

  const formatedValue = (key, value) => {
    if (key.toLowerCase().includes("pass")) return "*".repeat(value.length)
    else if (typeof value == "boolean") return String(value)
    else if (Array.isArray(value)) return value.join(" ")
    else return value
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = JSON.parse(JSON.stringify(states))
    delete payload.step
    delete payload.userProfile.confirmPassword
    if (form) await updateForm({ id: form, data: payload })
    else await createForm(payload)
    dispatch(resetForm())
    navigate("/")

  }

  return (
    <div>
      {storeStates.map((stateName, idx) => {
        const currentState = states[stateName.key]
        if (!currentState) return null;
        return (
          <div key={idx} className='gap-4'>
            <h2 className="font-bold text-lg mb-4">{stateName.value}</h2>
            {Object.entries(currentState).map(([key, value], index) => (
              <div key={index} className='flex items-center gap-2 mb-2 rounded-xl px-2'>
                <p className="shadow text-gray-700 bg-stone-100 py-2 px-4 w-1/2 capitalize rounded-xl font-medium">{key}:</p>
                <p className="shadow text-gray-700 text-md bg-stone-100 py-2 px-4 w-1/2 rounded-xl truncate">{formatedValue(key, value) || "N/A"}</p>
              </div>
            ))}
          </div>
        );
      })}
      <FormButton onNext={handleSubmit} loading={isLoading || updateLoading} />
    </div>
  )
}

export default Summary