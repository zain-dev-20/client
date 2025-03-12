import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, updateFormData } from "../../redux/slice.js";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import FormButton from "../shareable/FormButton.jsx";

const schema = yup.object({
    name: yup.string().required("Name is Required"),
    email: yup.string().email("Invalid Email Address").required("Email is Required"),
    password: yup.string().required("Password is Required"),
    confirmPassword: yup.string().required("Confirm Password is Required"),
    gender: yup.string().required("Gender is Required"),
    dob: yup.string().required("Date of birth is Required"),
}).required();


const UserProfile = () => {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.form.userProfile);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            ...formData,
            dob: formData?.dob ? formData.dob.split('T')[0] : "",
        },
    });

    const onSubmit = (data) => {
        dispatch(updateFormData({stateName: "userProfile", data}));
        dispatch(nextStep());
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                <div className="mb-2">
                    <label htmlFor={"name"} className="block mb-2 text-sm font-medium text-gray-900">Your Name</label>
                    <input {...register("name")} type={"text"} id={"name"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5" placeholder={"Name"} />
                    {errors.name && <p className="text-red-400 italic text-sm">{errors.name?.message}</p>}
                </div>
                <div className="mb-2">
                    <label htmlFor={"email"} className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                    <input {...register("email")} type={"email"} id={"email"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5" placeholder={"Name"} />
                    {errors.email && <p className="text-red-400 italic text-sm">{errors.email?.message}</p>}
                </div>
                <div className="mb-2">
                    <label htmlFor={"password"} className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
                    <input {...register("password")} type={"password"} id={"password"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5" placeholder={"Name"} />
                    {errors.password && <p className="text-red-400 italic text-sm">{errors.password?.message}</p>}
                </div>
                <div className="mb-2">
                    <label htmlFor={"confirmPassword"} className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                    <input {...register("confirmPassword")} type={"password"} id={"confirmPassword"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5" placeholder={"Confirm Password"} />
                    {errors.confirmPassword && <p className="text-red-400 italic text-sm">{errors.confirmPassword?.message}</p>}
                </div>

                <div className="mb-3">
                    <label className=" font-medium text-gray-900">Gender</label>
                    <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg flex">
                        <li className="w-full">
                            <div className="flex items-center ps-3">
                                <input {...register("gender")} id="gender-male" type="radio" value="male" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" />
                                <label htmlFor="gender-male" className="w-full py-3 ms-2 text-sm font-medium text-gray-900">Male</label>
                            </div>
                        </li>
                        <li className="w-full">
                            <div className="flex items-center ps-3">
                                <input {...register("gender")} id="gender-female" type="radio" value="female" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" />
                                <label htmlFor="gender-female" className="w-full py-3 ms-2 text-sm font-medium text-gray-900">Female</label>
                            </div>
                        </li>
                        <li className="w-full">
                            <div className="flex items-center ps-3">
                                <input {...register("gender")} id="gender-other" type="radio" value="other" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" />
                                <label htmlFor="gender-other" className="w-full py-3 ms-2 text-sm font-medium text-gray-900">Other</label>
                            </div>
                        </li>
                    </ul>
                    {errors.gender && <p className="text-red-400 italic text-sm">{errors.gender?.message}</p>}
                </div>
                <div className="mb-2">
                    <label htmlFor={"dob"} className="block mb-2 text-sm font-medium text-gray-900">Your Date of birth</label>
                    <input {...register("dob")} type={"date"} id={"dob"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none" />
                    {errors.dob && <p className="text-red-400 italic text-sm">{errors.dob?.message}</p>}
                </div>
            </div>
            {/* <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full mt-2 px-5 py-2.5 text-center">Submit</button> */}
            <FormButton  />
        </form>

    );
};

export default UserProfile;
