import React, { useState } from 'react'
import { useDeleteFormMutation, useGetAllFormsQuery } from '../redux/apiSlice.js';
import { storeStates } from '../constant/index.js';
import { FaTrash } from "react-icons/fa";
import { IoChevronDownCircleSharp, IoChevronUpCircle } from "react-icons/io5";
import { FaPenToSquare } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { resetForm, updateFormData } from '../redux/slice.js';
import { useDispatch } from 'react-redux';

const Home = () => {
  const { data: forms, error, isLoading } = useGetAllFormsQuery();
  const [deleteForm, { isLoading: isDeleting }] = useDeleteFormMutation();
  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleToggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatedValue = (key, value) => {
    if (key.toLowerCase().includes("pass")) return "*".repeat(value.length)
    else if (typeof value == "boolean") return String(value)
    else if (Array.isArray(value)) return value.join(" ")
    else return value
  }

  const handleDelete = async (id) => {
    try {
      await deleteForm(id).unwrap();
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };



  const handleNavigate = (form) => {
    dispatch(resetForm())
    storeStates.map((state) => {
      const data = { ...form[state.key] }
      if (state.key == "userProfile") {
        data.confirmPassword = data.password
      }
      dispatch(updateFormData({ stateName: state.key, data }));
    })
    navigate("/create", { state: form._id })
  }

  return (
    <div className={`w-[90vw] mx-auto py-4 ${!forms?.length > 0 && "items-center justify-center flex h-[90vh]"}`}>
      {
        forms?.length > 0 ? forms?.map((form, id) => {
          return (
            <div key={id} className='relative'>
              <div key={id} className={`mb-4 relative w-full mx-auto p-6 bg-gray-100 rounded-xl shadow overflow-y-hidden ${expandedId === id ? "min-h-fit" : "h-52"}`}>
                {
                  storeStates.map((stateName, idx) => {
                    const currentState = form[stateName.key]
                    if (!currentState) return null;
                    return (
                      <div key={idx} className='gap-4'>
                        <h2 className="font-bold text-lg mb-4">{stateName.value}</h2>
                        <div className='flex flex-wrap gap-1.5'>
                          {Object.entries(currentState).map(([key, value], index) => (
                            <div key={index} className='flex items-center mb-2 rounded-xl px-2 shadow bg-gray-50'>
                              <p className=" text-gray-700  py-2 px-4 capitalize rounded-xl font-medium">{key}:</p>
                              <p className=" text-gray-700 text-md  py-2 px-4 rounded-xl truncate">{formatedValue(key, value)}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })
                }
              </div>
              <div className='absolute top-1 right-1 flex items-center gap-4 bg-gray-50 py-2 px-4 border-gray-500 shadow rounded-xl'>
                <span onClick={() => handleDelete(form._id)} className='cursor-pointer text-red-500 hover:scale-150 transition-all ease-in-out duration-500'>
                  <FaTrash />
                </span>
                <span onClick={() => handleNavigate(form)} className='cursor-pointer text-green-500 hover:scale-150 transition-all ease-in-out duration-500'>
                  <FaPenToSquare />
                </span>
                <span onClick={() => handleToggle(id)} className='text-blue-500 text-xl hover:scale-150 transition-all ease-in-out duration-500 cursor-pointer'>
                  {expandedId === id ? <IoChevronUpCircle /> : <IoChevronDownCircleSharp />}
                </span>
              </div>
            </div>
          )
        })
        : <p className='text-2xl text-gray-700 font-medium italic'>Opps!! No Record Found</p>
      }
    </div>
  )
}

export default Home