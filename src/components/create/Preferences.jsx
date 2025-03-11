import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, updateFormData } from "../../redux/slice.js";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { user_hobbies } from "../../constant/index.js";
import FormButton from "../shareable/FormButton.jsx";

const schema = yup.object({
  contactMode: yup.string().required("Monthly income is Required"),
  hobbies: yup.array().min(2, "Select at least two hobby").required("Hobbies are required"),

  newsletter: yup.boolean().optional(),
}).required();


const Preferences = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.preferences);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData,
  });
  const onSubmit = (data) => {
    dispatch(updateFormData({ stateName: "preferences" ,data}));
    dispatch(nextStep());
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="grid grid-cols-1 gap-2">
        <div>
          <label className="font-medium text-gray-900">Contact Preference Mode</label>
          <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg flex">
            {["email", "phone", "sms"].map((mode) => (
              <li key={mode} className="w-full">
                <div className="flex items-center ps-3">
                  <input
                    {...register("contactMode")}
                    id={mode}
                    type="radio"
                    value={mode}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                  />
                  <label htmlFor={mode} className="w-full py-3 ms-2 text-sm font-medium text-gray-900">
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </label>
                </div>
              </li>
            ))}
          </ul>
          {errors.contactMode && <p className="text-red-400 italic text-sm">{errors.contactMode?.message}</p>}
        </div>
        <div className="">
          <label className="block mb-2 text-sm font-medium text-gray-900">Select Hobbies</label>
          <div className="grid grid-cols-2 h-32 overflow-y-auto gap-2 border bg-white border-gray-300 p-3 rounded-lg">
            {user_hobbies.map((hobby) => (
              <div key={hobby} className="flex items-center">
                <input
                  type="checkbox"
                  id={hobby}
                  value={hobby}
                  {...register("hobbies")}
                  onChange={() => handleHobbyChange(hobby)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor={hobby} className="ml-2 text-sm text-gray-900">{hobby}</label>
              </div>
            ))}
          </div>
          {errors.hobbies && <p className="text-red-400 italic text-sm">{errors.hobbies?.message}</p>}
        </div>

        <div className="mb-5 flex items-center gap-4">
          <label htmlFor="newsletter" className=" text-sm font-medium text-gray-900">Newsletter</label>
          <input
            {...register("newsletter")}
            type="checkbox"
            id="newsletter"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none"
          />
        </div>

      </div>
      {/* <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full mt-2 px-5 py-2.5 text-center">Submit</button> */}
      <FormButton />

    </form>

  );
};

export default Preferences;
