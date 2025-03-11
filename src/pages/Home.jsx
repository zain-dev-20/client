import React, { useState } from 'react'
import { useDeleteFormMutation, useGetAllFormsQuery } from '../redux/apiSlice.js';
import { storeStates } from '../constant/index.js';
import { FaTrash } from "react-icons/fa";
import { IoChevronDownCircleSharp, IoChevronUpCircle } from "react-icons/io5";
import { FaPenToSquare } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { data: forms, error, isLoading } = useGetAllFormsQuery();
  const [deleteForm, { isLoading: isDeleting }] = useDeleteFormMutation();

  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();

  const handleToggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatedValue = (key,value) => {
    if (key.toLowerCase().includes("pass")) return "*".repeat(value.length)
    else if(typeof value == "boolean") return String(value)
    else if(Array.isArray(value)) return value.join(" ")
    else return value
  }

  const handleDelete = async (id) => {
    try {
      await deleteForm(id).unwrap();
      alert("Form deleted successfully!");
    } catch (error) {
      console.error("Error deleting form:", error);
      alert("Failed to delete form");
    }
  };

  return (
    <div className='w-[90vw] mx-auto py-4'>
      {
        forms?.length > 0 && forms?.map((form,id)=>{
          return (
            <div className='relative'>
            <div key={id} className={`mb-4 relative w-full mx-auto p-6 bg-gray-100 rounded-xl shadow overflow-y-hidden ${expandedId === id ? "min-h-fit" : "h-52"
            }`}>
              
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
                <span onClick={()=>handleDelete(form._id)} className='cursor-pointer text-red-500'>
                  <FaTrash />
                </span>
                <span onClick={()=>navigate("/create",{state:form})} className='cursor-pointer text-green-500'>
                  <FaPenToSquare />
                </span>
                <span onClick={() => handleToggle(id)} className='text-blue-500 text-xl cursor-pointer'>
                  {expandedId === id ? <IoChevronUpCircle /> : <IoChevronDownCircleSharp />}
                </span>
            </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Home