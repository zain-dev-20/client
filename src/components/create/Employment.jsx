import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, updateFormData } from "../../redux/slice.js";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { employmentStatus } from "../../constant/index.js";
import FormButton from "../shareable/FormButton.jsx";
import { useUploadPdfMutation } from "../../redux/apiSlice.js";

const schema = yup.object({
    jobTitle: yup.string().required("job title is Required"),
    employmentStatus: yup.string().required("empolyed status is Required"),
    companyName: yup.string().optional(),
    experience: yup.string().required("experience is Required"),
    resume: yup.string().required("resume is Required"),
}).required();


const Employement = () => {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.form.employmentInfo);
    const { register, watch, setValue, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: formData,
    });
    const [uploadPdf, { isLoading }] = useUploadPdfMutation(); 
    const employedVal = watch("employmentStatus") == employmentStatus[0]

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        try {
            const response = await uploadPdf(file);
            setValue("resume", response.data.resumeUrl);
        } catch (err) {
            console.error("Upload failed:", err);
        }
    };

    const onSubmit = (data) => {
        dispatch(updateFormData({stateName: "employmentInfo",data}));
        dispatch(nextStep());
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="mb-5">
                    <label htmlFor={"jobTitle"} className="block mb-2 text-sm font-medium text-gray-900">Your job title</label>
                    <input {...register("jobTitle")} type={"text"} id={"jobTitle"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5" placeholder={"job title"} />
                    {errors.jobTitle && <p className="text-red-400 italic text-sm">{errors.jobTitle?.message}</p>}
                </div>
                <div>
                    <label htmlFor="employed" className="block mb-2 text-sm font-medium text-gray-900">Select employement status</label>
                    <select id="employed" {...register("employmentStatus")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none">
                        <option selected>Choose a status</option>
                        {
                            employmentStatus.map((emp)=>(
                                <option value={emp}>{emp}</option>
                            ))
                        }
                    </select>
                    {errors.employmentStatus && <p className="text-red-400 italic text-sm">{errors.employmentStatus?.message}</p>}
                </div>
                {employedVal && <div className="mb-5">
                    <label htmlFor={"companyName"} className="block mb-2 text-sm font-medium text-gray-900">Your company name</label>
                    <input {...register("companyName")} type={"text"} id={"companyName"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5" placeholder={"company name"} />
                    {errors.companyName && <p className="text-red-400 italic text-sm">{errors.companyName?.message}</p>}
                </div>}
                <div className="mb-5">
                    <label htmlFor={"experience"} className="block mb-2 text-sm font-medium text-gray-900">Your experience</label>
                    <input {...register("experience")} type={"number"} id={"experience"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5" placeholder={"experience"} />
                    {errors.experience && <p className="text-red-400 italic text-sm">{errors.experience?.message}</p>}
                </div>
                <div className="mb-5">
                    <label htmlFor={"resume"} className="block mb-2 text-sm font-medium text-gray-900">Uplaod your resume</label>
                    <input type={"file"} onChange={handleFileChange} accept="application/pdf" id={"resume"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5" />
                    {isLoading && <p className="text-blue-500 italic text-sm">Uploading resume please wait...</p>}
                    {errors.resume && <p className="text-red-400 italic text-sm">{errors.resume?.message}</p>}
                </div>

            </div>
            {/* <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full mt-2 px-5 py-2.5 text-center">Submit</button> */}
            <FormButton loading={isLoading} />

        </form>

    );
};

export default Employement;
